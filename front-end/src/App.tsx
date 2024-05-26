import { ReactElement, useEffect, useState } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';

// Custom
import { ScoringAlgorithmName } from './types/types';
import getScore from './http/getScore';
import getScoringAlgorithms from './http/getScoringAlgorithms';

// Styles
import './App.css';

const App = (): ReactElement => {
  const [word, setWord] = useState<string>('Test');
  const [scoringAlgorithmName] = useState<ScoringAlgorithmName>(ScoringAlgorithmName.Scrabble);

  const { data: scoreData } = useQuery({ queryKey: ['score', word, scoringAlgorithmName], queryFn: () => getScore({ word, scoringAlgorithmName }), enabled: Boolean(word)});
  const { data: scoringAlgorithmsData } = useQuery({queryKey: ['scoringAlgorithms'], queryFn: getScoringAlgorithms});

  useEffect(() => {

  }, []);

  return (
    <div className="App">
      {scoringAlgorithmsData && <span>Scoring Algorithm: {JSON.stringify(scoringAlgorithmsData)}</span>}
      <input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
      {scoreData && <span>{scoreData.score}</span>}
    </div>
  )
}

export default App;
