import axios from 'axios';
import href from './href';
import { ScoringAlgorithm } from '../types/types';

export default async (): Promise<ScoringAlgorithm[]> => {
    const response = await axios.get(`${href}scoring-algorithms`);

    return response.data as ScoringAlgorithm[];
}