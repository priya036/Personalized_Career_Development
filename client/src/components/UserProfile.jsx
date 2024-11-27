import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function UserProfile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      axios.post('http://localhost:5000/saveUser', {
        name: user.name,
        email: user.email,
        picture: user.picture,
      })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error saving user data:', error);
      });
    }
  }, [isAuthenticated, user]);

  if (isLoading) return <div>Loading...</div>;

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt="Profile" />
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
      </div>
    )
  );
}

export default UserProfile;
