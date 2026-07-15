import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, AdminUser } from "../services/authService";

interface AuthContextType {
  token: string | null;
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: Partial<AdminUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load existing auth data from localStorage
    const savedToken = localStorage.getItem("janhit_admin_token");
    const savedUser = localStorage.getItem("janhit_admin_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user details from localStorage", e);
        // Clear corrupt data
        localStorage.removeItem("janhit_admin_token");
        localStorage.removeItem("janhit_admin_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem("janhit_admin_token", response.token);
      localStorage.setItem("janhit_admin_user", JSON.stringify(response.user));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("janhit_admin_token");
    localStorage.removeItem("janhit_admin_user");
  };

  const updateUser = (updatedUser: Partial<AdminUser>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      localStorage.setItem("janhit_admin_user", JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
