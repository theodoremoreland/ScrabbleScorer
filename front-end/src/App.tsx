import { ReactElement, Fragment } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';

// Components
import Entries from './components/Entries';

// Custom
import { ScoringAlgorithm } from './types/types';
import getScoringAlgorithms from './http/getScoringAlgorithms';

// Styles
import './App.css';

const App = (): ReactElement => {
  const { data: scoringAlgorithms } = useQuery({
    queryKey: ['scoringAlgorithms'], 
    queryFn: getScoringAlgorithms, 
    staleTime: Infinity
  });

  return (
    <div className="App">
      <h1>Welcome to Scrabble Scorer!</h1>
      {
        scoringAlgorithms && 
        <p>
          Enter a word to see its score using 1 of {scoringAlgorithms.length} algorithms. 
          { 
            scoringAlgorithms.map(
              (algorithm: ScoringAlgorithm) => 
                <Fragment key={algorithm.name}>
                  {' '}
                  [<span className='algorithm-name'>{algorithm.name}</span>]
                  {' '}
                  <span className='algorithm-description'>{algorithm.description}</span>
                </Fragment>
            )
          }
        </p>
      }
      {
        scoringAlgorithms && <Entries scoringAlgorithms={scoringAlgorithms} />
      }
    </div>
  )
}

export default App;
