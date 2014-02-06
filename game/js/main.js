//initializng variables

var humanScore = 0;
var computerScore = 0;
var rounds=0;
var targetPoints = 50;
var outcome = "";
var outcome2 = "";
var humanHistory = new Array();
var computerHistory = new Array();
var musicCounter = 0;

$("button[rel]").overlay(); //for overlay

//$('#selectorimgs').fadeTo('slow', 0.5).fadeTo('slow', 1.0);

$( "#startButton" ).click(function() {
    restartgame();
});

$( "#musicButton" ).click(function() {
   musicCounter = musicCounter + 1;
   if (musicCounter == 1) {
       $("#radio").show();
       $("#radioStarwaves").show();
       $("#radioRobots").hide();
       $("#radioOblivion").hide();       
       $("#radio span").html("Now Playing: Starwave");
       document.getElementById('radioStarwaves').play();
       document.getElementById('radioRobots').pause();
       document.getElementById('radioOblivion').pause();
     } else if (musicCounter == 2) {
       $("#radio").show();
       $("#radioStarwaves").hide();
       $("#radioRobots").show();
       $("#radioOblivion").hide();       
       $("#radio span").html("Now Playing: Robots");
       document.getElementById('radioStarwaves').pause();
       document.getElementById('radioRobots').play(); 
       document.getElementById('radioOblivion').pause();
     } else if (musicCounter == 3) {
       $("#radio").show();
       $("#radioStarwaves").hide();
       $("#radioRobots").hide();
       $("#radioOblivion").show();       
       $("#radio span").html("Now Playing: Oblivion");
       document.getElementById('radioStarwaves').pause();
       document.getElementById('radioRobots').pause();
       document.getElementById('radioOblivion').play();
     } else if (musicCounter > 3) {
       musicCounter = 0;
       document.getElementById('radioStarwaves').pause();
       document.getElementById('radioRobots').pause();
       document.getElementById('radioOblivion').pause();
       $("#radioStarwaves").hide();
       $("#radioRobots").hide();
       $("#radioOblivion").hide();
       $("#radio").hide();
     }
});


$('#inputRock').on('click', function(e){
		e.preventDefault();
    playRock();
});

$('#inputPaper').on('click', function(e){
		e.preventDefault();
    playPaper();
});

$('#inputScissors').on('click', function(e){
		e.preventDefault();
    playScissors();
});

$('#inputLizard').on('click', function(e){
		e.preventDefault();
    playLizard();
});

$('#inputSpock').on('click', function(e){
		e.preventDefault();
    playSpock();
});


