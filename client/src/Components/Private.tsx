import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../UserContext";

interface PrivateRouteProps {
  children: ReactNode;
}

const Private = ({ children }: PrivateRouteProps) => {
  const { user, isLoading } = useUserContext() || {};
  if (isLoading) return <h1>Loading...</h1>;
  if (!user) return <Navigate to="/landing" />;

  return <>{children}</>;
};

export default Private;
