import { Link } from "react-router-dom";

function Header() {
    <nav>
      <Link to="/">
        <button>SeikiSeki</button>
      </Link>
      <div>
        {/* only show this button while not logged in */}
        <button>Login</button>
      </div>
    </nav>;
}

export default Header;
