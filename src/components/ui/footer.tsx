import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
interface FooterLink {
  href: string;
  label: string;
}
const EMAIL_ADDRESS = 'brucadalm@gmail.com';
const WA_NUMBER = '+6282210980898';
const WA_MESSAGE = 'Halo, saya ingin bertanya tentang Nutisys';

const navLinks: FooterLink[] = [
  { href: '/', label: 'Beranda' },
  { href: '/features', label: 'Fitur Unggulan' },
  { href: '/article', label: 'Blog Artikel' },
  { href: '/about', label: 'Tentang Kami' },
  { href: '/contact-us', label: 'Hubungi Kami' },
];

const resourceLinks: FooterLink[] = [
  { href: '/about/#visimisi', label: 'Visi Misi' },
  { href: '/about/#komitmen', label: 'Komitmen Kami' },
  { href: '/#faq', label: 'FAQ' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* logo & deskripsi */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
              <Image src="/Logo/nutrisys.webp" alt="Nutrisys Logo" width={70} height={70} />
              <div className="pl-2 block text-4xl font-bold">
                <span className="text-foreground dark:text-foreground ">
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
            <p className="text-sm text-muted-foreground max-w-xs">
              Membantu Anda mencapai keseimbangan nutrisi dan kesehatan optimal dengan teknologi AI.
            </p>
          </div>

          {/* Navigasi Cepat */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-primary/20 pb-1">Navigasi</h3>
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

          {/* Sumber Daya */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-primary/20 pb-1">Sumber Daya</h3>
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

          {/* tautan Sosial */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-primary/20 pb-1">Hubungi Kami</h3>
            <div className="flex space-x-4">
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                aria-label="Email Kami"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>

              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-border" />

        <div className="text-center md:flex md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} NutriSys. Semua hak dilindungi.</p>
          <div className="text-xs text-muted-foreground mt-2 md:mt-0">Dibuat dengan ❤️ untuk kesehatan Anda.</div>
        </div>
      </div>
    </footer>
  );
}
