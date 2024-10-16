import axios from "axios";
import React, { useEffect, useState } from "react";

const Welcome = () => {
  // Retrieve user information from localStorage
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            withCredentials: true, // Send the JWT stored in the cookie
          }
        );

        // Set user info in React context
        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUser(); // Fetch user info on component mount
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
        {user ? (
          <div>
            <p className="text-lg mb-4">Hello, {user.name}!</p>
            <p className="text-gray-700">Email: {user.email}</p>
          </div>
        ) : (
          <p>No user information available</p>
        )}
      </div>
    </div>
  );
};

export default Welcome;
