'use client';

import { Container, Flex, Box, IconButton, Text, Popover, Portal, Button } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useState, useEffect } from 'react';
import { useColorMode, useColorModeValue } from './ui/color-mode';
import { BellIcon, CircleUserIcon, DoorOpenIcon, MoonIcon, PencilIcon, SunIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

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
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<UserInfo | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { toggleColorMode, colorMode } = useColorMode();
  const greenColor = useColorModeValue('green.500', 'green.400');
  const greenColorHover = useColorModeValue('green.400', 'green.500');
  const greenBox = useColorModeValue('green.200', 'green.800');
  const greenLogo = useColorModeValue('green.500', 'green.400');

  useEffect(() => {
    async function fetchUserData(): Promise<void> {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSession(data.data);
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
          <Flex direction="row" justifyContent="space-between" mb="4">
            <div>
              <Link href="/">
                <Flex direction="row" justifyContent="center" alignItems="center" gap="2">
                  <div className="h-15 w-15">
                    <Image src="/Logo/nutrisys.webp" alt="logo" width={500} height={500}></Image>
                  </div>
                  <Text
                    style={{
                      fontFamily: 'Stack Sans Headline',
                      fontSize: '20px',
                      fontWeight: 500,
                    }}
                    color={greenLogo}
                  >
                    Nutrisys
                  </Text>
                </Flex>
              </Link>
            </div>
            <Flex direction="row" gap="6">
              <div className="h-full flex flex-col justify-center items-center relative">
                <Link href="/dashboard" className="p-2 hoverText text-hover-light">
                  <Text fontWeight={500}>Dashboard</Text>
                </Link>
                {pathname === '/dashboard' && (
                  <Box height="1" width="full" bg={greenColor} position="absolute" bottom="0" rounded="lg" />
                )}
              </div>
              <div className="h-full flex flex-col justify-center items-center relative">
                <Link href="/target" className="p-2 hoverText text-hover-light">
                  <Text fontWeight={500}>Target</Text>
                </Link>
                {pathname === '/target' && (
                  <Box height="1" width="full" bg={greenColor} position="absolute" bottom="0" rounded="lg" />
                )}
              </div>
              <div className="h-full flex flex-col justify-center items-center relative">
                <Link href="/journal" className="p-2 hoverText text-hover-light">
                  <Text fontWeight={500}>Wellness Jurnal</Text>
                </Link>
                {pathname === '/journal' && (
                  <Box height="1" width="full" bg={greenColor} position="absolute" bottom="0" rounded="lg" />
                )}
              </div>
              <div className="h-full flex flex-col justify-center items-center relative">
                <Link href="/chatbot" className="p-2 hoverText text-hover-light">
                  <Text fontWeight={500}>AI Chat</Text>
                </Link>
                {pathname === '/chatbot' && (
                  <Box height="1" width="full" bg={greenColor} position="absolute" bottom="0" rounded="lg" />
                )}
              </div>
              <div className="h-full flex flex-col justify-center items-center relative">
                <Link href="/analyze" className="p-2 hoverText text-hover-light">
                  <Text fontWeight={500}>Analisis Nutrisi</Text>
                </Link>
                {pathname === '/analyze' && (
                  <Box height="1" width="full" bg={greenColor} position="absolute" bottom="0" rounded="lg" />
                )}
              </div>
            </Flex>
            <Flex direction="row" gap="4" justifyContent="center" alignItems="center">
              <IconButton
                aria-label="Color Mode"
                rounded="full"
                onClick={toggleColorMode}
                bg={greenColor}
                _hover={{ bg: greenColorHover }}
                suppressHydrationWarning
              >
                {colorMode === 'light' ? <MoonIcon suppressHydrationWarning /> : <SunIcon suppressHydrationWarning />}
              </IconButton>
              <Link href="/notifications">
                <IconButton aria-label="Color Mode" rounded="full" bg={greenColor} _hover={{ bg: greenColorHover }}>
                  <BellIcon />
                </IconButton>
              </Link>
              <Popover.Root>
                <Popover.Trigger asChild>
                  <IconButton
                    aria-label="User Menu"
                    rounded="full"
                    bg={greenColor}
                    _hover={{ bg: greenColorHover }}
                    overflow="hidden"
                  >
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile Picture"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                        style={{ width: '40px', height: '40px' }}
                      />
                    ) : (
                      <CircleUserIcon />
                    )}
                  </IconButton>
                </Popover.Trigger>
                <Portal>
                  <Popover.Positioner>
                    <Popover.Content>
                      <Popover.Arrow />
                      <Popover.Body>
                        <Box mb="2">
                          <Popover.Title fontWeight="bold">User Info</Popover.Title>
                          <Text>Nama: {session?.user.name || 'N/A'}</Text>
                          <Text>Email: {session?.user.name || 'N/A'}</Text>
                        </Box>
                        <Flex direction="column" gap="2">
                          <Button
                            colorPalette="blue"
                            onClick={() => {
                              router.push('/user');
                            }}
                          >
                            <PencilIcon />
                            Personalisasi
                          </Button>
                          <Button
                            loading={logoutLoading}
                            loadingText="Logout"
                            spinnerPlacement="start"
                            colorPalette="red"
                            onClick={() => {
                              setLogoutLoading(true);
                              signOut();
                            }}
                          >
                            <DoorOpenIcon />
                            Logout
                          </Button>
                        </Flex>
                      </Popover.Body>
                    </Popover.Content>
                  </Popover.Positioner>
                </Portal>
              </Popover.Root>
            </Flex>
          </Flex>
          {children}
        </Box>
      </Container>
    </>
  );
}
