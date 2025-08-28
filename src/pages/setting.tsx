import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function SettingsPage() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account preferences & notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg border bg-white/60">
          <div>
            <div className="font-medium text-sm">Email Notifications</div>
            <div className="text-xs text-slate-500">Get notified about new matches</div>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg border bg-white/60">
          <div>
            <div className="font-medium text-sm">Privacy Mode</div>
            <div className="text-xs text-slate-500">Hide sensitive details from others</div>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
}
