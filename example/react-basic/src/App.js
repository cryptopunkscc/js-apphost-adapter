import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import appHost, {log, platform} from './apphost';

function App() {

  const [info, setInfo] = useState("undefined")

  async function handleClick() {
    const id = await appHost.resolve("localnode")
    const inf = await appHost.nodeInfo(id)
    const str = JSON.stringify(inf, null, 2)
    log(str)
    setInfo(str)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          Running on { platform }
        </p>
        <button onClick={handleClick}>
          get node info
        </button>
        <p>{info}</p>
      </header>
    </div>
  );
}

export default App;
