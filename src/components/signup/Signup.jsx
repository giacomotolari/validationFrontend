/* eslint-disable react-hooks/exhaustive-deps */
import './signup.scss';
import { useEffect, useState, useContext } from 'react';
import { Context } from '../../App.js';
import Eye from '../../asset/icons/eye.png';

function SignUpForm() {
  const { setCurrentUser } = useContext(Context);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [lastCharPassword1, setLastCharPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [payload, setPayload] = useState({});
  const [passwordsInputType, setPasswordsInputType] = useState('password');

  const [firstNameIsValid, setFirstNameIsValid] = useState(false);
  const [lastNameIsValid, setLastNameIsValid] = useState(false);
  const [userNameIsValid, setUserNameIsValid] = useState(false);
  const [password1IsValid, setPassword1IsValid] = useState(false);
  const [password2IsValid, setPassword2IsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const clearPayload = () => {
    if (Object.keys(payload).length !== 0) {
      setPayload((prev) => ({}));
    }
  };

  useEffect(() => {
    clearPayload();
  }, [firstName, lastName, userName, email, password1, password2]);

  useEffect(() => {
    setLastCharPassword1([...password1.charAt([password1.length - 1])]);
    setFormIsValid(
      firstNameIsValid &&
        lastNameIsValid &&
        userNameIsValid &&
        emailIsValid &&
        password1IsValid &&
        password2IsValid &&
        password1 === password2
    );
  }, [
    firstNameIsValid,
    lastNameIsValid,
    userNameIsValid,
    emailIsValid,
    password1IsValid,
    password2IsValid,
    password1,
    password2,
  ]);

  const handleFirstName = (e) => {
    let _firstName = e.target.value;
    _firstName.length >= 5 && _firstName.length <= 20
      ? setFirstNameIsValid(true)
      : setFirstNameIsValid(false);
    setFirstName(_firstName);
  };

  const handleLastName = (e) => {
    let _lastName = e.target.value;
    _lastName.length >= 5 && _lastName.length <= 20
      ? setLastNameIsValid(true)
      : setLastNameIsValid(false);
    setLastName(_lastName);
  };

  const handleUserName = (e) => {
    let _userName = e.target.value;
    _userName.length >= 5 && _userName.length <= 20
      ? setUserNameIsValid(true)
      : setUserNameIsValid(false);
    setUserName(_userName);
  };

  const handleEmail = (e) => {
    let _email = e.target.value;
    _email && /[a-zA-z0-9_.-]{2,}@[a-z]{2,}\.[a-z]{2,}/.test(_email)
      ? setEmailIsValid(true)
      : setEmailIsValid(false);
    setEmail(_email);
  };

  const handlePassword1 = (e) => {
    let _password1 = e.target.value;
    _password1.length >= 8 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(_password1)
      ? setPassword1IsValid(true)
      : setPassword1IsValid(false);
    setPassword1(_password1);
  };

  const handlePassword2 = (e) => {
    let _password2 = e.target.value;
    _password2.length >= 8
      ? setPassword2IsValid(true)
      : setPassword2IsValid(false);
    setPassword2(_password2);
  };

  const handleShowPasswordButton = () => {
    setPasswordsInputType(
      passwordsInputType === 'password' ? 'text' : 'password'
    );
  };

  const handleButton = (e) => {
    e.preventDefault();
    setPayload((prev) => ({
      ...prev,
      firstName,
      lastName,
      userName,
      email,
      password1,
      password2,
    }));
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        userName,
        email,
        password1,
        password2,
      }),
    };
    (async () => {
      const response = await fetch(
        `http://localhost:3033/signup/create`,
        requestOptions
      );
      const data = await response.json();
      setCurrentUser((prev) => data.savedDBUser);
    })();
  };
  
  return (
    <div className='Signup'>
      <form>
        <fieldset>
          <legend>Sign up</legend>
          <div className={`row ${firstNameIsValid ? 'valid' : 'invalid'}`}>
            <label htmlFor='firstName'>First name</label>
            <input
              type='text'
              id='firstname'
              value={firstName}
              onChange={handleFirstName}
            />
          </div>
          <br />
          <div className={`row ${lastNameIsValid ? 'valid' : 'invalid'}`}>
            <label htmlFor='lastName'>last Name</label>
            <input
              type='text'
              id='lastName'
              value={lastName}
              onChange={handleLastName}
            />
          </div>
          <br />
          <div className={`row ${userNameIsValid ? 'valid' : 'invalid'}`}>
            <label htmlFor='userName'>User Name</label>
            <input
              type='text'
              id='userName'
              value={userName}
              autoComplete='username'
              onChange={handleUserName}
            />
          </div>
          <br />
          <div className={`note ${userNameIsValid ? 'valid' : 'invalid'}`}>
            <p>allowed: 5 - 20 characters</p>
          </div>
          <div className={`row ${emailIsValid ? 'valid' : 'invalid'}`}>
            <label htmlFor='text'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className={`note ${emailIsValid ? 'valid' : 'invalid'}`}>
            <p>e.g. user-name@mail.com</p>
          </div>
          <div className={`row ${password1IsValid ? 'valid' : 'invalid'}`}>
            <label htmlFor='password'>Password</label>
            <input
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              placeholder='password'
              type={passwordsInputType}
              id='pas1'
              value={password1}
              autoComplete='new-password'
              onChange={handlePassword1}
            />
            <p>{lastCharPassword1}</p>
            <img onClick={handleShowPasswordButton} src={Eye} alt='' />
          </div>

          <div className={`note ${password1IsValid ? 'valid' : 'invalid'}`}>
            <p>min 8 characters</p>
          </div>
          <div className={`row ${password2IsValid ? 'valid' : 'invalid'}`}>
            <label htmlFor='password'>Password</label>
            <input
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              placeholder='password'
              type={passwordsInputType}
              id='pas2'
              value={password2}
              autoComplete='new-password'
              onChange={handlePassword2}
            />
            <img onClick={handleShowPasswordButton} src={Eye} alt='' />
          </div>
          <div className={`note ${password2IsValid ? 'valid' : 'invalid'}`}>
            <p>repeat your password</p>
          </div>
          <div className='buttonRow'>
            <button disabled={!formIsValid} onClick={handleButton}>
              Register
            </button>
          </div>
        </fieldset>
      </form>

      {Object.keys(payload).length !== 0 && (
        <pre>Saved: {JSON.stringify(payload, null, 2)}</pre>
      )}
    </div>
  );
}

export default SignUpForm;
