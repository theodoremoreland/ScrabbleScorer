blink = '\x1b[5m%s\x1b[0m';
cyan = '\x1b[36m%s\x1b[0m';
red = '\x1b[31m%s\x1b[0m';
yellow = '\x1b[33m%s\x1b[0m';
blue = '\x1b[34m%s\x1b[0m';

// test
        
String.prototype.isVowel = function() {
  let vowels = ["a", "e", "i", "o", "u"];
  if (vowels.includes(this[0].toLowerCase())) {
    return 3;
  } else if (this[0] === " ") {
    return 0;
  } else {
    return 1;
  }
};

// Code your transform function here:
function transform(...obj) {
  let oldScoreKey = obj[0];
  let newScoreKey = {};
  for (let key in oldScoreKey) {
    for (let j = 0; j < oldScoreKey[key].length; j++) {
      let letter = oldScoreKey[key][j].toLowerCase();
      newScoreKey[letter] = +key; // Unary operator
    }
  }
  newScoreKey[" "] = 0;
  return newScoreKey;
}

// Code your initialPrompt function here:
function initialPrompt() {
  let v1 = "1 - Scrabble: The standard variant.";
  let v2 = "2 - Simple Score: Each letter is worth 1 point.";
  let v3 = "3 - Bonus Vowels: Vowels are 3 pts, consonants are 1pt.";
  let enter = `Enter corresponding number...`;
  let quit = `Enter "q" to exit.`;
  console.log(blink, `Welcome to Scrabble Scorer! ${quit}\n`);
  let intro = `Please choose a game variant:\n${v1}\n${v2}\n${v3}\n${enter}`;
  const input = require("readline-sync");
  algorithm = input.question(intro, {hideEchoBack: true, mask: '', limit: ["1", "2", "3", "q"]});
  return algorithm;
}

// Code your runProgram function here:
function runProgram(algorithms, prompt) {
  let variant = prompt();
  if (variant === "q") { return "Program terminated"; } else { variant = +variant - 1}
  console.log(`Using algorithm: "${scoringAlgorithms[variant].name}"\n`);
  do {
  const input = require("readline-sync");
  word = input.question("Type your word...", { hideEchoBack: true, mask: "" });
  if (word === "q") { return "Program terminated"; }
  let score = algorithms[variant].scoreFunction(word);
  let color = score === 0 ?  red : (score < 10 ? yellow : (score < 20 ? cyan : blink));
  console.log(color, `Score for "${word}" is ${score} points!\n`);
  } while (word != "q");
}

// Here is the oldScoreKey object:
const oldScoreKey = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

// Use the transform function to create the newScoreKey object here:
newScoreKey = transform(oldScoreKey);

// Create your scoringAlgorithms array here:
let scoringAlgorithms = [
  {name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoreFunction:
      (word) => { points = 0; 
                  word.split("").forEach(letter =>  points += newScoreKey[letter.toLowerCase()]);
                  return points;
                }},
  {name: "Simple Score", 
  description: "Each letter is worth 1 point.",
  scoreFunction: (word) => word.replace(" ", "").length },
  //
  {name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1pt.",
  scoreFunction: (word) => {  let points = 0;
                              word.split("").forEach(letter => points += letter.isVowel()); 
                              return points;
                          }}];

// Call the runProgram function here:
runProgram(scoringAlgorithms, initialPrompt);


