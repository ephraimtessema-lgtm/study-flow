import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UpcomingAlertsPanel() {
  return (
    <Button variant="ghost" size="icon" className="text-slate-500" aria-label="Alerts">
      <Bell className="h-5 w-5" />
    </Button>
  );
}
