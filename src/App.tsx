import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";


import { ThemeProvider } from "./lib/theme-providers";
import { Onboarding } from "./pages/onboarding";
import { MOCK_BUYERS, type Buyer, type DealState, type Role } from "./lib/constanta";
import { TopBar } from "./pages/top-bar";
import { Sidebar } from "./pages/side-bar";
import { SettingsPage } from "./pages/setting";
import { Profile } from "./pages/profile";
import { Dashboard } from "./pages/dashboard";
import { Matches } from "./pages/buyer";
import { DealWorkflow } from "./pages/deal";



export const currency = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const softPill = (text: string) => (
  <Badge variant="secondary" className="rounded-full text-xs px-3 py-1 bg-gray-200">
    {text}
  </Badge>
);

export default function App() {
  const [page, setPage] = useState<
    "onboarding" | "dashboard" | "matches" | "workflow" | "profile" | "settings"
  >("onboarding");

  const [role, setRole] = useState<Role | null>(null);
  const [onboarded, setOnboarded] = useState(false);

  const [buyers] = useState<Buyer[]>(MOCK_BUYERS);
  const [accepted, setAccepted] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);

  const [activeDealBuyerId, setActiveDealBuyerId] = useState<string | null>(null);
  const [deal, setDeal] = useState<DealState>({
    step: 0,
    chat: [],
    documents: [],
    negotiation: {},
    closingChecklist: {
      ndaSigned: false,
      accessGranted: false,
      qnaCompleted: false,
      redlinesResolved: false,
      fundsVerified: false,
    },
  });

  const activeBuyer = useMemo(() => buyers.find((b) => b.id === activeDealBuyerId) || null, [buyers, activeDealBuyerId]);

  const handleAccept = (id: string) => {
    setAccepted((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };
  const handleReject = (id: string) => {
    setRejected((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const startDeal = (id: string) => {
    setActiveDealBuyerId(id);
    setPage("workflow");
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen w-screen max-w-screen bg-gradient-to-b from-sky-50 to-emerald-50 text-slate-800">
        <TopBar onboarded={onboarded} onSettings={() => setPage("settings")} onProfile={() => setPage("profile")} />
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <Sidebar
              current={page}
              onNavigate={(p) => setPage(p)}
              role={role}
              onboarded={onboarded}
            />
          </div>
          <div className="col-span-12 md:col-span-9">
            {!onboarded ? (
              <Onboarding
                onComplete={(r) => {
                  setRole(r);
                  setOnboarded(true);
                  setPage("dashboard");
                }}
              />
            ) : page === "dashboard" ? (
              <Dashboard role={role} accepted={accepted} />
            ) : page === "matches" ? (
              <Matches
                buyers={buyers}
                accepted={accepted}
                rejected={rejected}
                onAccept={handleAccept}
                onReject={handleReject}
                onStartDeal={startDeal}
              />
            ) : page === "workflow" ? (
              <DealWorkflow
                buyer={activeBuyer}
                deal={deal}
                onChange={setDeal}
                onBack={() => setPage("matches")}
              />
            ) : page === "profile" ? (
              <Profile role={role} />
            ) : (
              <SettingsPage />
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