function computerSelection(){

  $('#displayboxComputer img').hide();
  $('#displayboxComputer .whitespace').show();
  $('#displayboxComputer .whitespace').hide();

  var humanHistoryall = humanHistory.join("");
  var humanHistorylen = humanHistoryall.length;

  var last4 = humanHistoryall.substr(humanHistorylen-4,4);
  var last3 = humanHistoryall.substr(humanHistorylen-3,3);
  var last2 = humanHistoryall.substr(humanHistorylen-2,2);
  var last1 = humanHistoryall.substr(humanHistorylen-1,1);

  var predictpick4 = patternmatch_info(last4,humanHistoryall,1)
  var predictpick3 = patternmatch_info(last3,humanHistoryall,1)
  var predictpick2 = patternmatch_info(last2,humanHistoryall,1)
  var predictpick1 = patternmatch_info(last1,humanHistoryall,1)

  var predictcount4 = patternmatch_info(last4,humanHistoryall,2)
  var predictcount3 = patternmatch_info(last3,humanHistoryall,2)
  var predictcount2 = patternmatch_info(last2,humanHistoryall,2)
  var predictcount1 = patternmatch_info(last1,humanHistoryall,2)

  var predictprob4 = patternmatch_info(last4,humanHistoryall,3)
  var predictprob3 = patternmatch_info(last3,humanHistoryall,3)
  var predictprob2 = patternmatch_info(last2,humanHistoryall,3)
  var predictprob1 = patternmatch_info(last1,humanHistoryall,3) 

  var prediction,predictmsg,guessword,predictdetails;


  if (predictpick4 != "") {
    guessword = letter2word(predictpick4);
    predictmsg = "Pattern '" + last4 + "' found." + " Human predicted to select " + guessword + " (" + predictprob4 +"%) last round.";
    prediction = predictpick4;
    predictdetails = "Pattern '" + last4 + "' count: " + predictcount4;  
  } else if (predictpick3 != "") {
    guessword = letter2word(predictpick3);
    predictmsg = "Pattern '" + last3 + "' found." + " Human predicted to select " + guessword + " (" + predictprob3 +"%) last round.";
    prediction = predictpick3;
    predictdetails = "Pattern '" + last3 + "' count: " + predictcount3; 
  } else if (predictpick2 != "") {
    guessword = letter2word(predictpick2);
    predictmsg = "Pattern '" + last2 + "' found." + " Human predicted to select " + guessword + " (" + predictprob2 +"%) last round.";
    prediction = predictpick2;
    predictdetails = "Pattern '" + last2 + "' count: " + predictcount2; 
  } else if (predictpick1 != "") {
    guessword = letter2word(predictpick1);
    predictmsg = "Pattern '" + last1 + "' found." + " Human predicted to select " + guessword + " (" + predictprob1 +"%) last round.";
    prediction = predictpick1;
    predictdetails = "Pattern '" + last1 + "' count: " + predictcount1; 
  } else {
    prediction = "";
    predictmsg = "Computer plays randomly.";
    predictdetails = "No pattern found.";
  }
 
  //once a prediction is determined, computer plays appropriate counter

  randomNum=Math.random();

  if (prediction == "R") {
    if (randomNum > 0.5) {
      computerMove = "Paper";
    } else computerMove = "Spock";
  } else if (prediction == "P") {
    if (randomNum > 0.5) {
      computerMove = "Scissors";
    } else computerMove = "Lizard";
  } else if (prediction == "S") {
     if (randomNum > 0.5) {
      computerMove = "Rock";
    } else computerMove = "Spock"; 
  } else if (prediction == "L") {
    if (randomNum > 0.5) {
      computerMove = "Scissors";
    } else computerMove = "Rock";  
  } else if (prediction == "K") {
    if (randomNum > 0.5) {
      computerMove = "Lizard";
    } else computerMove = "Paper"; 
  } else {

  var randomNum=Math.random(),computerMove,randomMove;

  if(randomNum<.20){
    randomMove="Rock";
    //$('#displayboxComputer .rock').show();
  } else if(randomNum<.40){
    randomMove="Paper";
    //$('#displayboxComputer .paper').show();
  } else if(randomNum<.60){
    randomMove="Scissors";
    //$('#displayboxComputer .scissors').show();
  } else if(randomNum<.80){
    randomMove="Lizard";
    //$('#displayboxComputer .lizard').show();
  } 
  else {
    randomMove="Spock";
    //$('#displayboxComputer .spock').show();
  }
    computerMove = randomMove;
  }

  var computerText = predictmsg;
  $('#consoleText').html(computerText);

  var computerText1 = "Computer selected " + computerMove + " last round.";
  $('#consoleText1').html(computerText1);

  var computerText4 = predictdetails;
  $('#consoleText4').html(computerText4);

	return computerMove;
}



function humanThink(){
  $('#displayboxHuman').show();
  $('#displaybox').show();
}

function computerThink(){
  $('#displayboxComputer').show();
  $('#displaybox').show();
}

function hideDisplay(){
  $('#displayboxHuman').hide();
  $('#displayboxComputer').hide();
  $('#displaybox').hide();
  $('#outcomebox').hide();
}


$('#consoleButton').on('click', function(e){
		e.preventDefault();
  $('#console').hide();
})

$('#computerGif').on('click', function(e){
		e.preventDefault();
 // $('#console').show();
  $('#console').slideDown(1000).addClass('show');
})

