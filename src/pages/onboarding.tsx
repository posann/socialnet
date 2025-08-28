import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ShieldCheck, Rocket } from "lucide-react";
import type { Role } from "@/lib/constanta";

export function Onboarding({
  onComplete,
}: {
  onComplete: (role: Role, form: any) => void;
}) {
  const [role, setRole] = useState<Role>("Seller");
  const [form, setForm] = useState<any>({});

  const Question = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm text-slate-600">{label}</Label>
      {children}
    </div>
  );

  const handle = (k: string, v: any) =>
    setForm((f: any) => ({ ...f, [k]: v }));

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-emerald-600" /> Start Onboarding
        </CardTitle>
        <CardDescription>
          Personalize your experience based on your role.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={role} onValueChange={(v: any) => setRole(v)}>
          <TabsList className="grid gap-2 grid-cols-2 w-full">
            <TabsTrigger value="Seller">Seller</TabsTrigger>
            <TabsTrigger value="Buyer">Buyer</TabsTrigger>
          </TabsList>

          {/* SELLER QUESTIONS */}
          <TabsContent value="Seller" className="space-y-4 py-4">
            <Question label="Business Name & Industry">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Business name"
                  value={form.bizName || ""}
                  onChange={(e) => handle("bizName", e.target.value)}
                />
                <Select
                  value={form.industry || ""}
                  onValueChange={(v) => handle("industry", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="F&B">F&B</SelectItem>
                    <SelectItem value="Services">Services</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Distribution">Distribution</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Question>
            <Question label="Company Size & Sale Readiness">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Annual Revenue (USD)"
                  type="number"
                  value={form.rev || ""}
                  onChange={(e) => handle("rev", e.target.value)}
                />
                <Input
                  placeholder="EBITDA (USD)"
                  type="number"
                  value={form.ebitda || ""}
                  onChange={(e) => handle("ebitda", e.target.value)}
                />
                <Select
                  value={form.timeline || ""}
                  onValueChange={(v) => handle("timeline", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sale Timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<3mo">Within 3 months</SelectItem>
                    <SelectItem value=">3mo">More than 3 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Question>
            <Question label="What do you expect from a buyer?">
              <Textarea
                placeholder="E.g., preserve brand identity, retain key team..."
                value={form.asks || ""}
                onChange={(e) => handle("asks", e.target.value)}
              />
            </Question>
          </TabsContent>

          {/* BUYER QUESTIONS */}
          <TabsContent value="Buyer" className="space-y-4 py-4">
            <Question label="Identity & Focus">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Name / Firm"
                  value={form.name || ""}
                  onChange={(e) => handle("name", e.target.value)}
                />
                <Input
                  placeholder="Location"
                  value={form.location || ""}
                  onChange={(e) => handle("location", e.target.value)}
                />
                <Select
                  value={form.speed || ""}
                  onValueChange={(v) => handle("speed", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Decision-making speed" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Fast">Fast</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Deliberate">Deliberate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Question>
            <Question label="Budget & Industries">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Minimum budget (USD)"
                  type="number"
                  value={form.bmin || ""}
                  onChange={(e) => handle("bmin", e.target.value)}
                />
                <Input
                  placeholder="Maximum budget (USD)"
                  type="number"
                  value={form.bmax || ""}
                  onChange={(e) => handle("bmax", e.target.value)}
                />
                <Input
                  placeholder="Preferred industries (comma separated)"
                  value={form.inds || ""}
                  onChange={(e) => handle("inds", e.target.value)}
                />
              </div>
            </Question>
            <Question label="Deal Preferences">
              <Textarea
                placeholder="E.g., founder-led, >20% GM..."
                value={form.prefs || ""}
                onChange={(e) => handle("prefs", e.target.value)}
              />
            </Question>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <ShieldCheck className="h-4 w-4" /> Your data is used solely to find
            the best matches.
          </div>
          <Button
            size="lg"
            className="rounded-xl bg-black text-white"
            onClick={() => onComplete(role, form)}
          >
            Continue As {role}<ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
