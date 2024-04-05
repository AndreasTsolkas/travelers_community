
import 'src/App.css'
import 'src/basic.css'
import Page1 from 'src/pages/Page1'
import Page2 from 'src/pages/Page2'
import { Link, Route, Routes } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

function App() {
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link to="/page1">Page 1</Link>
          </li>
          <li>
            <Link to="/page2">Page 2</Link>
          </li>
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