function displayText(){

  var humanHistoryall = humanHistory.join("");
  var humanHistorylen = humanHistoryall.length;

  var computerHistoryall = computerHistory.join("");
  var computerHistorylen = computerHistoryall.length;

  var tempLast = humanHistorylen;

  var human_r_ct = 0;
  var human_p_ct = 0;
  var human_s_ct = 0;
  var human_l_ct = 0;
  var human_k_ct = 0;

  var human_r = humanHistoryall.match(/R/g);
  var human_p = humanHistoryall.match(/P/g);
  var human_s = humanHistoryall.match(/S/g);
  var human_l = humanHistoryall.match(/L/g);
  var human_k = humanHistoryall.match(/K/g);

  if (human_r != null) {human_r_ct = human_r.length};      
  if (human_p != null) {human_p_ct = human_p.length};      
  if (human_s != null) {human_s_ct = human_s.length};      
  if (human_l != null) {human_l_ct = human_l.length};     
  if (human_k != null) {human_k_ct = human_k.length};      

  if(humanHistorylen > 40) {
    var text2 = humanHistoryall.substr(humanHistorylen - 40);
    tempLast = 40;
  } else {
    var text2 = humanHistoryall;
  }
  text2 = "Human moves (Last " + tempLast + "): " + text2
  $('#consoleText2').html(text2);  

  if(computerHistorylen > 40) {
    templast = 40;
    var text3 = computerHistoryall.substr(computerHistorylen - 40);
  } else {
    var text3 = computerHistoryall;
  }
  text3 = "Comp  moves (Last " + tempLast + "): " + text3
  $('#consoleText3').html(text3);

  var freqText = "Human Frequencies: R: " + human_r_ct + " P: " + human_p_ct + " S: " +  human_s_ct + " L: " + human_l_ct + " K: " + human_k_ct;

  $('#consoleText5').html("Key: R=Rock P=Paper S=Scissors L=Lizard K=Spock");
  $('#consoleText6').html(freqText);
}

function displayoutcome() {

  $('#outcomebox').html(outcome);
  $('#outcomebox').show();

  $('#outcomebox').fadeTo('fast', 0.0).fadeTo('fast', 1.0);

   animatePhotos();

  var tempRound = "Round: " + rounds;
  $('#lastroundTitle').text(tempRound);

  $('#humanBar').text(humanScore);
  $('#computerBar').text(computerScore);
  $('#humanBar').css('width',humanScore*6 + 20);
  $('#computerBar').css('width',computerScore*6 + 20);
 //$('#humanbox h2').text("Human - Press Below");

}


function checkendofgame(){
  if (humanScore == targetPoints) {
   // alert("Congratulations. You won!")
    $('#splashPage').show();

    $('#winnerCard').hide();
    $('#loserCard').hide();
    $('#winnerCard').slideDown(1000).addClass('show');

    $('#gameArea').hide();

  } else if (computerScore == targetPoints) {
   // alert("The computer has won!")
    $('#splashPage').show();
    $('#winnerCard').hide();
    $('#loserCard').hide();
    $('#loserCard').slideDown(1000).addClass('show');

    $('#gameArea').hide();
  }
}

function restartgame(){

   $('#splashPage').hide();
   $('#winnerCard').hide();
   $('#loserCard').hide();

   $('#gameArea').slideUp(250).addClass('hide');
   $('#gameArea').slideDown(250).addClass('show');

   humanScore = 0;
   computerScore = 0;

   rounds=0;

   targetPoints = 50;
   outcome = "";
   outcome2 = "";
   humanHistory = new Array();
   computerHistory = new Array();

  $('#displayboxHuman').hide();
  $('#displayboxComputer').hide();
  $('#displaybox').hide();
  $('#outcomebox').hide();

  $('#console').hide();
  
  $('#consoleText').html("C:\\_");
  $('#consoleText1').html("");
  $('#consoleText2').html("");
  $('#consoleText3').html("");
  $('#consoleText4').html("");
  $('#consoleText5').html("");
  $('#consoleText6').html("");

  $('#humanBar').text(humanScore);
  $('#computerBar').text(computerScore);
  $('#humanBar').css('width',humanScore*6 + 20);
  $('#computerBar').css('width',computerScore*6 + 20);
}

