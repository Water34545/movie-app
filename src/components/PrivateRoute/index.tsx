import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface IPrivateRoute {
  children: React.ReactNode
}

const PrivateRoute: FC<IPrivateRoute> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;