import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginButton from './components/general/LoginButton'; // Correct path for LoginButton
import UserDrop from './components/general/UserDrop'; // Correct path for UserDrop component

const App = () => {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate fetching the user's name from an API (useEffect for simulation)
  useEffect(() => {
    const fetchUserName = async () => {
      const userData = { name: 'John Doe' }; // Example user data
      setUserName(userData.name);
    };

    // Simulate user login state (for example, by checking a token or session)
    const loggedIn = true; // Set this condition as per your actual login state
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      fetchUserName();
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={<LoginButton text="Login" text_color={[255, 255, 255]} button_color={[0, 123, 255]} />}
          />

          {/* Dashboard Route (UserDrop for logged-in users) */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <UserDrop userName={userName} />
              ) : (
                <LoginButton text="Login" text_color={[255, 255, 255]} button_color={[0, 123, 255]} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
