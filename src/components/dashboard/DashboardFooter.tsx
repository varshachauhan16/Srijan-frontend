const DashboardFooter = () => {
  return (
    <footer className="w-full bg-[image:var(--gradient-header)] text-white/90 mt-8">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <p>© {new Date().getFullYear()} SRIJAN CRM. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Support</a>
        </div>
        <p className="opacity-80">v1.0.0</p>
      </div>
    </footer>
  );
};

export default DashboardFooter;