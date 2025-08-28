import { useState } from "react";
import type { Role } from "@/lib/constanta";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Profile({ role }: { role: Role | null }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Manage the information visible to others.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              className="my-2"
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input className="my-2" id="role" value={role ?? "—"} readOnly />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="desc">Short description</Label>
            <Textarea
              className="my-2"
              id="desc"
              placeholder="A short story about you/your business."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="rounded-xl" >
            Save
          </Button>
          <Button
            variant="outline"
            className="rounded-xl"
            
          >
            Public preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}