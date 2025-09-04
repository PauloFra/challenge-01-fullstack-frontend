import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface PrivateRouteProps {
  outlet: JSX.Element;
}

export const PrivateRoute = ({ outlet }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? outlet : <Navigate to="/login" />;
};
