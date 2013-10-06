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
				playerCard: true,
				statChoice: true,
				name: yourCard.name,
				discipline: yourCard.discipline1,
				/*discipline2: rand.discipline2,*/ 
				description: yourCard.description,
				reputation: yourCard.reputation,
				impact: yourCard.impact,
				controversy: yourCard.controversy,
				image: yourCard.image 
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
				compCard: true,
				statChoice: false,
				reset: true,
				nameC: opponentCard.name,
				disciplineC: opponentCard.discipline1,
				/*discipline2C: rand2.discipline2, */
				descriptionC: opponentCard.description,
				reputationC: opponentCard.reputation,
				impactC: opponentCard.impact,
				controversyC: opponentCard.controversy,
				imageC: opponentCard.image, 
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