function patternmatch_info(var1,var2,var3)
{    
  //var3 what kind of output
    //1) for guess what human picks
    //2) for count how many matches
    //3) for probability of guess
  
 var guess = "";
 var key = var1;
 var key_len = key.length;
 
 var big_string = var2;
 var big_string_len = var2.length; 
 
 var ct = 0;
 var result = "";
 var r_ct = 0;
 var p_ct = 0;
 var s_ct = 0;
 var l_ct = 0;
 var k_ct = 0;
 
if (big_string_len - 1 > 0){  
// if (big_string_len > 4){  //min of 5 samples 

 for (var i=big_string_len-2; i>=0; i--) {
   
   if (i-key_len+1 < 0) {break};
   
   var temp_string = big_string.substr(i-key_len+1,key_len);
   var temp_result = big_string.substr(i+1,1);

   //console.log("bigstring:"+big_string);
   //console.log("key:"+ key);
   //console.log("i-key_len+1:" + (i-key_len+1));
   //console.log("key_len:" + key_len);
   //console.log("temp str:"+temp_string);
   //console.log("i:"+i);
   
   if (temp_string == key) {
     ct = ct + 1;
     if (temp_result == "R") {
      r_ct = r_ct + 1;}
     else if (temp_result == "P") {
      p_ct = p_ct + 1;}
     else if (temp_result == "S") {
      s_ct = s_ct + 1;}
     else if (temp_result == "L") {
      l_ct = l_ct + 1;}
     else {k_ct = k_ct + 1;}
   }  
 }

 if (ct > 0) {
   var countArray = new Array();
   countArray[0] = r_ct + Math.random()/100;
   countArray[1] = p_ct + Math.random()/100;   
   countArray[2] = s_ct + Math.random()/100;
   countArray[3] = l_ct + Math.random()/100;
   countArray[4] = k_ct + Math.random()/100;
   
   var largest = Math.max.apply(Math, countArray);
   var prob = Number((Math.min(largest/ct,1) * 100).toFixed(0));

   if (countArray[0] == largest) {var guess = "R"};
   if (countArray[1] == largest) {var guess = "P"};
   if (countArray[2] == largest) {var guess = "S"};
   if (countArray[3] == largest) {var guess = "L"};
   if (countArray[4] == largest) {var guess = "K"};
  }
 }

//3rd parameter as a selector

 if (var3 == 1) {
    return(guess);
 } else if (var3 == 2) {
    return(ct);
 } else if (var3 == 3) {
    return(prob);
 } else { 
    return(0);
 }
}



function letter2word(var1) {
 var longword = "";
 if (var1 == "R") {
   longword = "Rock";
 } else if (var1 == "P") {
   longword = "Paper";
 } else if (var1 == "S") {
   longword = "Scissors";
 } else if (var1 == "L") {
   longword = "Lizard";
 } else if (var1 == "K") {
   longword = "Spock";
 } 
 return(longword);
}

function displaycomputerChoice(var1) {
  if(var1 == "Rock"){
    $('#displayboxComputer .rock').show();
  } else if(var1 == "Paper"){
    $('#displayboxComputer .paper').show();
  } else if(var1 == "Scissors"){
    $('#displayboxComputer .scissors').show();
  } else if(var1 == "Lizard"){
    $('#displayboxComputer .lizard').show();
  } 
  else {
    $('#displayboxComputer .spock').show();
  }
}

$(document).ready(function(){
  $(window).on("keydown",function(e){
   if (humanScore < targetPoints & computerScore < targetPoints) {
    if(e.which==82){
         playRock();
         return;
      }
    else if(e.which==80){
         playPaper();
         return;
     }
    else if(e.which==83){
         playScissors();
         return;
     }
    else if(e.which==76){
         playLizard();
         return;
     }
    else if(e.which==75){
         playSpock();
         return;
     }  else if(e.which==48){   //zero for randomtest
         playRandom();
         return;
     }
   }

  });
});


