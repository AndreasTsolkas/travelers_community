import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'src/App.css';
import 'src/basic.css';
import MyReads from 'src/pages/MyReads';
import Suggestions from 'src/pages/Suggestions';
import Navbar from 'src/Navbar';
import Home from 'src/pages/Home';
import {httpClient} from 'src/requests';
import * as Important from 'src/important';

function App() {
  return (
    <div className="container">
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myreads" element={<MyReads />} />
        <Route path="/suggestions" element={<Suggestions />} />
      </Routes>
      
    </div>
  );
}

export default App;