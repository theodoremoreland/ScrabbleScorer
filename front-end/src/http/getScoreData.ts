import axios, { isAxiosError } from "axios";
import href from "./href";
import { ScoreData } from "../types/types";

interface ScoreQueryParams {
    word: string;
    scoringAlgorithmId: number;
}

export default async ({ word, scoringAlgorithmId}: ScoreQueryParams ): Promise<ScoreData> => {
    try {
        const response = await axios.get(`${href}score-word?word=${word}&scoringAlgorithmId=${scoringAlgorithmId}`);

        return response.data as ScoreData;
    } catch (error: unknown) {
        if (isAxiosError(error) && error.response?.status === 400 && error.response?.data) {

            throw new Error(error.response.data);
        }
        
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}