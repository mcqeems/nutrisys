
"use client";

import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import ChatbotWindow from "./ChatbotWindow";
import ScrollToTopButton from "../scroll-to-top";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openChat = (): void => {
    setIsOpen(true);
  };

  const closeChat = (): void => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {isOpen && (
        <div className="mb-3 animate-slide-in-up absolute bottom-full right-0">
          <ChatbotWindow onClose={closeChat} />
        </div>
      )}

      <div className="flex items-end space-x-3 md:space-x-4">
        {!isOpen && (
          <button
            onClick={openChat}
            className={`
              relative 
              flex items-center justify-between 
              w-72 md:w-70
              p-3 
              rounded-xl 
              shadow-2xl 
              transition-all duration-300 
              hover:opacity-90
              
              chatbot-pulse-float
              
              bg-primary text-primary-foreground
              border-2 border-primary-foreground/10
            `}
            style={
              {
                "--primary-rgb": "141, 196, 73",
                borderRadius: "var(--radius)",
                boxShadow: `0 0 15px rgba(var(--primary-rgb),0.7)`,
              } as React.CSSProperties
            }
            aria-expanded={isOpen}
            aria-controls="chatbot-window"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-primary-foreground/20 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary-foreground"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">NutriSys AI</h3>
                <p className="text-xs opacity-80">
                  Asisten Analisis Nutrisi Digital
                </p>
              </div>
            </div>
            <PlusIcon className="w-6 h-6 transform transition-transform duration-300" />
          </button>
        )}

      
        <ScrollToTopButton isHorizontal={true} />
      </div>
    </div>
  );
}
