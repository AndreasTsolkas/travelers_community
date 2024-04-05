import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Page1 from 'src/pages/Page1';
import Page2 from 'src/pages/Page2';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div >
      <nav>
        <ul>
          <Link to="/page1" >
            Page1
          </Link>
          <Link to="/page2" >
            Page2
          </Link>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </div>
  );
}

export default App;
