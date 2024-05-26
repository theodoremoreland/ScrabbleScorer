import axios from "axios";
import { ScoringAlgorithmName } from "../types/types";

interface ScoreQueryParams {
    word: string;
    scoringAlgorithmName: ScoringAlgorithmName;
}

export default async ({ word, scoringAlgorithmName}: ScoreQueryParams ): Promise<{ score: number }> => {
    const response = await axios.get(`http://localhost:8080/score-word?word=${word}&scoringAlgorithmName=${scoringAlgorithmName}`);

    return response.data as { score: number };
}