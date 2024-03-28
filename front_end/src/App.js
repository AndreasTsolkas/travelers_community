import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import { backEndBaseUrl } from './important';

async function getBackEndData() {
  const response =  await axios.get(backEndBaseUrl+'/gethello');
  return response;
}
function App() {
  const response = getBackEndData();
  console.log(response);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
