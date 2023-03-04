import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import './css/App.css'
import Header from './header/Header'

function App(props) {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <a href="https://reactjs.org" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  );
}

export default App;
