// React
import { ReactElement, useState, useRef, useEffect } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Custom
import getScore from '../http/getScoreData';
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

    const { data: scoreData, error: scoreDataError } = useQuery({
        queryKey: ['score', word, scoringAlgorithmId], 
        queryFn: () => getScore({ word: word as string, scoringAlgorithmId }),
        retry: false,
        staleTime: Infinity,
        enabled: Boolean(word)
    });

    const { data: definitionData } = useQuery({
        queryKey: ['definition', word], 
        queryFn: () => getDefinition({ word: word as string }),
        staleTime: Infinity,
        enabled: Boolean(word) && Boolean(scoreData)
    });

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (scoreDataError) {
            toast.error(scoreDataError.message, { toastId: 'score-error' });
        }
    }, [scoreDataError]);

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
            {scoreData && word && scoringAlgorithmId &&
            <div className='results'>

                <ul className='letters' title={definition || undefined}>
                    {scoreData.letters.map(({letter, letterScore}, index) => (
                        <li 
                            key={`${letter}@${index}`}
                            className='letter'
                        >
                            {letter.toUpperCase()}
                            <span className='letter-score'>{letterScore}</span>
                        </li>
                    ))}
                </ul>
                <span>is worth {scoreData.wordScore} points!</span>
                <span className='algorithm-reflect'>({scoringAlgorithms.find(algorithm => algorithm.id === scoringAlgorithmId)?.name})</span>
            </div>
            }
        </div>
    )
}

export default Entry;