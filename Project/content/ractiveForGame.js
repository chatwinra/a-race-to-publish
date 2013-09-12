





ractive = new Ractive({
    el: 'container',
    template: '#tpl',
    data: {
      playerCard: false,
      compCard: false,
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
         name: yourCard.name,
         discipline: yourCard.discipline1,
         /*discipline2: rand.discipline2,*/ 
         description: yourCard.description,
         reputation: yourCard.reputation,
         impact: yourCard.impact,
         controversy: yourCard.controversy,
         /*image: yourCard.image*/ 
         });
}
});

ractive.on({
    competeReputation: function (event){
    var yourCard = window.$var.yourCard;
    var opponentCard = window.$var.opponentCard;
            if (yourCard.reputation > opponentCard.reputation) {
             var outcome = 'You win!';
            }else if (yourCard.reputation < opponentCard.reputation) {
              outcome = 'You lose';
          } else {
              outcome = 'Draw!';
          }
 


        this.set({
         compCard: true,
         reset: true,
         nameC: opponentCard.name,
         disciplineC: opponentCard.discipline1,
         /*discipline2C: rand2.discipline2, */
         descriptionC: opponentCard.description,
         reputationC: opponentCard.reputation,
         impactC: opponentCard.impact,
         controversyC: opponentCard.controversy,
         message: outcome
         });
}
});

ractive.on({
    competeImpact: function (event){
    var yourCard = window.$var.yourCard;
    var opponentCard = window.$var.opponentCard;
            if (yourCard.impact > opponentCard.impact) {
             var outcome = 'You win!';
            }else if (yourCard.impact < opponentCard.impact) {
              outcome = 'You lose';
          } else {
              outcome = 'Draw!';
          }
 


        this.set({
         compCard: true,
         reset: true,
         nameC: opponentCard.name,
         disciplineC: opponentCard.discipline1,
         /*discipline2C: rand2.discipline2, */
         descriptionC: opponentCard.description,
         reputationC: opponentCard.reputation,
         impactC: opponentCard.impact,
         controversyC: opponentCard.controversy,
         message: outcome
         });
}
});

ractive.on({
    competeControversy: function (event){
    var yourCard = window.$var.yourCard;
    var opponentCard = window.$var.opponentCard;
            if (yourCard.controversy > opponentCard.controversy) {
             var outcome = 'You win!';
            }else if (yourCard.controversy < opponentCard.controversy) {
              outcome = 'You lose';
          } else {
              outcome = 'Draw!';
          }
 


        this.set({
         compCard: true,
         reset: true,
         nameC: opponentCard.name,
         disciplineC: opponentCard.discipline1,
         /*discipline2C: rand2.discipline2, */
         descriptionC: opponentCard.description,
         reputationC: opponentCard.reputation,
         impactC: opponentCard.impact,
         controversyC: opponentCard.controversy,
         message: outcome
         });
}
});
ractive.on({
    playAgain: function (event){ 
    $.get( 'https://docs.google.com/spreadsheet/pub?key=0AscIRJMcugw8dEp2cXBvMGcwd29hUTR2alBkMnp6bEE&output=csv').then( function ( data ) { // `data` is the contents of data.csv
  var parser = new CSVParser( data );
  
  var scientistCards = parser.json();
  window.$vars = {
    scientistCards: scientistCards
  };
  shuffle(scientistCards);
$('html,body').scrollTop(0);
 
  
});


        this.set({
         compCard: false,
         playerCard: false,
         reset: false
         });
}
});
