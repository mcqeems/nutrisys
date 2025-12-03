'use client';

import { useState } from 'react';
import { MinusIcon } from '@heroicons/react/24/solid';
import Chatbot from '@/app/(protected)/chatbot/components/Chatbot';

interface ChatbotWindowProps {
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export default function ChatbotWindow({ onClose }: ChatbotWindowProps) {
  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Halo! Saya NutriSys AI, siap membantu Anda menganalisis dan merencanakan kebutuhan nutrisi. Silakan tanyakan tentang kandungan makanan, diet, atau pola makan.',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage: Message = {
        id: Date.now(),
        text: inputText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputText('');

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: 'Terima kasih atas pertanyaannya! Saya sedang memproses informasi nutrisi tersebut.',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div
      id="chatbot-window"
      className="
        bg-card 
        w-80 md:w-96 h-[480px] 
        rounded-xl 
        shadow-xl 
        flex flex-col 
        overflow-hidden
      "
      style={{
        borderRadius: 'var(--radius)',
      }}
    >
      <div
        className="
          bg-primary text-primary-foreground 
          p-3 
          flex justify-between items-center 
          shadow-md
        "
        style={{
          backgroundImage: 'linear-gradient(to right, var(--primary), var(--primary))',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="flex items-center space-x-2">
          <div className=" p-1 rounded-full">
            <div className="w-6 h-6">
              <Chatbot />
            </div>
          </div>
          <h3 className="font-bold">NutriSys AI</h3>
        </div>

        <button
          onClick={onClose}
          className="text-primary-foreground hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="Tutup Chat"
        >
          <MinusIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Body/Pesan Chat */}
      <div className="grow p-3 space-y-4 overflow-y-auto bg-background text-foreground">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`
                        max-w-[80%] p-3 rounded-xl shadow-md 
                        ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-secondary text-secondary-foreground rounded-tl-none'
                        }
                    `}
            >
              <p className="text-sm">{msg.text}</p>
              <span className={`text-xs mt-1 block ${msg.sender === 'user' ? 'opacity-80' : 'opacity-60'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Text */}
      <div className="p-3 border-t border-border flex items-center bg-card">
        <input
          type="text"
          placeholder="Tanyakan analisis nutrisi..."
          className="
            grow 
            border border-input 
            p-2 
            rounded-l-md 
            bg-background 
            text-foreground
            focus:border-primary focus:ring-1 focus:ring-primary 
          "
          style={{
            borderRadius: 'var(--radius-sm)',
          }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          className="
            bg-primary 
            text-primary-foreground 
            p-2 
            ml-1
            rounded-md
            transition-colors duration-200
            hover:bg-primary/90 
            disabled:opacity-50
          "
          style={{
            borderRadius: 'var(--radius-sm)',
          }}
          disabled={!inputText.trim()}
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
