"use client";

import ContactForm from "./component/contact-form";
import ContactHeader from "./component/contact-header";
import { motion } from "framer-motion";
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-backgroundtext-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <ContactHeader />

        <div className="container mx-auto py-16 px-4 md:px-8 lg:px-16 space-y-16">
          <ContactForm />
        </div>
      </motion.div>
    </main>
  );
}
