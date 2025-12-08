import Link from "next/link";
import { Metadata } from 'next';
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "404 - Page Not Found | NutriSys",
  description:
    "Oops! The page or recipe you are looking for couldn't be found in the NutriSys kitchen. Head back to the homepage to find your nutrition guide.",
  openGraph: {
    title: "404 - Recipe Missing",
    description:
      "Error 404: We are unable to find this page. Please try exploring our main menu.",
  },
};
const NotFound = () => {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground text-center">
        <div
          className="
        w-20 h-20 flex items-center justify-center 
        bg-linear-to-t from-primary to-sidebar-primary
        rounded-xl 
        shadow-xl 
        mb-8 
        animate-fadeIn
        shadow-primary/50
      "
        >
          <span className="text-3xl font-bold text-primary-foreground">
            404
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground tracking-tight">
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-base text-muted-foreground max-w-sm mb-6">
          Maaf, halaman yang Anda cari tidak tersedia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/" passHref legacyBehavior>
            <a
              className="
            px-8 py-3 
            bg-linear-to-r from-primary to-sidebar-primary
            text-primary-foreground 
            rounded-md 
            shadow-lg 
            hover:shadow-primary/70 
            transition-all 
            font-medium 
            hoverText
            min-w-[150px]
          "
            >
              Kembali ke Beranda
            </a>
          </Link>

          <Link href="/contact-us" passHref legacyBehavior>
            <a
              className="
            px-8 py-3 
            bg-secondary 
            text-secondary-foreground 
            rounded-md 
            shadow-md 
            transition-colors 
            font-medium 
            hoverText
            min-w-[150px]
            border-2 border-primary hover:border-accent
          "
            >
              Hubungi Kami
            </a>
          </Link>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default NotFound;
