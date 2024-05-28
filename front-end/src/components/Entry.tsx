// React
import { ReactElement, useState, useRef, useEffect } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';

// Custom
import getScore from '../http/getScore';
import { ScoringAlgorithm } from '../types/types';

interface Props {
    entryKey: string;
    scoringAlgorithms: ScoringAlgorithm[];
    addEntry?: () => void;
}

const Entry = ({ scoringAlgorithms, addEntry, entryKey }: Props): ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [word, setWord] = useState<string | undefined>();
    const [scoringAlgorithmId, setScoringAlgorithmId] = useState<number>(1);

    const { data: score } = useQuery({ queryKey: ['score', word, scoringAlgorithmId], queryFn: () => getScore({ word: word as string, scoringAlgorithmId }), enabled: Boolean(word)});

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div key={entryKey} className='Entry'>
            <header>
                <span className='title'>ScrabbleScorer</span>
                <span className='at'>@</span>
                <span className='algorithm'>
                    [
                    <select onChange={(e) => setScoringAlgorithmId(Number(e.target.value))}>
                        {scoringAlgorithms && scoringAlgorithms.map((algorithm) => (
                            <option
                                title={algorithm.description}
                                key={algorithm.name}
                                value={algorithm.id}
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
                            addEntry && addEntry();
                        }
                    }}
                />
            </div>
            {score && word && scoringAlgorithmId &&
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
                <span className='algorithm-reflect'>({scoringAlgorithms.find(algorithm => algorithm.id === scoringAlgorithmId)?.name})</span>
            </div>
            }
        </div>
    )
}

export default Entry;