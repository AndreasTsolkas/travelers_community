import './App.css';
import axios from 'axios';

import {httpClient} from './requests';
import { backEndBaseUrl } from './important';

async function getBackEndData() {
  const response =  await httpClient.get(backEndBaseUrl+'/gethello');
  console.log(response);
  return response.data;
}

function App() {
  const data = getBackEndData();
  console.log(data);
  return (
    <div className="App">
      <h3>here again</h3>
    </div>
  );
}

export default App;
