import {Link} from 'react-router-dom';

function MyHubMenu() {
  // need to bring in current user data

  return (
    <div className="navigation">
      <a className="myhub">Menu</a>
      <div className="navigation-content">
        <Link className="menuLinks" to={'/profile'}>
          <a>N/A</a>
        </Link>
        <Link className="menuLinks" to="/">
          {/* to tracked launches page*/}
          <a>Tracked Launches N/A</a>
        </Link>
        <Link className="menuLinks" to="">
          <a>Favorites: N/A</a>
        </Link>
      </div>
    </div>
  );
}

export default MyHubMenu;
