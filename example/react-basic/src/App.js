import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import appHost, {log, platform} from './apphost';

function App() {
  log("render")

  const [rpc, setRpc] = useState({})
  const [state, setState] = useState({
    info: "undefined",
    sum: 0,
    counter: 0,
  })

  useEffect(async () => {
    try {
      log("rpc connecting...")
      let conn = await appHost.query("", "rpc")
      await conn.bindRpc()
      setRpc(conn)
      log("rpc connected")
    } catch (e) {
      log(e)
    }
  }, [])

  async function info() {
    const id = await appHost.resolve("localnode")
    const info = await appHost.nodeInfo(id)
    const string = JSON.stringify(info, null, 2)
    log(string)
    setState({...state, info: string})
  }

  async function sum() {
    const num = await rpc.sum(2, 2)
    setState({...state, sum: num})
  }

  async function inc() {
    const num = await rpc.inc()
    setState({...state, counter: num})
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

        <p>Running on { platform }</p>
        <p>{JSON.stringify(rpc)}</p>

        <button onClick={info}>get node info</button>
        <p>{state.info}</p>

        <button onClick={sum}>rpc sum 2 + 2</button>
        <p>{state.sum}</p>

        <button onClick={inc}>rpc increment</button>
        <p>{state.counter}</p>

      </header>
    </div>
  );
}

export default App;
