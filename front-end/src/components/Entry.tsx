// React
import { ReactElement, useState, useRef, useEffect } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';

// Custom
import getScore from '../http/getScore';
import getDefinition from '../http/getDefinition';
import { ScoringAlgorithm } from '../types/types';

interface Props {
    entryKey: string;
    scoringAlgorithms: ScoringAlgorithm[];
    addEntry?: () => void;
}

const Entry = ({ scoringAlgorithms, addEntry, entryKey }: Props): ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [word, setWord] = useState<string | undefined>(undefined);
    const [scoringAlgorithmId, setScoringAlgorithmId] = useState<number>(1);
    const [definition, setDefinition] = useState<string | undefined>(undefined);

    const { data: score } = useQuery({
        queryKey: ['score', word, scoringAlgorithmId], 
        queryFn: () => getScore({ word: word as string, scoringAlgorithmId }),
        staleTime: Infinity,
        enabled: Boolean(word)
    });

    const { data: definitionData } = useQuery({
        queryKey: ['definition', word], 
        queryFn: () => getDefinition({ word: word as string }),
        staleTime: Infinity,
        enabled: Boolean(word) && Boolean(score)
    });

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (definitionData) {
            setDefinition(definitionData.meanings[0]?.definitions[0]?.definition);
        }
    }, [definitionData]);

    return (
        <div key={entryKey} className='Entry'>
            <header>
                <span className='title'>ScrabbleScorer</span>
                <span className='at'>@</span>
                <span className='algorithm'>
                    [
                    <select 
                        onChange={(e) => {
                            const input: HTMLElement | null = inputRef.current;

                            if (input && !input.classList.contains('disabled')) {
                                input.focus();
                            }

                            setScoringAlgorithmId(Number(e.target.value));
                        }}
                    >
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
                            const word: string = inputRef.current.value.trim();

                            setWord(word);
                            addEntry && addEntry();

                            inputRef.current.disabled = true;
                            inputRef.current.classList.add('disabled');
                        }
                    }}
                />
            </div>
            {score && word && scoringAlgorithmId &&
            <div className='results'>
                <ul className='letters' title={definition || undefined}>
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