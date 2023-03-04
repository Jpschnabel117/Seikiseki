import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link to="/">
        <button>SeikiSeki</button>
      </Link>
      <div>
        {/* only show this button while not logged in */}
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </nav>
  );
}

export default Header;
