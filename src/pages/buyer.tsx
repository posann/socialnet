import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import {
  Handshake,
  User2,
  CheckCircle2,
  XCircle,
  Search,
  MapPin,
} from "lucide-react";
import type { Buyer } from "@/lib/constanta";
import { currency, softPill } from "@/App";

export function Matches({
  buyers,
  accepted,
  rejected,
  onAccept,
  onReject,
  onStartDeal,
}: {
  buyers: Buyer[];
  accepted: string[];
  rejected: string[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onStartDeal: (id: string) => void;
}) {
  const [q, setQ] = useState("");

  const list = buyers.filter((b) =>
    [b.name, b.location, ...b.industryFocus].join(" ").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            className="pl-9"
            placeholder="Search buyers (name, location, industry)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Badge variant="outline" className="rounded-full">{list.length} results</Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {list.map((b) => (
          <BuyerCard
            key={b.id}
            buyer={b}
            accepted={accepted.includes(b.id)}
            rejected={rejected.includes(b.id)}
            onAccept={() => onAccept(b.id)}
            onReject={() => onReject(b.id)}
            onStartDeal={() => onStartDeal(b.id)}
          />
        ))}
      </div>
    </div>
  );
}

function BuyerCard({
  buyer,
  accepted,
  rejected,
  onAccept,
  onReject,
  onStartDeal,
}: {
  buyer: Buyer;
  accepted: boolean;
  rejected: boolean;
  onAccept: () => void;
  onReject: () => void;
  onStartDeal: () => void;
}) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{buyer.name.split(" ").map((w) => w[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">{buyer.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs">
              <MapPin className="h-3 w-3" /> {buyer.location}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {buyer.industryFocus.map((i) => softPill(i))}
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2 bg-white/60 rounded-lg border">
            <div className="text-slate-500">Budget</div>
            <div className="font-medium">{currency(buyer.budgetMin)} - {currency(buyer.budgetMax)}</div>
          </div>
          <div className="p-2 bg-white/60 rounded-lg border">
            <div className="text-slate-500">Track Record</div>
            <div className="font-medium">{buyer.trackRecord} deals</div>
          </div>
          <div className="p-2 bg-white/60 rounded-lg border">
            <div className="text-slate-500">Decision Speed</div>
            <div className="font-medium">{buyer.decisionSpeed}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!accepted && !rejected && (
            <>
              <Button className="rounded-xl" onClick={onAccept}><CheckCircle2 className="h-4 w-4 mr-2" /> Accept</Button>
              <Button variant="outline" className="rounded-xl" onClick={onReject}><XCircle className="h-4 w-4 mr-2" /> Reject</Button>
            </>
          )}
          {accepted && (
            <>
              <Badge className="bg-emerald-600">Accepted</Badge>
              <Button variant="secondary" className="rounded-xl" onClick={onStartDeal}><Handshake className="h-4 w-4 mr-2" /> Start Deal</Button>
              <BuyerProfileDialog buyer={buyer} />
            </>
          )}
          {rejected && <Badge variant="destructive">Rejected</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}

function BuyerProfileDialog({ buyer }: { buyer: Buyer }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl">View Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User2 className="h-5 w-5" /> {buyer.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Info label="Location" value={buyer.location} />
            <Info label="Budget" value={`${currency(buyer.budgetMin)} – ${currency(buyer.budgetMax)}`} />
            <Info label="Industry Focus" value={buyer.industryFocus.join(", ")} />
            <Info label="Decision Speed" value={buyer.decisionSpeed} />
            <Info label="Track Record" value={`${buyer.trackRecord} deals`} />
          </div>
          <div>
            <Label>Preferences</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {buyer.preferences.map((p) => softPill(p))}
            </div>
          </div>
          <div>
            <Label>Bio</Label>
            <p className="text-sm text-slate-600 mt-1">{buyer.bio}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg border bg-white/60">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="font-medium text-sm">{value}</div>
    </div>
  );
}
