import { createContext, FC, ReactNode, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../../api/movieService";
import { useLocalStorage } from "../useLocalStorage";

const AuthContext: React.Context<IAuthContext> = createContext({});

interface IAuthContext {
  user?: string
  login?: (data: ILoginProps) => void
  logout?: () => void
}

interface ILoginProps {
  username: string,
  password: string
}

interface IAuthProvider {
  children: ReactNode
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = useCallback(async ({username, password}: ILoginProps) => {
    try {
      const {data: {request_token}} = await movieService.getToken();
      if(request_token) {
        await movieService.login({username, password, request_token});
        const {data: {session_id}} = await movieService.getSession({request_token});
        const {data} = await movieService.getAccount({session_id});
        setUser(data);
        navigate("/watchlist");
      }
    } catch (error) {
      console.log(error);
    }
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