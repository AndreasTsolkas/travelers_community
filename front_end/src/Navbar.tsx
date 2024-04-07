import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
        <ul>
          <li>
            <Link to="/myreads">My reads</Link>
          </li>
          <li>
            <Link to="/suggestions">Suggestions</Link>
          </li>
        </ul>
        </nav>
    )
  }
  
  export default Navbar;