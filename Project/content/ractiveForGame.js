(function () {

	'use strict';

	var ractive = new Ractive({
		el: 'container',
		template: '#tpl',
		data: {
			playerCard: false,
			compCard: false,
			statChoice: false,
			reset: false
		}
	});

	ractive.on({
		pickName: function (event) {
			var cardDeck = window.$vars.scientistCards;
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

}());