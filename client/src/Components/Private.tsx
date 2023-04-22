import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import jwt from "jsonwebtoken";
import { useState } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, isLoading } = useUserContext() || {};
  const token = user?.token;
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   try {
  //     const p = jwt.verify(
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQwN2U2MzFhOTVlMTI0OTc3OTYwNTciLCJuYW1lIjoib25vcyIsImlhdCI6MTY4MjA4ODMxOCwiZXhwIjoxNjgyMzQ3NTE4fQ.i7XG0kt2K54-qMuYHhbf4g6cBRWnnQ46EzLlrJb2hHk",
  //       "D(G+KaPdSgVkYp3s6v9y$B&E)H@McQfT"
  //     );
  //     // console.log(p);
  //     return <>{children}</>;
  //   } catch (error) {
  //     return <Navigate to="/landing" />;
  //   }

  if (isLoading) return <h1>Loading...</h1>;
  if (!user) return <Navigate to="/landing" />;

  return <>{children}</>;
};

export default PrivateRoute;
