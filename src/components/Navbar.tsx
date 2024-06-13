import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="starships">STARSHIPS</Link>
        </li>
        <li>
          <Link to="login">Log in</Link>
        </li>
        <li>
          <Link to="signup">Sign up</Link>
        </li>
      </ul>
    </nav>
  );
}
