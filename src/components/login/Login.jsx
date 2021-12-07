import { useState, useContext } from 'react';
import { Context } from '../../App.js';
import './login.scss';

function Login() {
  const { currentUser, setCurrentUser } = useContext(Context);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const currentUserIsInGroup = (accessGroup) => {
    const accessGroupArray = currentUser.accessGroups
      .split(',')
      .map((m) => m.trim());
    return accessGroupArray.includes(accessGroup);
  };

  const handleUsername = (e) => {
    const _username = e.target.value;
    setUsername(_username);
  };

  const handlePassword = (e) => {
    const _password = e.target.value;
    setPassword(_password);
  };

  const handleLoginButton = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch('http://localhost:3033/login', requestOptions);
    const _currentUser = await response.json();
    setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
  };

  const handleLogoutButton = async (e) => {
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };
    const response = await fetch(
      'http://localhost:3033/login/logout',
      requestOptions
    );
    if (response.ok) {
      setUsername('');
      setPassword('');
      const _currentUser = await response.json();
      console.log(_currentUser);
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
    }
  };
  console.log(`login:${currentUser.userName}`);
  return (
    <div className='Login'>
      {currentUser.userName && (
        <>
          <h2>
            Current User: {currentUser.firstName} {currentUser.lastName}
          </h2>

          {currentUserIsInGroup('loggedOutUsers') && (
            <form>
              <fieldset>
                <legend>Login</legend>
                <div className='row'>
                  <label htmlFor='username'>Name</label>
                  <input
                    type='text'
                    id='username'
                    value={username}
                    onChange={handleUsername}
                  />
                </div>
                <div className='row'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    id='password'
                    onChange={handlePassword}
                    value={password}
                  />
                </div>
                <div className='buttonRow'>
                  <button onClick={handleLoginButton}>Login</button>
                </div>
              </fieldset>
            </form>
          )}

          {currentUserIsInGroup('loggedInUsers') && (
            <div>
              <button onClick={handleLogoutButton}>Logout</button>
            </div>
          )}
          {currentUserIsInGroup('loggedOutUsers') && (
            <div className='panel'>Welcome to this site.</div>
          )}
          {currentUserIsInGroup('notApprovedUsers') && (
            <>
              <div className='panel'>
                <h3>Thank you for registering!</h3>
                An administrator will approve your account as soon as possible.
              </div>
            </>
          )}
          {currentUserIsInGroup('members') && (
            <>
              <div className='panel'>
                <h3>Current Site News for Members</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Neque explicabo voluptate quia asperiores sit! Vel molestiae
                  labore ratione non dolores? Exercitationem soluta quo id
                  laboriosam, autem perferendis? Fuga, suscipit ipsa.
                </p>
              </div>
            </>
          )}
          {currentUserIsInGroup('contentEditors') && (
            <>
              <div className='panel'>
                <h3>Content Editor Section:</h3>
                <div>
                  <button>Edit Welcome Page</button>
                </div>
                <div>
                  <button>Create New Page</button>
                </div>
              </div>
            </>
          )}
          {currentUserIsInGroup('admins') && (
            <>
              <div className='panel'>
                <h3>Admin Section:</h3>
                <div>
                  <button>Create users</button>
                </div>
                <div>
                  <button>Edit users</button>
                </div>
                <div>
                  <button>Delete users</button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Login;
