// First party
import { question } from "readline-sync";

// Custom
import { scoringAlgorithms } from "./modules/scoringAlgorithms.js";

// Effects for stdout.
const blink = "\x1b[5m%s\x1b[0m";
const cyan = "\x1b[36m%s\x1b[0m";
const green = "\x1b[32m%s\x1b[0m";
const yellow = "\x1b[33m%s\x1b[0m";
const red = "\x1b[31m%s\x1b[0m";

function promptForVariant() {
  console.clear();

  const standard = "1 - Scrabble: The standard variant.";
  const simple = "2 - Simple Score: Each letter is worth 1 point.";
  const bonus = "3 - Bonus Vowels: Vowels are 3 pts, consonants are 1pt.";
  const enter = `Enter corresponding number...`;
  const quit = `Enter "q" to exit or Enter "r" to restart.`;
  const intro = `Please choose a game variant:\n${standard}\n${simple}\n${bonus}\n${enter}`;

  console.log(blink, `Welcome to Scrabble Scorer! ${quit}\n`);

  let algorithm = question(intro, {
    hideEchoBack: false,
    mask: "",
    limit: ["1", "2", "3", "q", "r"],
  });
  algorithm = isNaN(algorithm) ? algorithm : +algorithm - 1;

  console.clear();

  return algorithm;
}

function runProgram(algorithms, variant) {
  variant = typeof variant === "function" ? variant() : variant;

  if (variant === "r") {
    return runProgram(algorithms, promptForVariant);
  } else if (variant === "q") {
    return "Program terminated";
  } else {
    console.log(`Using algorithm: "${scoringAlgorithms[variant].name}"\n`);

    const word = question("Type your word...", {
      hideEchoBack: false,
      mask: "",
    });

    if (word === "q") {
      variant = "q";
    } else if (word === "r") {
      variant = "r";
    } else {
      const score = algorithms[variant].scoreFunction(word);
      const color =
        score < 5 ? cyan : score < 10 ? green : score < 20 ? yellow : red;

      console.log(color, `Score for "${word}" is ${score} points!\n`);
    }

    return runProgram(algorithms, variant);
  }
}

runProgram(scoringAlgorithms, promptForVariant);
