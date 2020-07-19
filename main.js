// Imports.
const input = require("readline-sync");
const scoringAlgorithms = require("./scripts/scoringAlgorithms")

// Effects for stdout.
const blink = '\x1b[5m%s\x1b[0m';
const cyan = '\x1b[36m%s\x1b[0m';
const green = '\x1b[32m%s\x1b[0m';
const yellow = '\x1b[33m%s\x1b[0m';
const red = '\x1b[31m%s\x1b[0m';


function prompt_for_variant() {
  console.clear();

  let standard = "1 - Scrabble: The standard variant.";
  let simple = "2 - Simple Score: Each letter is worth 1 point.";
  let bonus = "3 - Bonus Vowels: Vowels are 3 pts, consonants are 1pt.";
  let enter = `Enter corresponding number...`;
  let quit = `Enter "q" to exit or Enter "r" to restart.`;
  let intro = `Please choose a game variant:\n${standard}\n${simple}\n${bonus}\n${enter}`;

  console.log(blink, `Welcome to Scrabble Scorer! ${quit}\n`);

  algorithm = input.question(intro, { hideEchoBack: false, mask: '', limit: ["1", "2", "3", "q", "r"] });
  algorithm = isNaN(algorithm) ? algorithm : +algorithm - 1;

  console.clear();

  return algorithm;
}


function runProgram(algorithms, variant) {
  variant = typeof variant === "function" ? variant() : variant;

  if (variant === "r") {
    return runProgram(algorithms, prompt_for_variant);
  }
  else if (variant === "q") {
    return "Program terminated";
  }
  else {
    console.log(`Using algorithm: "${scoringAlgorithms[variant].name}"\n`);
    word = input.question("Type your word...", { hideEchoBack: false, mask: "" });

    if (word === "q") {
      variant = "q"
    }
    else if (word === "r") {
      variant = "r";
    }
    else {
      let score = algorithms[variant].scoreFunction(word);
      let color = score < 5 ? cyan : (score < 10 ? green : (score < 20 ? yellow : red));
      console.log(color, `Score for "${word}" is ${score} points!\n`);
    }
    return runProgram(algorithms, variant);
  }

}


runProgram(scoringAlgorithms, prompt_for_variant);