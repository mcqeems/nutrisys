"use client";
import { Suspense } from "react";
import PublicNavbar from "@/components/ui/navbar-public";
import { Footer } from "@/components/ui/footer";
import { ThemeProvider } from "next-themes";
import ChatbotWidget from "@/components/ui/chatbot/ChatbotWidget";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider defaultTheme="light" attribute="class">
        <PublicNavbar />
        {children}
        <ChatbotWidget />
      </ThemeProvider>
    </>
  );
};

export default Layout;
