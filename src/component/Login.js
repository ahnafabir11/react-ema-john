import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../App";
import { createWithEmailAndPassword, signInWithEmail, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLogin} from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  initializeLogin();

  const [, setLogedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const GoogleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true)
    })
  }

  const FbSignIn = ()=> {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true)
    })
  }

  const SignOut = ()=> {
    handleSignOut()
    .then(res => {
      handleResponse(res, false)
    })
  }

  const [isFormValid, setIsFormValid] = useState(true);

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      var re = /\S+@\S+\.\S+/;
      setIsFormValid(re.test(e.target.value));
    }

    if (e.target.name === 'password') {
      const passwordLength = e.target.value.length > 6;
      const validPassword = /\d{1}/.test(e.target.value);
      setIsFormValid(passwordLength && validPassword);
    }

    if (isFormValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser && user.email && user.password) {
      createWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmail(user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
    }
  } 

  const handleResponse = (res, redirect)=> {
    setUser(res);
    setLogedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Google Authentication</h1>

      {
        user.isSignedIn ? <button onClick={SignOut}>Log Out</button> : <button onClick={GoogleSignIn}>Sign In</button>
      }

      <h1>Sign in with Facebook</h1>
      {
        user.isSignedIn ? <button onClick={SignOut}>Log Out</button> : <button onClick={FbSignIn}>Sign In</button>
      }


      {
        user.isSignedIn && <div>
          <h3>Welcome, {user.name}</h3>
          <h3>Your email is {user.email}</h3>
          <img src={user.photo} alt={user.name} />
        </div>
      }

      <h1>Email Authentication</h1>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
      <label htmlFor="newUser">New User Sign up</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onChange={handleChange} />}<br />
        <input type="text" name="email" onChange={handleChange} /> <br />
        <input type="text" name="password" onChange={handleChange} /> <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>{newUser ? 'Sign Up' : 'Logged in'} successfull</p>
      }

    </div>
  );
}

export default Login;

