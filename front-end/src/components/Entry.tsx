// React
import { ReactElement, useState } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';

// Custom
import { ScoringAlgorithmName } from '../types/types';
import getScore from '../http/getScore';
import getScoringAlgorithms from '../http/getScoringAlgorithms';

// Styles
import './Entry.css';

const Entry = (): ReactElement => {
    const [word, setWord] = useState<string>('Test');
    const [scoringAlgorithmName] = useState<ScoringAlgorithmName>(ScoringAlgorithmName.Scrabble);

    const { data: scoreData } = useQuery({ queryKey: ['score', word, scoringAlgorithmName], queryFn: () => getScore({ word, scoringAlgorithmName }), enabled: Boolean(word)});
    const { data: scoringAlgorithmsData } = useQuery({queryKey: ['scoringAlgorithms'], queryFn: getScoringAlgorithms});

    return (
        <div className='Entry'>
            <header>
                <span className='title'>ScrabbleScorer</span><span className='algorithm'>[Scrabble]</span>
            </header>
            <ul>
                {scoringAlgorithmsData && scoringAlgorithmsData.map((algorithm) => (
                <li key={algorithm.name}>
                    <p>
                    <strong>{algorithm.name}</strong>
                    </p>
                    <p>{algorithm.description}</p>
                </li>
                ))}
            </ul>
            <div className='input-area'>
                <span>{'> '}</span>
                <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                />
            </div>
            {scoreData && <span>{word} is worth {scoreData.score} points!</span>}
        </div>
    )
}

export default Entry;