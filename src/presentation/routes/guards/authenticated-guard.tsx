import { Navigate } from "react-router";
import { isAuthenticated } from "../../../domain/utils/auth/auth";

export function AuthenticatedGuard({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return children;
}
