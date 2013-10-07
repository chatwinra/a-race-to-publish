(function () {

	'use strict';

	var game = {
		// Initialise the view
		render: function ( template ) {
			game.view = new Ractive({
				el: 'container',
				template: template
			});

			game.view.on({
				start: game.start,

				selectField: function ( event, field ) {
					game.selectField( field );
				},

				playAgain: function (event){ 
					game.reset();
					game.start();
				}
			});
		},

		reset: function () {
			game.view.set({
				compCard: false,
				playerCard: false,
				statChoice: false,
				reset: false
			});
		},

		// Start a new round
		start: function () {
			
			// Clone deck and shuffle
			var deck = shuffle( game.deck.slice() );

			// If there's an uneven number of cards, burn one
			if ( deck.length % 2 ) {
				deck.pop();
			}

			// Deal hands (the easy way)
			game.playerHand = deck.splice( 0, deck.length / 2 );
			game.opponentHand = deck; // contains remaining hands

			// Take the first turn
			game.turn();
		},

		// Start a new turn
		turn: function () {
			game.playerCard = game.playerHand.shift();
			game.opponentCard = game.opponentHand.shift();

			game.view.set( 'playerCard', game.playerCard );
		},

		// Select a field
		selectField: function ( field ) {
			var d = game.playerCard[ field ] - game.opponentCard[ field ];

			if ( d > 0 ) {
				game.win();
			} else if ( d < 0 ) {
				game.lose();
			} else {
				game.draw();
			}
			
			game.view.set({
				compCard: game.opponentCard,
				statChoice: false,
				reset: true
			});
		},

		win: function () {
			game.view.set( 'message', 'You win!' );
		},

		lose: function () {
			game.view.set( 'message', 'You lose :(' );
		},

		draw: function () {
			game.view.set( 'message', 'Draw!' );
		}
	};
	

	// load CSV data
	get( 'data.csv', function ( csv ) {
		var parser = new CSVParser( csv );
		game.deck = parser.json();

		// TODO don't enable user to start game until we've got the data
	});

	// load template
	get( 'template.html', function ( template ) {
		game.render( template );
	});



	// helper functions
	function  get ( url, callback ) {
		var xhr = new XMLHttpRequest();

		xhr.open( 'get', url );
		xhr.onload = function () {
			callback( xhr.responseText )
		};

		xhr.send();
	};

	function shuffle ( array ) {
		var counter = array.length, temp, index;

		// While there are elements in the array
		while (counter--) {
			// Pick a random index
			index = (Math.random() * counter) | 0;

			// And swap the last element with it
			temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}

		return array;
	};

}());