function playRock() {

         $('#inputRock').fadeTo('fast', 0.0).fadeTo('fast', 1.0);

          humanThink();
          computerThink();

          $('#displayboxHuman img').hide();
          $('#displayboxHuman .whitespace').show();
          $('#displayboxHuman .whitespace').hide();
          $('#displayboxHuman .rock').show();     

          //displayboxHuman.style.display = "block";
          //getComputedSyle(displayboxHuman).display;

          $('#displaybox img').addClass("img-moved-left");

          //alert("pause");

         // $('#displayboxHuman .rock').show();
         // $('#displayboxHuman .paper').hide();
         // $('#displayboxHuman .scissors').hide();
         // $('#displayboxHuman .lizard').hide();
         // $('#displayboxHuman .spock').hide();

         // $('#displayboxHuman .whitespace').show();

          //$('#displayboxHuman .rock').slideDown(3000).addClass('show');

          var humanChoice = "Rock";
          var computerChoice = computerSelection();
          displaycomputerChoice(computerChoice);

          rounds = rounds + 1;
          humanHistory[rounds-1] = "R";

          if (computerChoice == "Spock"){
            computerHistory[rounds-1] = "K";
          } else {
            var tempLetter = computerChoice.substr(0,1);
            computerHistory[rounds-1] = tempLetter.toUpperCase();
          }
          displayText();

          if (computerChoice == "Paper" |
              computerChoice == "Spock") {
            computerScore = computerScore + 1;
            outcome = "You lose!";
            outcome2 = computerChoice + " beats " + humanChoice;
          } else if (computerChoice == "Scissors" |
              computerChoice == "Lizard") {
            humanScore = humanScore + 1;
            outcome = "You win!";
            outcome2 = humanChoice + " beats " + computerChoice;
          } else {
            outcome = "Tie.";
          }

         displayoutcome();
         checkendofgame();
}


function playPaper() {

         $('#inputPaper').fadeTo('fast', 0.0).fadeTo('fast', 1.0);

         humanThink();
         computerThink();

          $('#displayboxHuman img').hide();
          $('#displayboxHuman .whitespace').show();
          $('#displayboxHuman .whitespace').hide();
          $('#displayboxHuman .paper').show();

          $('#displaybox img').addClass("img-moved-left");

         //$('#displayboxHuman .paper').slideDown(250).addClass('show');

         var humanChoice = "Paper";
         var computerChoice = computerSelection();
         displaycomputerChoice(computerChoice);

         rounds = rounds + 1;
         humanHistory[rounds-1] = "P";
         if (computerChoice == "Spock"){
           computerHistory[rounds-1] = "K";
         } else {
           var tempLetter = computerChoice.substr(0,1);
           computerHistory[rounds-1] = tempLetter.toUpperCase();
         }
         displayText();

         if (computerChoice == "Scissors" |
             computerChoice == "Lizard") {
           computerScore = computerScore + 1;
           outcome = "You lose!";
           outcome2 = computerChoice + " beats " + humanChoice;
         } else if (computerChoice == "Spock" |
             computerChoice == "Rock") {
           humanScore = humanScore + 1;
           outcome = "You win!";
           outcome2 = humanChoice + " beats " + computerChoice;
         } else {
           outcome = "Tie.";
         }

        displayoutcome();
        checkendofgame();

}

function playScissors() {
     
     $('#inputScissors').fadeTo('fast', 0.0).fadeTo('fast', 1.0);

     humanThink();
     computerThink();

     $('#displayboxHuman img').hide();
     $('#displayboxHuman .whitespace').show();
     $('#displayboxHuman .whitespace').hide();
     $('#displayboxHuman .scissors').show();

     $('#displaybox img').addClass("img-moved-left");
     //$('#displayboxHuman .scissors').slideDown(250).addClass('show');

     var humanChoice = "Scissors";
     var computerChoice = computerSelection();
     displaycomputerChoice(computerChoice);

     rounds = rounds + 1;
     humanHistory[rounds-1] = "S";
     if (computerChoice == "Spock"){
       computerHistory[rounds-1] = "K";
     } else {
       var tempLetter = computerChoice.substr(0,1);
       computerHistory[rounds-1] = tempLetter.toUpperCase();
     }
     displayText();

     if (computerChoice == "Rock" |
         computerChoice == "Spock") {
      computerScore = computerScore + 1;
       outcome = "You lose!";
       outcome2 = computerChoice + " beats " + humanChoice;
     } else if (computerChoice == "Lizard" |
         computerChoice == "Paper") {
       humanScore = humanScore + 1;
       outcome = "You win!";
       outcome2 = humanChoice + " beats " + computerChoice;
     } else {
       outcome = "Tie.";
     }

    displayoutcome();
  
    checkendofgame();
}


