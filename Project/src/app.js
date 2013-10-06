(function () {

	'use strict';

	var game = {};
	

	// load CSV data
	get( 'data.csv', function ( csv ) {
		var parser = new CSVParser( csv );
		game.deck = parser.json();

		// TODO don't enable user to start game until we've got the data
	});

	// load template
	get( 'template.html', function ( template ) {
		var ractive = new Ractive({
			el: 'container',
			template: template,
			data: {
				playerCard: false,
				compCard: false,
				statChoice: false,
				reset: false
			}
		});

		ractive.on({
			pickName: function (event) {
				var cardDeck = shuffle( game.deck.slice() ); // clone...
				var yourCard = cardDeck.pop();
				var opponentCard = cardDeck.pop();
				window.$var = {
					yourCard: yourCard,
					opponentCard: opponentCard
				};
			 
				

				this.set({
					playerCard: yourCard,
					statChoice: true
				});
			},

			compete: function ( event, field ) {
				var yourCard = window.$var.yourCard;
				var opponentCard = window.$var.opponentCard;
				
				if (yourCard[ field ] > opponentCard[ field ]) {
					var outcome = 'You win!';
				} else if (yourCard[ field ] < opponentCard[ field ]) {
					outcome = 'You lose :(';
				} else {
					outcome = 'Draw!';
				}
				
				this.set({
					compCard: opponentCard,
					statChoice: false,
					reset: true,
					message: outcome
				});
			},

			playAgain: function (event){ 
				shuffle(window.$vars.scientistCards);
				document.body.scrollTop = 0;

				this.set({
					compCard: false,
					playerCard: false,
					statChoice: false,
					reset: false
				});
			}
		});
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