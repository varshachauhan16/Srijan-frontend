import { useState } from "react";
import { PhoneOff, AlertTriangle, PhoneCall, Ban, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FormKey =
  | "ring"
  | "noexist"
  | "callback"
  | "notreq"
  | "cfresh"
  | "altno"
  | "whatsapp"
  | "todaycb"
  | "language"
  | null;

const statusPills = [
  { key: "ring" as const, label: "Ring/Switch Off/Call", icon: PhoneOff, bg: "bg-[hsl(35_60%_82%)] text-[hsl(30_50%_35%)]" },
  { key: "noexist" as const, label: "No. Does Not Exist", icon: AlertTriangle, bg: "bg-[hsl(195_45%_75%)] text-[hsl(200_50%_25%)]" },
  { key: "callback" as const, label: "Call Back", icon: PhoneCall, bg: "bg-[hsl(150_40%_65%)] text-[hsl(150_45%_20%)]" },
  { key: "notreq" as const, label: "Treatment Not Required", icon: Ban, bg: "bg-[hsl(20_70%_70%)] text-[hsl(15_55%_25%)]" },
];

const actions = [
  { key: "cfresh" as const, label: "Update CFresh", style: "bg-[image:var(--gradient-blue)]" },
  { key: "altno" as const, label: "Add Alt. No.", style: "bg-gradient-to-br from-[hsl(225_70%_45%)] to-[hsl(235_70%_40%)]" },
  { key: "whatsapp" as const, label: "Add WhatsApp. No.", style: "bg-[image:var(--gradient-green)]" },
  { key: "todaycb" as const, label: "Today Call Back", style: "bg-[image:var(--gradient-pink)]" },
  { key: "language" as const, label: "Language", style: "bg-[image:var(--gradient-teal)]" },
];

const titles: Record<Exclude<FormKey, null>, string> = {
  ring: "Please click on confirm button and wait for redirection",
  noexist: "No. Does Not Exist",
  callback: "Call Back",
  notreq: "Treatment Not Required",
  cfresh: "Update Prospect",
  altno: "Add Alternate No.",
  whatsapp: "Add WhatsApp No.",
  todaycb: "Today CallBack.",
  language: "Language",
};

const SubmitBtn = ({
  variant = "muted",
  children = "SUBMIT",
}: { variant?: "muted" | "pink" | "green"; children?: React.ReactNode }) => {
  const map = {
    muted: "bg-muted text-muted-foreground hover:bg-muted/80",
    pink: "bg-[image:var(--gradient-pink)] text-white hover:shadow-lg",
    green: "bg-[image:var(--gradient-green)] text-white hover:shadow-lg",
  };
  return (
    <button
      type="submit"
      className={`w-full py-2.5 rounded-md text-sm font-semibold tracking-wide transition ${map[variant]}`}
    >
      {children}
    </button>
  );
};

const FormBody = ({ formKey }: { formKey: Exclude<FormKey, null> }) => {
  switch (formKey) {
    case "ring":
      return (
        <div className="space-y-4 pt-2">
          <Select>
            <SelectTrigger><SelectValue placeholder="Please Select Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ring">Ring</SelectItem>
              <SelectItem value="switchoff">Switch Off</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
            </SelectContent>
          </Select>
          <Textarea placeholder="Add Comment.." rows={3} />
          <SubmitBtn />
        </div>
      );
    case "noexist":
      return (
        <div className="space-y-4 pt-2">
          <Select>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="invalid">Invalid Number</SelectItem>
              <SelectItem value="notexist">Does Not Exist</SelectItem>
            </SelectContent>
          </Select>
          <SubmitBtn />
        </div>
      );
    case "callback":
      return (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Time</Label>
              <Input type="time" />
            </div>
            <Select>
              <SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Other Comments" rows={2} />
          </div>
          <SubmitBtn variant="green">Submit</SubmitBtn>
        </div>
      );
    case "notreq":
      return (
        <div className="space-y-4 pt-2">
          <Select>
            <SelectTrigger><SelectValue placeholder="Select Reason" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="natural">Wants Natural</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <SubmitBtn />
        </div>
      );
    case "cfresh":
      return (
        <div className="space-y-4 pt-2">
          <Select>
            <SelectTrigger><SelectValue placeholder="Call Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="fresh">Fresh</SelectItem>
              <SelectItem value="follow">Follow Up</SelectItem>
            </SelectContent>
          </Select>
          <SubmitBtn />
        </div>
      );
    case "altno":
      return (
        <div className="space-y-4 pt-2">
          <Input placeholder="Mobile No." />
          <p className="text-center text-xs text-[hsl(var(--brand-pink))] font-semibold">Count : 0</p>
          <SubmitBtn variant="pink" />
        </div>
      );
    case "whatsapp":
      return (
        <div className="space-y-4 pt-2">
          <Select>
            <SelectTrigger><SelectValue placeholder="Select Whatsapp No" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="alt">Alternate</SelectItem>
            </SelectContent>
          </Select>
          <SubmitBtn variant="pink" />
        </div>
      );
    case "todaycb":
      return (
        <div className="space-y-4 pt-2">
          <Input type="time" />
          <Textarea placeholder="Add Comment.." rows={2} />
          <SubmitBtn />
        </div>
      );
    case "language":
      return (
        <div className="space-y-4 pt-2">
          <Select>
            <SelectTrigger><SelectValue placeholder="Language" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="tamil">Tamil</SelectItem>
            </SelectContent>
          </Select>
          <Textarea placeholder="Comment" rows={3} />
          <SubmitBtn />
        </div>
      );
  }
};

const ActionBar = () => {
  const [openForm, setOpenForm] = useState<FormKey>(null);

  return (
    <section className="space-y-4">
      <div className="bg-card rounded-xl p-4 shadow-[var(--shadow-card)] flex flex-wrap gap-3 justify-center">
        {statusPills.map((p) => (
          <button
            key={p.label}
            onClick={() => setOpenForm(p.key)}
            className={`${p.bg} px-5 py-2 rounded-md text-sm font-semibold flex items-center gap-2 hover:brightness-95 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200`}
          >
            {p.label} <p.icon className="h-4 w-4" />
          </button>
        ))}
      </div>

      <div className="bg-card rounded-xl p-4 shadow-[var(--shadow-card)] flex flex-wrap items-center gap-3">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => setOpenForm(a.key)}
            className={`${a.style} text-white px-5 py-2.5 rounded-md text-sm font-semibold shadow hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200`}
          >
            {a.label}
          </button>
        ))}
        <div className="flex-1 min-w-[220px] flex items-center rounded-md overflow-hidden border border-[hsl(var(--brand-pink))] shadow-sm focus-within:ring-2 focus-within:ring-[hsl(var(--brand-pink))]/40 transition">
          <input
            type="text"
            placeholder="Search Here..."
            className="flex-1 px-4 py-2 outline-none bg-white text-sm"
          />
          <button className="bg-[image:var(--gradient-pink)] text-white px-4 py-2.5 hover:brightness-110 transition">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Dialog open={openForm !== null} onOpenChange={(o) => !o && setOpenForm(null)}>
        <DialogContent className="sm:max-w-lg">
          {openForm && (
            <>
              <DialogHeader className="border-b pb-3">
                <DialogTitle className="text-center text-xl font-bold bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
                  {titles[openForm]}
                </DialogTitle>
              </DialogHeader>
              <FormBody formKey={openForm} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ActionBar;
