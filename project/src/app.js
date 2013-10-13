(function () {

	'use strict';

	/* TODO
	
		* don't reset after each turn, start a new one until no cards are left
		* keep track of score
		* display score
		* fix UI
		* etc...

	*/

	var game = {
		// Initialise the view
		render: function ( template ) {
			game.view = new Ractive({
				el: 'container',
				template: template,
				data: {
					pending: true
				}
			});

			game.view.on({
				start: game.start,

				selectField: function ( event, field ) {
					game.selectField( field );
				},

				nextTurn: function ( event ) {
					game.turn();
				},

				playAgain: function (event){ 
					game.reset();
					game.start();
				}
			});
		},

		reset: function () {
			game.view.set({
				opponentCard: null,
				playerCard: null,
				pending: true,
				dialog: null,
				endgame: false
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

			// Create a pot in the centre - in a draw, the cards go here
			game.centrePot = [];

			// Unfade cards and hide 'turn over card to start' message
			game.view.set({
				pending: false,
				showInstructions: true,

				deck: game.deck, // just so we can get the length property for the stack
				playerHand: game.playerHand,
				opponentHand: game.opponentHand,
				centrePot: game.centrePot
			});

			// Take the first turn
			game.turn();
		},

		// Start a new turn
		turn: function () {
			game.playerCard = game.playerHand.shift();
			game.opponentCard = game.opponentHand.shift();

			game.view.set({
				playerCard: game.playerCard,
				opponentCard: false,
				dialog: null,
				selectedField: null
			});
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
				opponentCard: game.opponentCard,
				showInstructions: false,
				selectedField: field
			});
		},

		win: function () {
			game.transferCards( true );

			if ( !game.opponentHand.length ) {
				game.winGame();
			} else {
				game.view.set( 'dialog.message', 'You win!' );
			}
		},

		lose: function () {
			game.transferCards( false );
			
			if ( !game.playerHand.length ) {
				game.loseGame();
			} else {
				game.view.set( 'dialog.message', 'You lose :(' );
			}
		},

		draw: function () {
			game.centrePot.push( game.playerCard, game.opponentCard );

			if ( !game.opponentHand.length ) {
				game.winGame();
			} else if ( !game.playerHand.length ) {
				game.loseGame();
			} else {
				game.view.set( 'dialog.message', 'Draw!' );
			}
		},

		winGame: function () {
			// won the game
			game.view.set({
				'dialog.message': 'You have won the game!',
				endgame: true
			});
		},

		loseGame: function () {
			// won the game
			game.view.set({
				'dialog.message': 'You have lost the game :(',
				endgame: true
			});
		},

		transferCards: function ( playerWon ) {
			var winnings, hand;

			winnings = [ game.playerCard, game.opponentCard ].concat( game.centrePot );
			hand = playerWon ? game.playerHand : game.opponentHand;

			hand.push.apply( hand, winnings );

			// empty the center pot
			game.centrePot.splice( 0 );
		}
	};

	window.game = game; // for the debugging
	

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