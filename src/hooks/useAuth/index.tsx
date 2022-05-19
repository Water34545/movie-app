import { createContext, FC, ReactNode, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../useLocalStorage";

const AuthContext: React.Context<IAuthContext> = createContext({});

interface IAuthContext {
  user?: string
  login?: (data: any) => Promise<void>
  logout?: () => void
}

interface IAuthProvider {
  children: ReactNode
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data: any) => {
    setUser(data);
    navigate("/profile");
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);