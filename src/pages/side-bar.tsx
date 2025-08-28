import {
  Button,
} from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Building2,
  Handshake,
  FileText,
  MessageSquare,
  Settings,
  User2,
  LogOut,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Upload,
  Search,
  Workflow,
  BadgeCheck,
  DollarSign,
  Timer,
  MapPin,
} from "lucide-react";
import type { Role } from "@/lib/constanta";

export function Sidebar({
  current,
  onNavigate,
  role,
  onboarded,
}: {
  current: string;
  onNavigate: (p: any) => void;
  role: Role | null;
  onboarded: boolean;
}) {
  const Item = ({ name, icon: Icon, page }: { name: string; icon: any; page: any }) => (
    <Button
      disabled={!onboarded}
      className={cn("w-full justify-start rounded-xl text-white bg-gray-500", current === page && "bg-black")}
      onClick={() => onNavigate(page)}
    >
      <Icon className="h-4 w-4 mr-2" /> {name}
    </Button>
  );

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Navigation</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-full">
            Role: {role ?? "—"}
          </Badge>
          <BadgeCheck className={cn("h-4 w-4", onboarded ? "text-emerald-600" : "text-slate-400")} />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <Item name="Dashboard" icon={Building2} page="dashboard" />
        <Item name="Matches" icon={Handshake} page="matches" />
        <Item name="Workflow" icon={Workflow} page="workflow" />
        <Item name="Profile" icon={User2} page="profile" />
        <Item name="Settings" icon={Settings} page="settings" />
      </CardContent>
    </Card>
  );
}