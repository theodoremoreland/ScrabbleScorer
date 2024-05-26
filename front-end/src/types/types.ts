export enum ScoringAlgorithmName {
    Scrabble = "Scrabble",
    SimpleScore = "Simple Score",
    BonusVowels = "Bonus Vowels",
}

export type ScoringAlgorithm = {
    name: ScoringAlgorithmName;
    description: string;
    scoreFunction: (word: string) => number;
}