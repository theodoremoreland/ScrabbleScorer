// React
import { ReactElement, useState, useRef, useEffect } from 'react';

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
    const [scoringAlgorithmName, setScoringAlgorithmName] = useState<ScoringAlgorithmName>(ScoringAlgorithmName.Scrabble);

    const { data: score } = useQuery({ queryKey: ['score', word, scoringAlgorithmName], queryFn: () => getScore({ word: word as string, scoringAlgorithmName }), enabled: Boolean(word)});
    const { data: scoringAlgorithms } = useQuery({queryKey: ['scoringAlgorithms'], queryFn: getScoringAlgorithms});

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className='Entry'>
            <header>
                <span className='title'>ScrabbleScorer</span>
                <span className='at'>@</span>
                <span className='algorithm'>
                    [
                    <select onChange={(e) => setScoringAlgorithmName(e.target.value as ScoringAlgorithmName)}>
                        {scoringAlgorithms && scoringAlgorithms.map((algorithm) => (
                            <option
                                title={algorithm.description}
                                key={algorithm.name}
                                value={algorithm.name}
                            >
                                {algorithm.name}
                            </option>
                        ))}
                    </select>
                    ]
                </span>
            </header>
            <div className='input-area'>
                <span>{'>'}</span>
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
            {score && word &&
            <div className='results'>
                <ul className='letters'>
                    {word.split('').map((letter, index) => (
                        <li 
                            key={`${letter}@${index}`}
                            className='letter'
                        >
                            {letter.toUpperCase()}
                        </li>
                    ))}
                </ul>
                <span>is worth {score.score} points!</span>
            </div>
            }
        </div>
    )
}

export default Entry;