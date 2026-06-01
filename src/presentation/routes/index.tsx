import { createBrowserRouter } from "react-router";
import { RootLayout } from "../components/layouts/root";
import { AuthLayout } from "../components/layouts/auth-layout";
import { routes } from "./routes";
import { AuthenticatedGuard } from "./guards/authenticated-guard";
import { PublicOnlyGuard } from "./guards/public-only-guard";
import { AuthenticatedLayout } from "../components/layouts/authenticated-layout";
import { Home } from "../pages/home";
import { Groups } from "../pages/groups";
import { Expenses } from "../pages/expenses";
import { Settlements } from "../pages/settlements";
import { Participants } from "../pages/participants";
import { Reports } from "../pages/reports";
import { Insights } from "../pages/insights";
import { History } from "../pages/history";
import { Notifications } from "../pages/notifications";
import { Settings } from "../pages/settings";
import { Help } from "../pages/help";
import { Support } from "../pages/support";
import { Login } from "../pages/login";
import { Register } from "../pages/register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: (
          <PublicOnlyGuard>
            <AuthLayout />
          </PublicOnlyGuard>
        ),
        children: [
          { path: routes.LOGIN.path, element: <Login /> },
          { path: routes.REGISTER.path, element: <Register /> },
        ],
      },
      {
        element: (
          <AuthenticatedGuard>
            <AuthenticatedLayout />
          </AuthenticatedGuard>
        ),
        children: [
          { path: routes.HOME.path, index: true, element: <Home /> },
          { path: routes.GROUPS.path, element: <Groups /> },
          { path: routes.EXPENSES.path, element: <Expenses /> },
          { path: routes.SETTLEMENTS.path, element: <Settlements /> },
          { path: routes.PARTICIPANTS.path, element: <Participants /> },
          { path: routes.REPORTS.path, element: <Reports /> },
          { path: routes.INSIGHTS.path, element: <Insights /> },
          { path: routes.HISTORY.path, element: <History /> },
          { path: routes.NOTIFICATIONS.path, element: <Notifications /> },
          { path: routes.SETTINGS.path, element: <Settings /> },
          { path: routes.HELP.path, element: <Help /> },
          { path: routes.SUPPORT.path, element: <Support /> },
        ],
      },
    ],
  },
]);
