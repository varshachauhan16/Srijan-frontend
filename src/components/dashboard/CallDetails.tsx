import SectionCard from "./SectionCard";
import { Link } from "react-router-dom";
import {
  PhoneIncoming, PhoneOutgoing, FolderOpen, Database, Upload,
  PhoneCall, TrendingUp, CalendarClock, CalendarDays, AlertTriangle, CheckCircle2,
} from "lucide-react";

const tiles = [
  { label: "All Leads", icon: FolderOpen, style: "bg-[image:var(--gradient-pink)]", count: 0, to: "/ce/all-leads" },
  { label: "C_FRESH", icon: Database, style: "bg-gradient-to-br from-[hsl(272_45%_50%)] to-[hsl(280_45%_45%)]", count: 0 },
  { label: "New Status Lead", icon: Upload, style: "bg-gradient-to-br from-[hsl(345_55%_45%)] to-[hsl(355_55%_40%)]", count: 0 },
  { label: "Call Back", icon: PhoneCall, style: "bg-[image:var(--gradient-green)]", count: 0 },
  { label: "Positive Calls", icon: TrendingUp, style: "bg-[image:var(--gradient-orange)]", count: 0 },
  { label: "Today Call Back", style: "bg-[image:var(--gradient-pink)]", icon: CalendarClock, count: 0 },
  { label: "Tentative Appointment", icon: CalendarDays, style: "bg-[image:var(--gradient-blue)]", count: 0 },
  { label: "Appointment Missed", icon: AlertTriangle, style: "bg-gradient-to-br from-[hsl(0_60%_55%)] to-[hsl(15_65%_50%)]", count: 0 },
  { label: "Appointment Done", icon: CheckCircle2, style: "bg-[image:var(--gradient-teal)]", count: 0 },
];

const CallDetails = () => {
  return (
    <SectionCard title="Call Details">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center bg-white rounded-md overflow-hidden border border-border shadow-sm">
          <input placeholder="Pick Incoming" className="flex-1 px-4 py-2 outline-none text-sm" />
          <button className="bg-[image:var(--gradient-pink)] px-4 py-2.5 text-white">
            <PhoneIncoming className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center bg-white rounded-md overflow-hidden border border-border shadow-sm">
          <input placeholder="Dial Outgoing" className="flex-1 px-4 py-2 outline-none text-sm" />
          <button className="bg-[image:var(--gradient-pink)] px-4 py-2.5 text-white">
            <PhoneOutgoing className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tiles.map((t) => (
          <Link
            key={t.label}
            to={(t as { to?: string }).to ?? "#"}
            className={`${t.style} relative text-white rounded-md py-3 px-3 text-sm font-semibold flex items-center gap-2 shadow hover:-translate-y-0.5 transition`}
          >
            <t.icon className="h-4 w-4" />
            <span className="truncate">{t.label}</span>
            <span className="absolute -top-2 -right-2 bg-[hsl(0_75%_55%)] text-white text-[10px] h-5 min-w-5 px-1 rounded-full flex items-center justify-center shadow">
              {t.count}
            </span>
          </Link>
        ))}
      </div>
    </SectionCard>
  );
};

export default CallDetails;