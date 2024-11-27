import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';

export const Header = (props) => {
  const { isAuthenticated } = useAuth0();

  return (
    <header id="header">
      <br />
      <br />
      <br />
      <br />
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-md-offset-1 intro-text">
              <h2 style={{ fontSize: "4.5rem" }}>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h2>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                {!isAuthenticated && (
                  <LoginButton />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
