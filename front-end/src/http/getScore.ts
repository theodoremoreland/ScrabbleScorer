import axios from "axios";

interface ScoreQueryParams {
    word: string;
    scoringAlgorithmId: number;
}

export default async ({ word, scoringAlgorithmId}: ScoreQueryParams ): Promise<{ score: number }> => {
    const response = await axios.get(`http://localhost:8080/score-word?word=${word}&scoringAlgorithmId=${scoringAlgorithmId}`);

    return response.data as { score: number };
}