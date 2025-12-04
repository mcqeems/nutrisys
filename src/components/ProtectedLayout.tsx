'use client';

import { Box, Flex } from '@chakra-ui/react';
import { ReactNode, useState, useEffect } from 'react';
import { useColorModeValue } from './ui/color-mode';
import ProtectedNavbar from './ProtectedNavbar';
import { NotificationProvider } from '@/context/NotificationContext';

interface UserInfo {
  id: number;
  user_id: string;
  gender?: string | null;
  height?: number | null;
  weight?: number | null;
  blood_type?: string | null;
  food_allergy?: string | null;
  medical_history?: string | null;
  created_at: string;
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<UserInfo | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const greenBox = useColorModeValue('green.200', 'green.800');

  useEffect(() => {
    async function fetchUserData(): Promise<void> {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSession(data.data);
        setLoadingUser(false);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }
    fetchUserData();
  }, []);

  return (
    <NotificationProvider>
      <Box w="100%" maxW={{ base: '100%', md: '8xl' }} mx="auto" px={{ base: 0, md: 4 }}>
        <Box
          w="full"
          p={{ base: 2, md: 4 }}
          my={{ base: 0, md: 1.5 }}
          bg={greenBox}
          rounded={{ base: 'none', md: '2xl' }}
          shadow={{ base: 'none', md: 'lg' }}
          border="green"
          borderWidth={{ base: 0, md: 'medium' }}
        >
          <ProtectedNavbar session={session} loadingUser={loadingUser} />
          {children}
        </Box>
        <Flex alignItems="center" justifyContent="center">
          <Box p="2">© 2025 Nutrisys. All Rights Reserved.</Box>
        </Flex>
      </Box>
    </NotificationProvider>
  );
}
