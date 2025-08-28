import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Role } from "@/lib/constanta";
import { FileText, Handshake, MessageSquare, Sparkles, Workflow } from "lucide-react";

export function Dashboard({ role }: { role: Role | null; accepted: string[] }) {
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Welcome 👋</CardTitle>
          <CardDescription>
            {role === "Seller"
              ? "Explore qualified buyers and seamlessly initiate the acquisition process."
              : role === "Buyer"
              ? "Complete your profile and wait for sellers to reach out. Once matched, proceed through the workflow."
              : "Select your role to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Metric value="5" label="Accepted Matches" icon={Handshake} />
          <Metric value="5 Steps" label="Deal Workflow" icon={Workflow} />
          <Metric value="AI Assistant" label="Financial Document Analyzer" icon={FileText} />
        </CardContent>
      </Card>

      <Tips />
    </div>
  );
}

function Metric({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
  return (
    <Card className="rounded-xl">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-sky-50"><Icon className="h-5 w-5 text-sky-700" /></div>
        <div>
          <div className="font-semibold text-lg">{value}</div>
          <div className="text-xs text-slate-500">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function Tips() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>How We Reduce Deal Friction</CardTitle>
        <CardDescription>A guided workflow that leads both parties all the way to closing.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-3 gap-4">
        <Tip icon={MessageSquare} title="Streamlined Intro Meeting" desc="Pre-built introductions with automated key questions." />
        <Tip icon={FileText} title="Single Document Upload" desc="Centralize P&L, balance sheets, and bank statements in one place." />
        <Tip icon={Sparkles} title="AI Summaries" desc="Instantly analyze ratios and highlight potential risks." />
      </CardContent>
    </Card>
  );
}

function Tip({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="p-4 rounded-xl border bg-white/60">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-gray-700" />
        <div className="font-medium">{title}</div>
      </div>
      <div className="text-sm text-slate-600">{desc}</div>
    </div>
  );
}
