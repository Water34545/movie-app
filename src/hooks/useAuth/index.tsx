import { AxiosError } from "axios";
import { createContext, FC, ReactNode, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../../api/movieService";
import { IRequestError } from "../../api/utils/IRequestError";
import { IUser } from "../../api/utils/IUser";
import { useLocalStorage } from "../useLocalStorage";

const AuthContext: React.Context<IAuthContext> = createContext({});

interface IAuthContext {
  user?: IUser | null
  session_id?: string | null
  error?: string | null
  login?: (data: ILoginProps) => void
  logout?: () => void
  clearError?: () => void
}

interface ILoginProps {
  username: string,
  password: string
}

interface IAuthProvider {
  children: ReactNode
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useLocalStorage<IUser | null>("user", null);
  const [error, setError] = useLocalStorage<string | null>("error", null);
  const [session_id, setSessionId] = useLocalStorage<string | null>("session_id", null);

  const navigate = useNavigate();

  const login = useCallback((data: ILoginProps) => {
    const tryLogin = async ({username, password}: ILoginProps) => {
      console.log('test')
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
        setError(response?.data?.status_message || null)
      }
    };
    tryLogin(data);
  }, [setUser, setSessionId, setError, navigate]);

  const logout = useCallback(() => {
    setUser(null);
    setSessionId(null);
    navigate("/", { replace: true });
  }, [setUser, navigate, setSessionId]);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  const value = useMemo(
    () => ({
      user,
      session_id,
      error,
      clearError,
      login,
      logout
    }),
    [user, error, session_id, login, logout, clearError]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);