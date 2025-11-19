'use client';
import { useState } from 'react';
import { PaperAirplaneIcon, MoonIcon, SunIcon, Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTheme } from 'next-themes';

function PublicNavbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-transparent ">
      <nav className="bg-transparent text-foreground border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex mx-auto justify-between w-5/6 ">
            <div className="flex items-center gap-16 my-6 lg:my-8">
              <div>
                <Link href="/" className="flex gap-1 font-bold items-center text-foreground">
                  <PaperAirplaneIcon className="h-6 w-6 text-primary" />

                  <div className="flex items-center gap-1.5 font-[1000] leading-none"></div>
                  <div className="-mt-1 hidden text-xl sm:block">
                    <span className="text-foreground dark:text-foreground">
                      <span className="hoverText text-hover-primary">N</span>
                      <span className="hoverText text-hover-primary">u</span>
                      <span className="hoverText text-hover-primary">t</span>
                      <span className="hoverText text-hover-primary">r</span>
                      <span className="hoverText text-hover-primary">i</span>
                    </span>

                    <span className="text-primary dark:text-primary">
                      <span className="hoverText text-hover-light">S</span>
                      <span className="hoverText text-hover-light">y</span>
                      <span className="hoverText text-hover-light">s</span>
                    </span>
                  </div>
                </Link>
              </div>
              {/* primary */}
              <div className="hidden lg:flex gap-8">
                <a
                  href="/fitur"
                  className="hover:text-primary transition-colors"
                >
                  Fitur
                </a>
                <a
                  href="/chatbot"
                  className="hover:text-primary transition-colors"
                >
                  Chatbot
                </a>
                <a
                  href="/tentang"
                  className="hover:text-primary transition-colors"
                >
                Tentang
                </a>
                <a
                  href="/hubungikami"
                  className="hover:text-primary transition-colors"
                >
                  Hubungki Kami
                </a>
              </div>
            </div>
            {/* secondary */}
            <div className="flex gap-6">
              <div className="flex items-center gap-4">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors focus:ring-2 focus:ring-ring"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? (
                    <SunIcon className="h-6 w-6 text-yellow-400" />
                  ) : (
                    // Di Light Mode, ikon Moon harus terlihat seperti foreground
                    <MoonIcon className="h-6 w-6 text-foreground" />
                  )}
                </button>

                <div className="hidden lg:block">
                  {/* Sign In Button */}
                  <Link
                    href="/login"
                    // Border menggunakan warna border
                    className="rounded-full mr-2 border-solid border-2 border-border py-2 px-6 
                               hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Sign In
                  </Link>
                  {/* Sign Up Button (Primary Button) */}
                  <Link
                    href="/register"
                    // Menggunakan warna primary dan foreground primary
                    className="rounded-full mr-2 border-solid border-2 border-primary py-2 px-6 
                               bg-primary text-primary-foreground hover:opacity-80 transition-opacity"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>

              {/* Mobile navigation toggle */}
              <div className="lg:hidden flex items-center">
                <button onClick={() => setToggleMenu(!toggleMenu)}>
                  <Bars3Icon className="h-6 w-6 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* mobile navigation */}
        <div
          className={`fixed z-40 w-full bg-background overflow-hidden flex flex-col lg:hidden gap-12 
            origin-top duration-700 shadow-xl ${
              !toggleMenu ? 'h-0' : 'h-full p-6' // Tambahkan padding saat terbuka
            }`}
        >
          <div className="px-8">
            <div className="flex flex-col gap-8 font-bold tracking-wider">
              <a href="/fitur" className="border-l-4 border-primary pl-2">
                Fitur
              </a>
              <a href="/chatbot" className="border-l-4 border-transparent hover:border-border pl-2">
                Chatbot
              </a>
              <a href="/tentang" className="border-l-4 border-transparent hover:border-border pl-2">
                Tentang
              </a>
              <a href="/hubungikami" className="border-l-4 border-transparent hover:border-border pl-2">
                Hubungi Kami
              </a>

              {/* Mobile Auth Links */}
              <div className="mt-4 flex flex-col gap-4">
                <Link
                  href="/login"
                  className="w-full text-center rounded-lg border border-border py-2 px-6 
                             hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center rounded-lg border border-primary py-2 px-6 
                             bg-primary text-primary-foreground hover:opacity-80 transition-opacity"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default PublicNavbar;
