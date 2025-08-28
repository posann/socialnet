import { Button } from "@/components/ui/button";
import { LogOut, Settings, Sparkles, User2 } from "lucide-react";


export function TopBar({ onSettings, onProfile, onboarded }: { onSettings: () => void; onProfile: () => void; onboarded: boolean }) {

  const signOut = () => {
    location.reload()
  }

  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-600" />
          <span className="font-semibold">SOCIALNET</span>
          <span className="text-xs text-slate-500 ml-2">— make deals feel easy</span>
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={!onboarded} className="bg-gray-500 text-white" size="sm" onClick={onProfile}>
            <User2 className="h-4 w-4 mr-2" /> Profile
          </Button>
          <Button disabled={!onboarded} className="bg-gray-500 text-white" size="sm" onClick={onSettings}>
            <Settings className="h-4 w-4 mr-2" /> Settings
          </Button>
          <Button disabled={!onboarded} className="bg-black text-white" size="sm" onClick={() => signOut()}>
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}