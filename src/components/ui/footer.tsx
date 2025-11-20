// components/Footer.tsx
import Link from "next/link";
import { Leaf, Twitter, Facebook, Instagram } from "lucide-react";
import Image from "next/image";
// Definisikan tipe dasar untuk tautan
interface FooterLink {
  href: string;
  label: string;
}

// Data Tautan Navigasi Cepat
const navLinks: FooterLink[] = [
  { href: "/fitur", label: "Fitur Unggulan" },
  { href: "/harga", label: "Harga & Paket" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/kontak", label: "Hubungi Kami" },
];

const resourceLinks: FooterLink[] = [
  { href: "/blog", label: "Blog Kesehatan" },
  { href: "/faq", label: "FAQ" },
  { href: "/syarat", label: "Syarat & Ketentuan" },
  { href: "/privasi", label: "Kebijakan Privasi" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* === Grid Utama Footer === */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* 1. Logo & Deskripsi Singkat */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-80"
            >
              <Image
                src="/Logo/nutrysys_horizontal_text.webp"
                alt="Nutrisys Logo"
                width={180}
                height={30}
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Membantu Anda mencapai keseimbangan nutrisi dan kesehatan optimal
              dengan teknologi AI.
            </p>
          </div>

          {/* 2. Navigasi Cepat */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-primary/20 pb-1">
              Navigasi
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm hoverText"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Sumber Daya */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-primary/20 pb-1">
              Sumber Daya
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm hoverText"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Tautan Sosial */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-primary/20 pb-1">
              Ikuti Kami
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-border" />

        <div className="text-center md:flex md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} NutriSys. Semua hak dilindungi.
          </p>
          <div className="text-xs text-muted-foreground mt-2 md:mt-0">
            Dibuat dengan ❤️ untuk kesehatan Anda.
          </div>
        </div>
      </div>
    </footer>
  );
}
