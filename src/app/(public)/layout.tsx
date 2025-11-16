import PublicNavbar from "@/components/ui/navbar/PublicNavbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PublicNavbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;

