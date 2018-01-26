
var guesses = [];
var prevGuess = 0;
var numGuesses = 0;
var guessLimit = 10;
var numRange = 100;
var guesses = [];
var correctNum = pickNumber(numRange);
var messageDisplay = document.querySelector("#message");

init();

//essentially the main function
//if user presses enter
function init() {
	$("input[type='text']").keypress(function(event){
		if(event.which === 13){
			//grabbing new todo text from input
			var userNum = $(this).val();
			$(this).val("");
			if (correctInput(userNum)) {
				numGuesses++;
				guesses.push(userNum);
				compare(prevGuess, userNum);
				prevGuess = userNum;//store previous guess 
			}
		}
	});
}

//returns a number 1 - numRange
function pickNumber(num) {
	return Math.floor((Math.random() * num) + 1);
}

//checks to see if # is within range
//checks if user still has chances to guess
//checks that the user's guess is not a duplicate
function correctInput(num) {
	return verifyRange(num) && guessCheck(numGuesses) && noDuplicates(num);
}

//verify number is btwn 1 and numRange
function verifyRange(num) {
	if (!(num >= 1 && num <= numRange)) {
		messageDisplay.textContent = "Not between 1 and " + numRange;
		return false;
	}
	return true;
}

//check if the user still has chances to guess
function guessCheck(num) {
	if (num >= guessLimit) {
		messageDisplay.textContent = "No more guesses - GAME OVER";
		return false;
	}
	return true;
}

//check to see if guess is a duplicate
function noDuplicates(num) {
	for (var i=0; i < guesses.length; i++) {
		if (num == guesses[i]) {
			messageDisplay.textContent = "Already guessed that - TRY AGAIN";
			return false;
		}
	}
	return true;
}

//compare user input to correctNum, let user know whether to guess higher or lower, and then pass to hotOrCold 
function compare(prev, num) {
	var markup;
	if (num > correctNum) {
		markup = "<tr><td>" + num + "</td></tr>";
		$("table tbody").append(markup);
		hotOrCold(prev, num);
	} else if (num < correctNum) {
		markup = "<tr><td>&nbsp;</td><td>" + num + "</td></tr>";
		$("table tbody").append(markup);
		hotOrCold(prev, num);
	} else {
		messageDisplay.textContent = "Correct!";
		$("body").addClass("correct");
	}
}

//keep track of user's previous guess
//tell them whether they're getting hotter or colder
function hotOrCold(prev, curr) {
	var prevDiff = Math.abs(prev - correctNum);
	var currDiff = Math.abs(curr - correctNum);

	if (prev === 0) {//handles first guess, when there is no prevGuess
		$("table thead").append("<tr><th>Too High</th><th>Too Low</th></tr>");
	} else if (currDiff > prevDiff) {
		messageDisplay.textContent = "Getting colder...";
	} else if (currDiff < prevDiff) {
		messageDisplay.textContent ="Getting hotter...";
	}
}

//reset the game when "New Game" button is clicked
$("#reset").click(function(){
	reset();
});

//reset game
function reset() {
	$("body").removeClass("correct");
	prevGuess = 0;
	numGuesses = 0;
	guesses = [];
	correctNum = pickNumber(numRange);
	messageDisplay.textContent = "Enter a number 1 - " + numRange;
	$("table thead").html("");
	$("table tbody").html("");
}

//provide the answer when "Give Hint" button is clicked
$("#hint").click(function(){
	messageDisplay.textContent = "The correct number is: " + correctNum;
});



