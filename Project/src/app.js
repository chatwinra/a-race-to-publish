(function () {

	'use strict';

	var get, deck;

	get = function ( url, callback ) {
		var xhr = new XMLHttpRequest();

		xhr.open( 'get', url );
		xhr.onload = function () {
			callback( xhr.responseText )
		};

		xhr.send();
	};


	// load CSV data
	get( 'data.csv', function ( csv ) {
		var parser = new CSVParser( csv );
		deck = parser.json();

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
				var cardDeck = shuffle( deck.slice() ); // clone...
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
			}
		});

		ractive.on({
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
			}
		});

		ractive.on({
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

}());