import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Handshake,
  FileText,
  MessageSquare,
  ChevronRight,
  Upload,
  BadgeCheck,
  DollarSign,
  Timer,
} from "lucide-react";
import type { Buyer, DealState } from "@/lib/constanta";
import { currency } from "@/App";

export function DealWorkflow({
  buyer,
  deal,
  onChange,
  onBack,
}: {
  buyer: Buyer | null;
  deal: DealState;
  onChange: (d: DealState) => void;
  onBack: () => void;
}) {
  const steps = ["Initial Chat", "Document Exchange", "AI Analyzer", "Negotiation", "Closing"];
  const pct = (deal.step / (steps.length - 1)) * 100;

  const go = (dir: -1 | 1) => {
    const next = Math.min(steps.length - 1, Math.max(0, deal.step + dir));
    onChange({ ...deal, step: next });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button onClick={onBack}>← Back</Button>
          <div className="font-semibold">Workflow with {buyer ? buyer.name : "—"}</div>
        </div>
        <div className="text-sm text-slate-500">
          Step {deal.step + 1} / {steps.length}
        </div>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="p-4">
          <Progress value={pct} className="h-2" />
          <div className="grid grid-cols-5 gap-2 mt-3">
            {steps.map((s, i) => (
              <div
                key={s}
                className={cn(
                  "text-xs text-center p-2 rounded-lg border text-white",
                  i <= deal.step ? "bg-gray-500 " : "bg-gray-300"
                )}
              >
                {s}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {deal.step === 0 && <StepChat deal={deal} onChange={onChange} />}
      {deal.step === 1 && <StepDocs deal={deal} onChange={onChange} />}
      {deal.step === 2 && <StepAI deal={deal} onChange={onChange} />}
      {deal.step === 3 && <StepNegotiation deal={deal} onChange={onChange} />}
      {deal.step === 4 && <StepClosing deal={deal} onChange={onChange} />}

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => go(-1)} disabled={deal.step === 0}>
          Previous
        </Button>
        <Button className="rounded-xl" onClick={() => go(1)} disabled={deal.step === steps.length - 1}>
          Next <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function StepChat({ deal, onChange }: { deal: DealState; onChange: (d: DealState) => void }) {
  const [msg, setMsg] = useState("");
  const send = () => {
    if (!msg.trim()) return;
    onChange({ ...deal, chat: [...deal.chat, msg.trim()] });
    setMsg("");
  };
  const templates = [
    "Hi! Great to connect. Here’s a brief business overview...",
    "Could you share topline P&L for the last 24 months?",
    "Would you be open to a 30-min call this week?",
  ];
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" /> Initial Chat
        </CardTitle>
        <CardDescription>Use templates to save time.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2 flex-wrap">
          {templates.map((t) => (
            <Button
              key={t}
              variant="secondary"
              className="rounded-full"
              onClick={() => onChange({ ...deal, chat: [...deal.chat, t] })}
            >
              {t}
            </Button>
          ))}
        </div>
        <Separator />
        <div className="space-y-2">
          <Label>Type a message</Label>
          <div className="flex gap-2">
            <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Write a message..." />
            <Button onClick={send}>Send</Button>
          </div>
          <div className="space-y-2">
            {deal.chat.map((c, i) => (
              <div key={i} className="p-3 rounded-lg border bg-white/60 text-sm">
                {c}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StepDocs({ deal, onChange }: { deal: DealState; onChange: (d: DealState) => void }) {
  const add = () => {
    const n = `financials-${deal.documents.length + 1}.pdf`;
    const size = 120 + Math.round(Math.random() * 400);
    onChange({ ...deal, documents: [...deal.documents, { name: n, sizeKB: size }] });
  };
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" /> Document Exchange
        </CardTitle>
        <CardDescription>Upload P&L, balance sheets, bank proofs, key contracts, etc.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button onClick={add} className="rounded-xl">
          <Upload className="h-4 w-4 mr-2" /> Simulate Upload
        </Button>
        <div className="grid md:grid-cols-2 gap-2">
          {deal.documents.map((d, i) => (
            <div
              key={i}
              className="p-3 rounded-lg border bg-white/60 text-sm flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{d.name}</div>
                <div className="text-xs text-slate-500">{d.sizeKB} KB</div>
              </div>
              <Badge variant="outline" className="rounded-full">
                finance
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StepAI({ deal, onChange }: { deal: DealState; onChange: (d: DealState) => void }) {
  const analyze = () => {
    const totalRev = 1_200_000 + Math.round(Math.random() * 800_000);
    const ebitda = Math.round(totalRev * (0.18 + Math.random() * 0.1));
    const margin = Math.round((ebitda / totalRev) * 100);
    const debt = 200_000 + Math.round(Math.random() * 200_000);

    const text = `AI Summary:\n• Revenue TTM: ${currency(totalRev)}\n• EBITDA: ${currency(
      ebitda
    )} (margin ~${margin}%)\n• Interest-bearing debt: ${currency(
      debt
    )}\n• Key risks: supplier concentration 42%, customer churn 7%/mo\n• Opportunities: pricing +4–6%, warehouse automation, B2B cross-sell.`;
    onChange({ ...deal, aiSummary: text });
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" /> AI Analyzer
        </CardTitle>
        <CardDescription>Automated analysis of financial docs & key risk/opportunity highlights.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FileText className="h-4 w-4" /> {deal.documents.length} documents detected
        </div>
        <Button onClick={analyze} className="rounded-xl">
          <Sparkles className="h-4 w-4 mr-2" /> Run Analysis
        </Button>
        {deal.aiSummary && (
          <pre className="p-4 rounded-xl bg-white/70 border text-sm whitespace-pre-wrap">
            {deal.aiSummary}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}

function StepNegotiation({ deal, onChange }: { deal: DealState; onChange: (d: DealState) => void }) {
  const n = deal.negotiation;
  const patch = (k: keyof DealState["negotiation"], v: any) =>
    onChange({ ...deal, negotiation: { ...n, [k]: v } });

  const suggest = () => {
    const suggestion = {
      offerPrice: 1_250_000,
      equityPercent: 90,
      earnout: true,
      escrow: true,
      targetCloseDays: 45,
      notes:
        "Typical SMB terms: 10% held in escrow for 6 months, earnout tied to 12% YoY growth.",
    };
    onChange({ ...deal, negotiation: { ...deal.negotiation, ...suggestion } });
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Handshake className="h-5 w-5" /> Negotiation
        </CardTitle>
        <CardDescription>Draft clear terms to reduce back-and-forth.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <Label>Offer Price (USD)</Label>
            <Input
              className="my-2"
              type="number"
              value={n.offerPrice ?? ""}
              onChange={(e) => patch("offerPrice", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Equity Acquired (%)</Label>
            <Input
              className="my-2"
              type="number"
              value={n.equityPercent ?? ""}
              onChange={(e) => patch("equityPercent", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Target Closing (days)</Label>
            <Input
              className="my-2"
              type="number"
              value={n.targetCloseDays ?? ""}
              onChange={(e) => patch("targetCloseDays", Number(e.target.value))}
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <Switch checked={!!n.earnout} onCheckedChange={(v) => patch("earnout", v)} /> Earnout
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Switch checked={!!n.escrow} onCheckedChange={(v) => patch("escrow", v)} /> Escrow
          </label>
        </div>
        <div>
          <Label>Notes</Label>
          <Textarea
            className="my-2"
            value={n.notes ?? ""}
            onChange={(e) => patch("notes", e.target.value)}
            placeholder="Additional details, earnout milestones, working capital adjustments, etc."
          />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={suggest} className="rounded-xl">
            <Sparkles className="h-4 w-4 mr-2" /> AI Suggest Terms
          </Button>
          {n.offerPrice && (
            <Badge variant="outline" className="rounded-full">
              <DollarSign className="h-3 w-3 mr-1" /> {currency(n.offerPrice)}
            </Badge>
          )}
          {n.targetCloseDays && (
            <Badge variant="outline" className="rounded-full">
              <Timer className="h-3 w-3 mr-1" /> {n.targetCloseDays} days
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StepClosing({ deal, onChange }: { deal: DealState; onChange: (d: DealState) => void }) {
  const items = [
    { key: "ndaSigned", label: "NDA signed" },
    { key: "accessGranted", label: "Data room access granted" },
    { key: "qnaCompleted", label: "Q&A diligence session completed" },
    { key: "redlinesResolved", label: "Contract finalized (redlines resolved)" },
    { key: "fundsVerified", label: "Proof of funds verified" },
  ] as const;

  const toggle = (k: keyof DealState["closingChecklist"], v: boolean) => {
    onChange({ ...deal, closingChecklist: { ...deal.closingChecklist, [k]: v } });
  };

  const completed = Object.values(deal.closingChecklist).filter(Boolean).length;
  const pct = Math.round((completed / items.length) * 100);

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgeCheck className="h-5 w-5" /> Closing Checklist
        </CardTitle>
        <CardDescription>Ensure all items are completed to maximize success rate.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={pct} className="h-2" />
        <div className="space-y-2">
          {items.map((it) => (
            <label
              key={it.key}
              className="flex items-center gap-3 p-3 rounded-lg border bg-white/60"
            >
              <Checkbox
                checked={deal.closingChecklist[it.key]}
                onCheckedChange={(v: any) => toggle(it.key, !!v)}
              />
              <span className="text-sm">{it.label}</span>
            </label>
          ))}
        </div>
        {pct === 100 && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm">
            🎉 Ready to close! Schedule signing & handover.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
