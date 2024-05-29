import axios from "axios";
import href from "./href";

interface ScoreQueryParams {
    word: string;
    scoringAlgorithmId: number;
}

export default async ({ word, scoringAlgorithmId}: ScoreQueryParams ): Promise<{ score: number }> => {
    const response = await axios.get(`${href}score-word?word=${word}&scoringAlgorithmId=${scoringAlgorithmId}`);

    return response.data as { score: number };
}