'use client';

import { Container, Flex, Box, IconButton, Text, Popover, Portal, Button } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { useColorMode, useColorModeValue } from './ui/color-mode';
import { BellIcon, CircleUserIcon, DoorOpenIcon, MoonIcon, PencilIcon, SunIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

interface UserData {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export default function ProtectedLayout({
  children,
  userData,
}: {
  children: ReactNode;
  userData: UserData | undefined;
}) {
  const session = userData;
  const router = useRouter();
  const pathname = usePathname();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { toggleColorMode, colorMode } = useColorMode();
  const greenColor = useColorModeValue('green.500', 'green.400');
  const greenColorHover = useColorModeValue('green.400', 'green.500');
  const greenBox = useColorModeValue('green.200', 'green.800');
  const greenLogo = useColorModeValue('green.600', 'green.400');

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
                  Dashboard
                </Link>
                {pathname === '/dashboard' && (
                  <Box height="1" width="full" bg={greenColor} position="absolute" bottom="0" rounded="lg" />
                )}
              </div>
              <div className="h-full flex flex-col justify-center items-center relative">
                <Link href="/target" className="p-2 hoverText text-hover-light">
                  Target
                </Link>
                {pathname === '/target' && (
                  <Box height="1" width="full" bg={greenColor} position="absolute" bottom="0" rounded="lg" />
                )}
              </div>
              <div className="h-full flex flex-col justify-center items-center relative">
                <Link href="/journal" className="p-2 hoverText text-hover-light">
                  Jurnal
                </Link>
                {pathname === '/journal' && (
                  <Box height="1" width="full" bg={greenColor} position="absolute" bottom="0" rounded="lg" />
                )}
              </div>
              <div className="h-full flex flex-col justify-center items-center relative">
                <Link href="/chatbot" className="p-2 hoverText text-hover-light">
                  Chatbot
                </Link>
                {pathname === '/chatbot' && (
                  <Box height="1" width="full" bg={greenColor} position="absolute" bottom="0" rounded="lg" />
                )}
              </div>
              <div className="h-full flex flex-col justify-center items-center relative">
                <Link href="/analyze" className="p-2 hoverText text-hover-light">
                  Analisis Nutrisi
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
                    {session?.image ? (
                      <Image
                        src={session.image}
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
                          <Text>Nama: {session?.name || 'N/A'}</Text>
                          <Text>Email: {session?.email || 'N/A'}</Text>
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
