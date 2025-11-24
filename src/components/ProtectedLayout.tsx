'use client';

import { Container, Box } from '@chakra-ui/react';
import { ReactNode, useState, useEffect } from 'react';
import { useColorModeValue } from './ui/color-mode';
import ProtectedNavbar from './ProtectedNavbar';

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
    <>
      <Container>
        <Box w="full" p="4" my="1.5" bg={greenBox} rounded="2xl" shadow="lg" border="green" borderWidth="medium">
          <ProtectedNavbar session={session} loadingUser={loadingUser} />
          {children}
        </Box>
      </Container>
    </>
  );
}
