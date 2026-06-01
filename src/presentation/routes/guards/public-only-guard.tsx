import { Navigate } from "react-router";
import { isAuthenticated } from "../../../domain/utils/auth/auth";

export function PublicOnlyGuard({ children }: { children: React.ReactNode }) {
  if (isAuthenticated()) return <Navigate to="/" replace />;
  return children;
}
