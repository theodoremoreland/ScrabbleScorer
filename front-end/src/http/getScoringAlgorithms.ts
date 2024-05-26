import axios from 'axios';
import { ScoringAlgorithm } from '../types/types';

export default async (): Promise<ScoringAlgorithm[]> => {
    const response = await axios.get('http://localhost:8080/scoring-algorithms');

    return response.data as ScoringAlgorithm[];
}