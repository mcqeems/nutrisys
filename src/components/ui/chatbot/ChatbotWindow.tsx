'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MinusIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import Chatbot from '@/app/(protected)/chatbot/components/Chatbot';

// Local imports
import type { Message, ChatbotWindowProps, ChatHistory } from './types';
import { sendPublicChatMessage } from './actions';
import { quickStartSuggestions, initialWelcomeMessage } from './constants';
import RenderMessage from './RenderMessage';
import TypingIndicator from './TypingIndicator';

export default function ChatbotWindow({ onClose }: ChatbotWindowProps) {
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messageIdCounter, setMessageIdCounter] = useState<number>(2);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      ...initialWelcomeMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = useCallback(
    async (text?: string) => {
      const messageText = text || inputText;
      if (messageText.trim() === '' || isTyping) return;

      const userMessageId = messageIdCounter;
      const botMessageId = messageIdCounter + 1;
      setMessageIdCounter((prev) => prev + 2);

      const timestamp = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      // Add user message
      const newMessage: Message = {
        id: userMessageId,
        text: messageText,
        sender: 'user',
        timestamp,
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputText('');
      setIsTyping(true);

      try {
        // Call Gemini API
        const result = await sendPublicChatMessage(messageText, chatHistory);

        const botResponse = result.success
          ? result.response || 'Maaf, tidak ada respons.'
          : result.error || 'Terjadi kesalahan.';

        // Update chat history for context
        setChatHistory((prev) => [...prev, { role: 'user', text: messageText }, { role: 'model', text: botResponse }]);

        // Add bot message
        setMessages((prev) => [
          ...prev,
          {
            id: botMessageId,
            text: botResponse,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: botMessageId,
            text: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [inputText, messageIdCounter, isTyping, chatHistory]
  );

  const handleSuggestionClick = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <div
      id="chatbot-window"
      className="
        bg-card 
        w-80 md:w-96 h-[520px] 
        rounded-xl 
        shadow-2xl 
        flex flex-col 
        overflow-hidden
        border border-border
      "
      style={{
        borderRadius: 'var(--radius)',
      }}
    >
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <div className="bg-primary-foreground/20 p-1.5 rounded-full">
            <div className="w-6 h-6">
              <Chatbot />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm">NutriSys Support</h3>
            <p className="text-xs opacity-80">• Online</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-primary-foreground hover:bg-primary-foreground/20 p-1.5 rounded-full transition-all cursor-pointer"
          aria-label="Tutup Chat"
        >
          <MinusIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-background text-foreground">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`
                max-w-[85%] p-3 rounded-2xl shadow-sm
                ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-secondary text-secondary-foreground rounded-bl-sm'
                }
              `}
            >
              <RenderMessage content={msg.text} isUser={msg.sender === 'user'} />
              <span className={`text-xs mt-1 block ${msg.sender === 'user' ? 'opacity-70' : 'opacity-50'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary text-secondary-foreground px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm">
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Start Suggestions */}
      {messages.length === 1 && !isTyping && (
        <div className="px-3 pb-2">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {quickStartSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.prompt)}
                className="
                  text-xs px-2.5 py-1.5 
                  bg-secondary hover:bg-primary hover:text-primary-foreground
                  text-secondary-foreground
                  rounded-full 
                  transition-all duration-200
                  border border-border hover:border-primary
                "
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-border flex items-center gap-2 bg-card">
        <input
          type="text"
          placeholder="Tanya disini..."
          className="
            flex-1
            border border-input 
            p-2.5 px-4
            rounded-full
            bg-background 
            text-foreground
            text-sm
            focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none
            transition-all
          "
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isTyping) {
              handleSend();
            }
          }}
          disabled={isTyping}
        />
        <button
          onClick={() => handleSend()}
          className="
            bg-primary 
            text-primary-foreground 
            p-2.5
            rounded-full
            transition-all duration-200
            hover:bg-primary/90 hover:scale-105
            disabled:opacity-50 disabled:hover:scale-100
            cursor-pointer
          "
          disabled={!inputText.trim() || isTyping}
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
