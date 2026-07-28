import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 px-6 py-8 md:px-10 md:py-10">{children}</div>
    </div>
  );
}
