import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setAuthStatus: (status: boolean) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedValue = localStorage.getItem("isAuthenticated");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedValue = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(storedValue ? JSON.parse(storedValue) : false);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthStatus: setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
