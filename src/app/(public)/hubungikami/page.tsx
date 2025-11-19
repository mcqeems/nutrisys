"use client";

import ContactForm from "./component/contact-form";
import ContactHeader from "./component/contact-header";
import ContactInfo from "./component/contact-info";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ContactHeader />
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>
      </div>
    </main>
  );
}
