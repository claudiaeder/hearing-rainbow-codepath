//Global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global variables
var pattern = [];
var patternLen = 8;
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var clueHoldTime = 1000; //how long to hold each clue's light/sound
var playbackRate = 1.0; //how fast the audio is played
var volume = 0.5; //must be between 0.0 and 1.0
var guessCounter = 0;
var secs = 10; //how long you have to guess the pattern correct
var strikes = 0;
var gameMode = "color"; //start in color mode
var randomizedArray = [1, 2, 3, 4, 5, 6]; //array that will be randomized
var buttonAudioMap = {}; //where the randomized color audio corresponding to each button gets stored
var interval;


//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

//get which radio button is selected
function determineGameMode() {
  var radio = document.getElementsByName("gameMode");

  for (var i = 0, length = radio.length; i < length; i++) {
    if (radio[i].checked) {
      gameMode = radio[i].value;

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
}

//set instructions based off game mode
//called when random buttons change state
function setInstructions() {
  determineGameMode();
  if (gameMode == "color") {
    document.getElementById("welcome").innerHTML =
      "Welcome to the game! Repeat back the pattern by pressing the buttons... Be careful! The color you hear may not be the color you press!";
  } else {
    document.getElementById("welcome").innerHTML =
      "Welcome to the game! Repeat back the sound pattern by pressing the buttons.";
  }
}

//randomizes the pattern of buttons
function createPattern(numOfBtn) {
  for (let i = 0; i <= patternLen; i++) {
    pattern[i] = Math.floor(Math.random() * numOfBtn + 1);
  }
}

function startGame() {
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  createPattern(6);
  strikes = 0;
  determineGameMode();
  //must randomly reassign audio if in color mode
  if (gameMode == "color") {
    randomizeAudio(randomizedArray);
  }

  //swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("strikesLbl").innerHTML = "Strikes: " + strikes;
  document.getElementById("strikesLbl").classList.remove("hidden");
  document.getElementById("countdownLbl").innerHTML =
    "Countdown: " + secs + " seconds";
  document.getElementById("countdownLbl").classList.remove("hidden");
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;

  //swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("strikesLbl").classList.add("hidden");
  clueHoldTime = 1000; //how long to hold each clue's light/sound
  playbackRate = 1.0;
  resetCountdown();
  document.getElementById("countdownLbl").classList.add("hidden");
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function countdown() {
  interval = setInterval(function() {
    secs--;
    document.getElementById("countdownLbl").innerHTML =
      "Countdown: " + secs + " seconds";
    if (secs == -1) {
      loseGame();
    }
  }, 1000);
}

function resetCountdown() {
  clearInterval(interval);
  secs = 10;
  document.getElementById("countdownLbl").innerHTML =
    "Countdown: " + secs + " seconds";
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    //play audio clips in color mode and tones in sound mode
    determineGameMode();
   if (gameMode == "color") {
      playAudio(btn, playbackRate, clueHoldTime);
    } else {
      playTone(btn, clueHoldTime);
    }
    
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  resetCountdown();
  setTimeout(countdown, delay-clueHoldTime);
  playbackRate += 0.1;
  clueHoldTime -= 95;
}

function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}

function winGame() {
  stopGame();
  alert("Game Over. You won!");
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }

  if (pattern[guessCounter] == btn) {
    //guess correct
    if (guessCounter == progress) {
      if (progress == patternLen - 1) {
        winGame();
      } else {
        //add another clue
        progress++;
        playClueSequence();
      }
    } else {
      //right so far
      guessCounter++;
    }
  } else {
    //incorrect guess
    strikes++;
    //update strike label so user knows how many strikes the have left
    document.getElementById("strikesLbl").innerHTML = "Strikes: " + strikes;
    if (strikes == 3) {
      loseGame();
    }
  }
}

function start(btn) {
  determineGameMode();
  if (gameMode == "color") {
    startAudio(btn);
  } else {
    startTone(btn);
  }
}

function stop(btn) {
  determineGameMode();
  if (gameMode == "color") {
    stopAudio(btn);
  } else {
    stopTone();
  }
}

//randomly assign the audio to buttons by randomizing array
//using indices to map to buttons in dictionary
function randomizeAudio(randomizedArray) {
  var currentIndex = randomizedArray.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = randomizedArray[currentIndex];
    randomizedArray[currentIndex] = randomizedArray[randomIndex];
    randomizedArray[randomIndex] = temporaryValue;
  }
  for (let i = 0; i <= randomizedArray.length; i++) {
    buttonAudioMap[i + 1] = audioMap[randomizedArray[i]];
  }
}
//map of audio names (used to play audio for correct buttons when not in game mode)
//also aids in randomization
const audioMap = {
  1: "pink",
  2: "orange",
  3: "yellow",
  4: "green",
  5: "blue",
  6: "purple"
};

function playAudio(btn, playbackRate, len) {
  var audio = document.getElementById(buttonAudioMap[btn]);
  //must speed up as clue lengths get shorter
  audio.playbackRate = playbackRate;
  audio.play();
  tonePlaying = true;
  setTimeout(function() {
    stopAudio(btn);
  }, len);
}

function startAudio(btn) {
  if (!tonePlaying) {
    //if not playing game, play correct audio
    if (!gamePlaying) {
      var audio = document.getElementById(audioMap[btn]);
    } else {
      var audio = document.getElementById(buttonAudioMap[btn]);
    }
    audio.play();
    tonePlaying = true;
  }
}

function stopAudio(btn) {
  if (!gamePlaying) {
    var audio = document.getElementById(audioMap[btn]);
  } else {
    var audio = document.getElementById(buttonAudioMap[btn]);
  }
  audio.pause();
  audio.currentTime = 0;
  tonePlaying = false;
}

// Sound Synthesis Functions
const freqMap = {
  1: 250,
  2: 320,
  3: 370,
  4: 400,
  5: 450,
  6: 480
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}


