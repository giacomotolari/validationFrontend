import './navbar.scss';
import { NavLink } from 'react-router-dom';

function Navbar(props) {
  return (
    <ul className='Navbar'>
      {props.navBanners.map((banner, index) => (
        <li
          key={index}
          className={
            banner.path === 'signup' || banner.path === 'login'
              ? 'validations'
              : banner.path
          }
          id={banner.path}
        >
          <NavLink
            to={banner.path === 'home' ? '' : banner.path}
            exact={banner.path === 'home' ? true : false}
          >
            <p>{banner.path}</p>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Navbar;
