'use client';

import PublicNavbar from '@/components/ui/navbar/PublicNavbar';
import { ThemeProvider } from 'next-themes';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider defaultTheme="light" attribute='class'>
        <PublicNavbar />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Layout;
