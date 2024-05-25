type OldScoreKey = {
  [key: number]: string[];
};

type NewScoreKey = {
  [key: string]: number;
};

type ScoringAlgorithm = {
  name: string;
  description: string;
  scoreFunction: (word: string) => number;
};

const transform = (oldScoreKey: OldScoreKey): NewScoreKey => {
  const newScoreKey = {};

  for (let key in oldScoreKey) {
    for (let j = 0; j < oldScoreKey[key].length; j++) {
      let letter = oldScoreKey[key][j].toLowerCase();

      newScoreKey[letter] = +key; // Unary operator
    }
  }

  newScoreKey[" "] = 0;

  return newScoreKey;
};

const oldScoreKey: OldScoreKey = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

const newScoreKey: NewScoreKey = transform(oldScoreKey);

const scoreVowel = (char: string): 0 | 1 | 3 => {
  let vowels = ["a", "e", "i", "o", "u"];

  if (vowels.includes(char.toLowerCase())) {
    return 3;
  } else if (char === " ") {
    return 0;
  } else {
    return 1;
  }
};

const scrabbleAlgorithm: ScoringAlgorithm = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoreFunction: (word: string): number => {
    let points: number = 0;

    word
      .split("")
      .forEach((letter) => (points += newScoreKey[letter.toLowerCase()]));

    return points;
  },
};
const simpleScoreAlgorithm: ScoringAlgorithm =   {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoreFunction: (word: string): number => word.replace(" ", "").length,
};
const vowelBonusScoreAlgorithm: ScoringAlgorithm = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1pt.",
  scoreFunction: (word: string): number => {
    let points: number = 0;

    word
      .split("")
      .forEach(char => (points += scoreVowel(char)));

    return points;
  },
};

export const scoringAlgorithms:  ScoringAlgorithm[] = [
  scrabbleAlgorithm,
  simpleScoreAlgorithm,
  vowelBonusScoreAlgorithm,
];
