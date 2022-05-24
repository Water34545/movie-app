import { AxiosError } from "axios";
import { createContext, FC, ReactNode, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../../api/movieService";
import { IRequestError } from "../../api/utils/IRequestError";
import { IUser } from "../../api/utils/IUser";
import { useLocalStorage } from "../useLocalStorage";

const AuthContext: React.Context<IAuthContext> = createContext({});

interface IAuthContext {
  user?: IUser
  session_id?: string
  error?: string
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
  const [error, setError] = useLocalStorage("error", null);
  const [session_id, setSessionId] = useLocalStorage("session_id", null);

  const navigate = useNavigate();

  const login = useCallback(async ({username, password}: ILoginProps) => {
    try {
      const {data: {request_token}} = await movieService.getToken();
      if(request_token) {
        await movieService.login({username, password, request_token});
        const {data: {session_id}} = await movieService.getSession({request_token});
        const {data} = await movieService.getAccount({session_id});
        setUser(data);
        setSessionId(session_id);
        setError(null);
        navigate("/favorite");
      }
    } catch (error) {
      const {response} = error as AxiosError<IRequestError>;
      setError(response?.data?.status_message)
    }
  }, [setUser, setSessionId, setError, navigate]);

  const logout = useCallback(() => {
    setUser(null);
    setSessionId(null);
    navigate("/", { replace: true });
  }, [setUser, navigate, setSessionId]);

  const value = useMemo(
    () => ({
      user,
      session_id,
      error,
      login,
      logout
    }),
    [user, login, logout, error, session_id]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);