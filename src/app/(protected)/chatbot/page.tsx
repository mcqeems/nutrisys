import { Metadata } from 'next';
import ChatbotPage from './components/ChatbotPage';

export const metadata: Metadata = {
  title: 'AI Chatbot',
  description:
    'Chat with NutriBot - your AI-powered nutrition assistant for personalized health advice and wellness guidance.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Analyze() {
  return <ChatbotPage />;
}
