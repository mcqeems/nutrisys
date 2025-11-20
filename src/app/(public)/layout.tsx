'use client';

import PublicNavbar from '@/components/ui/navbar/PublicNavbar';
import { Footer } from '@/components/ui/footer';
import { ThemeProvider } from 'next-themes';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider defaultTheme="light" attribute='class'>
        <PublicNavbar />
        {children}
        <Footer/>
      </ThemeProvider>
    </>
  );
};

export default Layout;
