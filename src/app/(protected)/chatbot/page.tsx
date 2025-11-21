import { Metadata } from 'next';
import ChatbotPage from './components/ChatbotPage';

export const metadata: Metadata = {
  title: 'Chatbot - Nutrisys',
  description: 'Mulai percakapan dengan teman baik kami di nutrisys!',
};

export default async function Analyze() {
  return <ChatbotPage />;
}
