import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../App';

function PrivetRoute({children, ...rest}) {
  const [logedInUser] = useContext(UserContext)
  console.log(rest);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        logedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PrivetRoute;
