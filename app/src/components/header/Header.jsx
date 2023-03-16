import {Link} from 'react-router-dom';
import MyHubMenu from './Myhubmenu';

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
      <MyHubMenu />
    </nav>
  );
}

export default Header;
