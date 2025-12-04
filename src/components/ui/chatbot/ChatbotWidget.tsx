'use client';

import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import ChatbotWindow from './ChatbotWindow';
import ScrollToTopButton from '../scroll-to-top';
import Chatbot from '@/app/(protected)/chatbot/components/Chatbot';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openChat = (): void => {
    setIsOpen(true);
  };

  const closeChat = (): void => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-2 z-100">
      {isOpen && (
        <div className="mb-3 absolute bottom-full right-0">
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
              bg-primary text-primary-foreground
              border-2 border-primary-foreground/10
              cursor-pointer
            `}
            style={
              {
                '--primary-rgb': '141, 196, 73',
                borderRadius: 'var(--radius)',
                boxShadow: `0 0 15px rgba(var(--primary-rgb),0.7)`,
              } as React.CSSProperties
            }
            aria-expanded={isOpen}
            aria-controls="chatbot-window"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-primary-foreground/20 p-2 rounded-full">
                <div className="w-7 h-7">
                  <Chatbot />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold">NutriSys Support</h3>
                <p className="text-xs opacity-80">Punya keluhan? Tanyakan disini!</p>
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