function playLizard() {
  
     $('#inputLizard').fadeTo('fast', 0.0).fadeTo('fast', 1.0);

     humanThink();
     computerThink();

     $('#displayboxHuman img').hide();
     $('#displayboxHuman .whitespace').show();
     $('#displayboxHuman .whitespace').hide();     
     $('#displayboxHuman .lizard').show();
 
     $('#displaybox img').addClass("img-moved-left");
 
     //$('#displayboxHuman .lizard').slideDown(250).addClass('show');

     var humanChoice = "Lizard";
     var computerChoice = computerSelection();
     displaycomputerChoice(computerChoice);
     
     rounds = rounds + 1;
     humanHistory[rounds-1] = "L";
     if (computerChoice == "Spock"){
       computerHistory[rounds-1] = "K";
     } else {
       var tempLetter = computerChoice.substr(0,1);
       computerHistory[rounds-1] = tempLetter.toUpperCase();
     }
     displayText();

     if (computerChoice == "Rock" |
         computerChoice == "Scissors") {
      computerScore = computerScore + 1;
       outcome = "You lose!";
       outcome2 = computerChoice + " beats " + humanChoice;
     } else if (computerChoice == "Spock" |
         computerChoice == "Paper") {
       humanScore = humanScore + 1;
       outcome = "You win!";
       outcome2 = humanChoice + " beats " + computerChoice;
     } else {
       outcome = "Tie.";
     }


    displayoutcome();
    checkendofgame();

}


function playSpock() {
  
    $('#inputSpock').fadeTo('fast', 0.0).fadeTo('fast', 1.0);

    humanThink();
    computerThink();

    $('#displayboxHuman img').hide();
    $('#displayboxHuman .whitespace').show();
    $('#displayboxHuman .whitespace').hide();
    $('#displayboxHuman .spock').show();
   
    $('#displaybox img').addClass("img-moved-left");
   
   // $('#displayboxHuman .spock').slideDown(250).addClass('show');

    var humanChoice = "Spock";
    var computerChoice = computerSelection();
    displaycomputerChoice(computerChoice);
   
    rounds = rounds + 1;
    humanHistory[rounds-1] = "K";
    if (computerChoice == "Spock"){
      computerHistory[rounds-1] = "K";
    } else {
      var tempLetter = computerChoice.substr(0,1);
      computerHistory[rounds-1] = tempLetter.toUpperCase();
    }
    displayText();
     
    if (computerChoice == "Paper" |
        computerChoice == "Lizard") {
      computerScore = computerScore + 1;
      outcome = "You lose!";
      outcome2 = computerChoice + " beats " + humanChoice;
    } else if (computerChoice == "Rock" |
        computerChoice == "Scissors") {
      humanScore = humanScore + 1;
      outcome = "You win!";
      outcome2 = humanChoice + " beats " + computerChoice;
    } else {
      outcome = "Tie.";
    }

   displayoutcome();
   checkendofgame();

}



function playRandom() {

  //human hidden option

  var randomNum=Math.random(),computerMove,randomMove;

  if(randomNum<.20){
    playRock();
  } else if(randomNum<.40){
    playPaper();
  } else if(randomNum<.60){
    playScissors();
  } else if(randomNum<.80){
    playLizard();
  } 
  else {
    playSpock();
  }
}



function animatePhotos() {
   //originally a countdown to human and computer choices

   //$('#displayboxHuman img').fadeTo('fast', 0.3).fadeTo('fast', 1.0);
   //$('#displayboxComputer img').fadeTo('fast', 0.3).fadeTo('fast', 1.0);
  
  //$("#displayboxHuman img").addClass("img-moved-left");
  //$("#displayboxHuman img").removeClass("img-moved-left");


  $('#displaybox img').removeClass("img-moved-left");
 
  $('#displaybox .shownImages').fadeTo('fast', 0.3).fadeTo('fast', 1.0);

}






