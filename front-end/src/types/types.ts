export enum ScoringAlgorithmName {
    Scrabble = "Scrabble",
    SimpleScore = "Simple Score",
    BonusVowels = "Bonus Vowels",
}

export type ScoringAlgorithm = {
    id: number;
    name: ScoringAlgorithmName;
    description: string;
    scoreFunction: (word: string) => number;
}

export interface ScoreData {
    wordScore: number;
    letters: {
        letter: string;
        letterScore: number;
    }[]
}