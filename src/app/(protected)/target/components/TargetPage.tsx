'use client';

import { Container, Flex, Heading, Text, Box } from '@chakra-ui/react';
import Target from './Target';
import { useColorModeValue } from '@/components/ui/color-mode';
import type { TargetTypes } from '../types/types';
import { useState, useEffect } from 'react';

async function fetchTargetData(): Promise<TargetTypes> {
  const response = await fetch('/api/target');
  return response.json();
}

export default function TargetPage() {
  const titleColor = useColorModeValue('green.600', 'green.500');
  const titleColorMuted = useColorModeValue('gray.500', 'gray.300');
  const [data, setData] = useState<TargetTypes | null>(null);

  useEffect(() => {
    fetchTargetData().then(setData);
  }, []);

  return (
    <Container>
      <Heading size="3xl" mb={2} color={titleColor}>
        Target
      </Heading>
      <Text color={titleColorMuted}>Buat target untuk membantu anda memenuhi tujuan anda.</Text>

      <Flex direction="column" alignItems="center" justifyContent="center">
        <Box bg="transparent" w="full" maxW="200px" mt="4">
          <Target />
        </Box>
      </Flex>
    </Container>
  );
}
