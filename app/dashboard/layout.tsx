// Layout for dashboard routes
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* TODO: Add navigation bar here */}
      <nav className="bg-gray-100 p-4">Dashboard Navigation</nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}
