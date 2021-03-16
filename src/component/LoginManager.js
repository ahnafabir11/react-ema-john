import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';

export const initializeLogin = ()=> {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
}

// google sign in
export const handleGoogleSignIn = () => {
  const googleprovider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth()
    .signInWithPopup(googleprovider)
    .then((result) => {
      const { displayName, email, photoURL } = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return signedInUser;
    })
    .catch(error => {
      console.log(error.message);
    })
}

// facebook sign in
export const handleFbSignIn = () => {
  const fbprovider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(fbprovider)
    .then((result) => {
      const { name, email, photoURL } = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: name,
        email: email,
        photo: photoURL,
        success: true
      }
     return signedInUser;
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export const handleSignOut = () => {
  return firebase.auth().signOut()
    .then(() => {
      const signedInUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      return signedInUser;
    }).catch((error) => {
      console.log(error);
    });
}

export const createWithEmailAndPassword = ( name, email, password)=> {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUser = res.user;
      newUser.success = true;
      newUser.error = '';
      updateUserInfo(name);
      return newUser;
    })
    .catch((error) => {
      const errorMessage = error.message;
      const newUser = {};
      newUser.error = errorMessage;
      newUser.success = false;
      return newUser;
    });
}

export const signInWithEmail = (email, password)=> {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUser = res.user;
      newUser.success = true;
      newUser.error = '';
      return newUser;
    })
    .catch((error) => {
      const errorMessage = error.message;
      const newUser = { };
      newUser.error = errorMessage;
      newUser.success = false;
      return newUser;
    });
}

const updateUserInfo = (name) => {
  var user = firebase.auth().currentUser;
  user.updateProfile({ displayName: name })
    .then(function () {
      console.log('user name updated successfully');
    }).catch(function (error) {
      console.log(error);
    });
}