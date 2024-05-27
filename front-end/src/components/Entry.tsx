// React
import { ReactElement, useState, useRef } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';

// Custom
import { ScoringAlgorithmName } from '../types/types';
import getScore from '../http/getScore';
import getScoringAlgorithms from '../http/getScoringAlgorithms';

// Styles
import './Entry.css';

const Entry = (): ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [word, setWord] = useState<string | undefined>();
    const [scoringAlgorithmName] = useState<ScoringAlgorithmName>(ScoringAlgorithmName.Scrabble);

    const { data: scoreData } = useQuery({ queryKey: ['score', word, scoringAlgorithmName], queryFn: () => getScore({ word: word as string, scoringAlgorithmName }), enabled: Boolean(word)});
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
                    ref={inputRef}
                    type="text"
                    onKeyUp={(e) => {
                        if (e.key === 'Enter' && inputRef.current?.value) {
                            setWord(inputRef.current?.value);
                        }
                    }}
                />
            </div>
            {scoreData && <span>{word} is worth {scoreData.score} points!</span>}
        </div>
    )
}

export default Entry;