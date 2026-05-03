import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import ActionBar from "@/components/dashboard/ActionBar";
import PatientDetails from "@/components/dashboard/PatientDetails";
import CallDetails from "@/components/dashboard/CallDetails";
import LeadsLists from "@/components/dashboard/LeadsLists";

const CEAgentDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1 container py-6 space-y-6">
        <ActionBar />
        <div className="grid gap-6 lg:grid-cols-2">
          <PatientDetails />
          <CallDetails />
        </div>
        <LeadsLists />
      </main>
      <DashboardFooter />
    </div>
  );
};

export default CEAgentDashboard;
