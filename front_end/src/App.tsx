import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import 'src/App.css';
import 'src/basic.css';
import MyBooks from 'src/pages/MyBooks';
import Suggestions from 'src/pages/Suggestions';
import Home from 'src/pages/Home';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="container">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/mybooks">My books</Link>
          </li>
          <li>
            <Link to="/suggestions">Suggestions</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/suggestions" element={<Suggestions />} />
      </Routes>
      
    </div>
  );
}

export default App;