import logo from './logo.svg';
import './App.css';
import axios from 'axios';

async function getBackEndData() {
  const response =  await axios.get('http://localhost:3001/gethello');
  return response;
}
function App() {
  const response = getBackEndData();
  console.log(response);
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
        </a>
      </header>
    </div>
  );
}

export default App;
