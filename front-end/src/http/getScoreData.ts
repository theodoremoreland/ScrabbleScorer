import axios from "axios";
import href from "./href";
import { ScoreData } from "../types/types";

interface ScoreQueryParams {
    word: string;
    scoringAlgorithmId: number;
}

export default async ({ word, scoringAlgorithmId}: ScoreQueryParams ): Promise<ScoreData> => {
    const response = await axios.get(`${href}score-word?word=${word}&scoringAlgorithmId=${scoringAlgorithmId}`);

    return response.data as ScoreData;
}