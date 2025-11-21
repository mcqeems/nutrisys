"use client";

import ContactForm from "./component/contact-form";
import ContactHeader from "./component/contact-header";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-backgroundtext-foreground">
      <ContactHeader />

      <div className="container mx-auto py-16 px-4 md:px-8 lg:px-16 space-y-16">
        <ContactForm />
      </div>
    </main>
  );
}
