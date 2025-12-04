import ContactForm from './component/ContactForm';
import ContactHeader from './component/ContactHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the NutriSys team. We are here to help with your questions about our AI-powered nutrition and wellness platform.',
  openGraph: {
    title: 'Contact NutriSys',
    description: 'Have questions? Reach out to our team for support and inquiries.',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-backgroundtext-foreground pt-20">
      <ContactHeader />

      <div className="container mx-auto py-16 px-4 md:px-8 lg:px-16 space-y-16">
        <ContactForm />
      </div>
    </main>
  );
}
