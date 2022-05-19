import { createContext, FC, ReactNode, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../useLocalStorage";

const AuthContext: React.Context<IAuthContext> = createContext({});

interface IAuthContext {
  user?: string
  login?: (data: any) => void
  logout?: () => void
}

interface IAuthProvider {
  children: ReactNode
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = useCallback((request_token: string) => {
    setUser(request_token);
    navigate("/watchlist");
  }, [navigate, setUser]);

  const logout = useCallback(() => {
    setUser(null);
    navigate("/", { replace: true });
  }, [setUser, navigate]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);