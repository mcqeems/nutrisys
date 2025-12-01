'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Skeleton } from '../Skeleton';

interface NavLink {
  name: string;
  path: string;
}

const navLinks: NavLink[] = [
  { name: 'Fitur', path: '/features' },
  { name: 'Tentang', path: '/about' },
  { name: 'Artikel', path: '/article' },
  { name: 'Hubungi Kami', path: '/contact-us' },
];

const mobileLinks: NavLink[] = [
  { name: 'Fitur', path: '/features' },
  { name: 'Tentang', path: '/about' },
  { name: 'Artikel', path: '/article' },
  { name: 'Hubungi Kami', path: '/contact-us' },
];

function PublicNavbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const currentPath = usePathname();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const fetchUser = async function () {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          return null;
        } else {
          const data = response.json();
          setIsUser(true);
          return data;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  /**
   * @param path - Path tautan yang diperiksa.
   */
  const getLinkClassName = (path: string): string => {
    const isActive = currentPath === path;
    const defaultClass = 'py-1 hover:text-primary transition-colors duration-200';

    // Class untuk active link (Garis bawah untuk menandai)
    const activeClass = 'text-primary font-semibold border-b-2 border-primary';

    return `${defaultClass} ${isActive ? activeClass : ''}`;
  };

  /**
   * @param path - Path tautan yang diperiksa.
   */
  const getMobileLinkClassName = (path: string): string => {
    const isActive = currentPath === path;

    const defaultClass =
      'border-l-4 border-transparent hover:border-primary pl-4 transition-all duration-300 rounded-r-md';

    // Class untuk active link mobile (Garis kiri, teks, dan background primer)
    const activeClass = 'border-l-4 border-primary text-primary font-bold bg-primary/10';

    return `block py-3 ${defaultClass} ${isActive ? activeClass : ''}`;
  };

  return (
    <div className="fixed top-0 bg-transparent backdrop-blur-md inset-x-0 z-50 transition-colors duration-300">
      <nav className="bg-transparent text-foreground border-b border-border/70">
        <div className="max-w-7xl mx-auto">
          <div className="flex mx-auto justify-between w-5/6 ">
            {/* Logo Section */}
            <div className="flex items-center gap-16 my-4 lg:my-6">
              <div>
                <Link href="/" className="flex gap-1 font-bold items-center text-foreground">
                  <Image src="/Logo/nutrisys.webp" width={30} height={30} alt="NutriSys Nutrition Analysis" />

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

              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.path} className={getLinkClassName(link.path)}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex gap-4 items-center">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors focus:ring-2 focus:ring-ring"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <SunIcon suppressHydrationWarning className="h-6 w-6 text-yellow-400" />
                ) : (
                  <MoonIcon suppressHydrationWarning className="h-6 w-6 text-foreground" />
                )}
              </button>

              <div className="hidden lg:flex items-center gap-2">
                {isLoading ? (
                  <Skeleton className="h-8 w-24" />
                ) : isUser ? (
                  <Link
                    href="/dashboard"
                    className="rounded-lg border border-border p-2
                               hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex flex-row gap-2"
                  >
                    <p>Dashboard</p>
                  </Link>
                ) : (
                  <div className="lg:flex items-center gap-2">
                    <Link
                      href="/login"
                      className="rounded-full border border-border py-2 px-6 
                               hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="rounded-full border border-primary py-2 px-6 
                               bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-300"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setToggleMenu(!toggleMenu)}
                  aria-label="Toggle menu"
                  className="p-2 rounded-full hover:bg-accent transition-colors"
                >
                  {toggleMenu ? (
                    <XMarkIcon className="h-6 w-6 text-foreground" />
                  ) : (
                    <Bars3Icon className="h-6 w-6 text-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 📱 Mobile Navigation Menu */}
        <div
          className={`fixed inset-x-0 top-[68px] lg:hidden z-40 bg-background/95 backdrop-blur-lg 
            overflow-hidden transition-all duration-500 ease-in-out shadow-lg border-b border-border
            ${!toggleMenu ? 'max-h-0' : 'max-h-screen'}`}
        >
          <div className="p-4 pb-8">
            <div className="flex flex-col gap-1 font-medium tracking-wider">
              {mobileLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={getMobileLinkClassName(link.path)}
                  onClick={() => setToggleMenu(false)} // Tutup menu setelah klik
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Auth Links */}

              <div className="mt-6 pt-4 border-t border-border flex flex-col gap-4">
                {isLoading ? (
                  <Skeleton className="w-full h-4" />
                ) : isUser ? (
                  <Link
                    href="/login"
                    className="w-full text-center rounded-lg border border-border py-3 px-6 
                             bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                    onClick={() => setToggleMenu(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <div className=" flex flex-col gap-4">
                    <Link
                      href="/login"
                      className="w-full text-center rounded-lg border border-border py-3 px-6 
                             bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                      onClick={() => setToggleMenu(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="w-full text-center rounded-lg border border-primary py-3 px-6 
                             bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                      onClick={() => setToggleMenu(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default PublicNavbar;
