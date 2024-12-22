import Header from "@/components/ui/Header";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">
        DashboardLayout
        {children}
      </main>
    </>
  );
}

export default DashboardLayout;
