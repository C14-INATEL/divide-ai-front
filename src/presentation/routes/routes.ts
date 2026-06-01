import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  CreditCard,
  Eye,
  HelpCircle,
  History,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  List,
  LogIn,
  Receipt,
  Settings,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import type { ElementType } from "react";

export type SidebarSection = "principal" | "organizacao" | "geral";

export interface Route {
  path: string;
  label: string;
  icon: ElementType;
  children?: Route[];
  isPrivate?: boolean;
  showInSidebar?: boolean;
  sidebarSection?: SidebarSection;
  sidebarOrder?: number;
  badge?: number;
}

export const sidebarSections: { key: SidebarSection; title: string }[] = [
  { key: "principal", title: "Principal" },
  { key: "organizacao", title: "Organização" },
  { key: "geral", title: "Geral" },
];

export const routes: Record<string, Route> = {
  HOME: {
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    isPrivate: true,
    showInSidebar: true,
    sidebarSection: "principal",
    sidebarOrder: 0,
  },
  GROUPS: {
    path: "/grupos",
    label: "Grupos",
    icon: Users,
    isPrivate: true,
    showInSidebar: true,
    sidebarSection: "principal",
    sidebarOrder: 1,
  },
  GROUP_DETAILS: {
    path: "/grupos/:id",
    label: "Detalhes do Grupo",
    icon: Eye,
    isPrivate: true,
  },
  GROUP_EXPENSES: {
    path: "/grupos/:id/despesas",
    label: "Despesas do Grupo",
    icon: List,
    isPrivate: true,
  },
  GROUP_PAYMENTS: {
    path: "/grupos/:id/pagamentos",
    label: "Pagamentos",
    icon: CreditCard,
    isPrivate: true,
  },
  GROUP_MEMBERS: {
    path: "/grupos/:id/membros",
    label: "Membros",
    icon: Users,
    isPrivate: true,
  },
  EXPENSES: {
    path: "/despesas",
    label: "Despesas",
    icon: Receipt,
    isPrivate: true,
    showInSidebar: true,
    sidebarSection: "principal",
    sidebarOrder: 2,
  },
  SETTLEMENTS: {
    path: "/acertos",
    label: "Acertos",
    icon: ArrowLeftRight,
    isPrivate: true,
    showInSidebar: true,
    sidebarSection: "principal",
    sidebarOrder: 3,
    badge: 3,
  },
  PARTICIPANTS: {
    path: "/participantes",
    label: "Participantes",
    icon: UserCheck,
    isPrivate: true,
    showInSidebar: true,
    sidebarSection: "principal",
    sidebarOrder: 4,
  },
  REPORTS: {
    path: "/relatorios",
    label: "Relatórios",
    icon: BarChart3,
    isPrivate: true,
    showInSidebar: true,
    sidebarSection: "organizacao",
    sidebarOrder: 0,
  },
  INSIGHTS: {
    path: "/insights",
    label: "Insights",
    icon: Lightbulb,
    isPrivate: true,
    showInSidebar: true,
    sidebarSection: "organizacao",
    sidebarOrder: 1,
  },
  HISTORY: {
    path: "/historico",
    label: "Histórico",
    icon: History,
    isPrivate: true,
    showInSidebar: true,
    sidebarSection: "organizacao",
    sidebarOrder: 2,
  },
  NOTIFICATIONS: {
    path: "/notificacoes",
    label: "Notificações",
    icon: Bell,
    isPrivate: true,
    showInSidebar: true,
    sidebarSection: "organizacao",
    sidebarOrder: 3,
    badge: 5,
  },
  SETTINGS: {
    path: "/configuracoes",
    label: "Configurações",
    icon: Settings,
    isPrivate: true,
    showInSidebar: true,
    sidebarSection: "geral",
    sidebarOrder: 0,
  },
  HELP: {
    path: "/ajuda",
    label: "Ajuda",
    icon: HelpCircle,
    isPrivate: true,
    showInSidebar: true,
    sidebarSection: "geral",
    sidebarOrder: 1,
  },
  SUPPORT: {
    path: "/suporte",
    label: "Suporte",
    icon: LifeBuoy,
    isPrivate: true,
    showInSidebar: true,
    sidebarSection: "geral",
    sidebarOrder: 2,
  },
  LOGIN: {
    path: "/login",
    label: "Login",
    icon: LogIn,
    isPrivate: false,
  },
  REGISTER: {
    path: "/cadastro",
    label: "Cadastro",
    icon: UserPlus,
    isPrivate: false,
  },
} as const;

export type SidebarGroup = {
  key: SidebarSection;
  title: string;
  items: Route[];
};

export function getSidebarNavigation(): SidebarGroup[] {
  const sidebarRoutes = Object.values(routes).filter(
    (r) => !!r.showInSidebar && !!r.sidebarSection,
  );

  return sidebarSections.map((section) => ({
    ...section,
    items: sidebarRoutes
      .filter((r) => r.sidebarSection === section.key)
      .sort((a, b) => (a.sidebarOrder ?? 0) - (b.sidebarOrder ?? 0)),
  }));
}
