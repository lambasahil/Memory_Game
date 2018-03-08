/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 var Card_Names=["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb","fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];
 var myVar,Moves=0,Matches=0,Timer=0,flag=0,click_value=0,select_class="",select_class1="";
 var star1=`
            <li class="item"><i class="fa fa-star"></i></li>
            `;
  var star2=`
  <li class="item"><i class="fa fa-star"></i></li>
  <li class="item"><i class="fa fa-star"></i></li>
  `;
  var star3=`
         <li class="item"><i class="fa fa-star"></i></li>
         <li class="item"><i class="fa fa-star"></i></li>
         <li class="item"><i class="fa fa-star"></i></li>
         `;

//Will call start function at ver first moment when page is loaded
 $(document).ready(function() {
   $(".Score").append(star3);
      start();
 });

// start function which will append all <li> with the shuffled classes
var start =function()
  {
    //shuffle function is called
    var shuffled_array=shuffle(Card_Names);
    var list="";
        for(var i=0;i<shuffled_array.length;i++)
          {
            list=`<li class="card"><i class=" `;
            list=list+Card_Names[i]+`"></i></li>`;
            $(".deck").append(list);
          }
    $(".card").on("click", cardCLickHandler);
  }

  $(".restart").click(function(){
    //intialising with 0 when restart button is called
      Timer=0;
      Matches=0;
      Moves=0;
      flag=0;
      click_value=0;
      $(".deck").empty();
      $(".Score").empty();
      $(".Score").append(star3);

  clearInterval(myVar);
  $(".deck").css({"display": "flex"});
  $(".hide").css({"display": "inline-block"});
  $(".modal").css({"display": "none"});
  $(".fa-clock-o").text("0");
  $(".moves").text(Moves);

  setTimeout(function(){
  start();
},200);
})


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//When a card is clicked
var cardCLickHandler = function(){
 $(this).toggleClass("open").toggleClass("show");

    if(flag==0)
      {
        myVar = setInterval(myTimer, 1000);
          function myTimer()
            {
              Timer++;
              $(".Score").empty();
              $(".fa-clock-o").text(Timer);
              if(Moves<=10)
               {

                   $(".Score").append(star3);
               }
             else if (Moves>10 && Moves<15)
               {

                   $(".Score").append(star2);
               }
              else
               {

                    $(".Score").append(star1);
               }

            }
   flag++;
 }

    if( click_value==0)
      {
        id=this;
        select_class=$(this).children()[0].className;
        click_value++;
      }
    else
      {
          if(click_value==1)
            {
              var a=select_class;
              Moves++;
              $(".moves").text(Moves);
              $(".card").off("click");
              select_class=$(this).children()[0].className;

          if(select_class==a)
            {
              Matches++;
              $(id).addClass("match");
              $(this).addClass("match");
              $(".card").on("click", cardCLickHandler);
            }
         else
            {
              var self = this;
                setTimeout(function(){
                  $(self).toggleClass("open").toggleClass("show");
                  $(id).toggleClass("open").toggleClass("show");
                  $(".card").on("click", cardCLickHandler);
                },400);
            }
            }
     click_value=0;
   }
   //When all matches get matched
    if(Matches===8)
      {
         //$(".deck").css({"display": "none"});
         $(".hide").css({"display": "none"});
         $(".modal").css({"display": "block"});
         $(".Time").text(Timer);
         clearInterval(myVar);


   }
};


 /*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
