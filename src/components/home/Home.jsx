import React from 'react';
import './home.scss';
import { useTheme} from '../../ThemeContext';


function Home() {
  const  currentUser  = useTheme();
  console.log(`home:${currentUser.userName}`);
  return (
    <div className='Home'>
      {currentUser.userName !== 'anonymousUser' && (
        <>
          <h2>
            Welcome <span>{currentUser.userName}</span>
          </h2>
          <h3>Your Infos:</h3>

          <ul>
            <li>
              user name: <span>{currentUser.userName}</span>
            </li>
            <li>
              first name: <span>{currentUser.firstName}</span>
            </li>
            <li>
              last name: <span>{currentUser.lastName}</span>
            </li>
            <li>
              email: <span>{currentUser.email}</span>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default Home;
