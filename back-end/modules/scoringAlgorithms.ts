const isVowel = (char: string) => {
  let vowels = ["a", "e", "i", "o", "u"];

  if (vowels.includes(char.toLowerCase())) {
    return 3;
  } else if (char === " ") {
    return 0;
  } else {
    return 1;
  }
};

const oldScoreKey = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function transform(oldScoreKey) {
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

const newScoreKey = transform(oldScoreKey);

export const scoringAlgorithms: { name: string, description: string, scoreFunction: (word: string) => number }[] = [
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoreFunction: (word: string): number => {
      let points: number = 0;

      word
        .split("")
        .forEach((letter) => (points += newScoreKey[letter.toLowerCase()]));

      return points;
    },
  },
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scoreFunction: (word: string): number => word.replace(" ", "").length,
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1pt.",
    scoreFunction: (word: string): number => {
      let points: number = 0;

      word.split("").forEach((char) => (points += isVowel(char)));

      return points;
    },
  },
];
