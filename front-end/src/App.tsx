import { ReactElement } from 'react';

// Components
import Entry from './components/Entry';

// Styles
import './App.css';

const App = (): ReactElement => {

  return (
    <div className="App">
      <h1>Welcome to Scrabble Scorer!</h1>
      <Entry />
    </div>
  )
}

export default App;
