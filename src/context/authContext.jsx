import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const userContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await axios.get('https://empbackend-steel.vercel.app/api/auth/verify', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');  // Optional: redirect on logout
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);
export default AuthProvider;
