import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [user, setUser] = useState(localStorage.getItem("username") || null);

  const login = (username) => {
    setIsAuthenticated(true);
    setUser(username);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem('rol', 'rol');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // Limpia todo el localStorage
    localStorage.clear();
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsAuthenticated(true);
      setUser(localStorage.getItem("username"));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};