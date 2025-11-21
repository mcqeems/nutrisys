'use client';

import { Container, Flex, Box, IconButton, Text } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useColorMode, useColorModeValue } from './ui/color-mode';
import { BellIcon, MoonIcon, SunIcon } from 'lucide-react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { toggleColorMode, colorMode } = useColorMode();
  const greenColor = useColorModeValue('green.500', 'green.400');
  const greenColorHover = useColorModeValue('green.400', 'green.500');
  const greenBox = useColorModeValue('green.200', 'green.800');
  const greenLogo = useColorModeValue('green.600', 'green.400');

  return (
    <Container>
      <Box w="full" p="4" my="1.5" bg={greenBox} rounded="2xl" shadow="lg" border="green" borderWidth="medium">
        <Flex direction="row" justifyContent="space-between">
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
          <Flex direction="row" gap="4">
            <div className="h-full flex justify-center items-center">
              <Link href="/target" className="p-2 hoverText text-hover-light">
                Target
              </Link>
            </div>
            <div className="h-full flex justify-center items-center">
              <Link href="/journal" className="p-2 hoverText text-hover-light">
                Jurnal
              </Link>
            </div>
            <div className="h-full flex justify-center items-center">
              <Link href="/chatbot" className="p-2 hoverText text-hover-light">
                Chatbot
              </Link>
            </div>
            <div className="h-full flex justify-center items-center">
              <Link href="/analyze" className="p-2 hoverText text-hover-light">
                Analisis Nutrisi
              </Link>
            </div>
          </Flex>
          <Flex direction="row" gap="4" justifyContent="center" alignItems="center">
            <IconButton
              aria-label="Color Mode"
              rounded="full"
              onClick={toggleColorMode}
              bg={greenColor}
              _hover={{ bg: greenColorHover }}
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </IconButton>
            <Link href="/notifications">
              <IconButton aria-label="Color Mode" rounded="full" bg={greenColor} _hover={{ bg: greenColorHover }}>
                <BellIcon />
              </IconButton>
            </Link>
          </Flex>
        </Flex>
      </Box>
      {children}
    </Container>
  );
}
