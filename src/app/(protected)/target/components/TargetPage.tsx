'use client';

import { Container, Flex, Heading, Text, Box } from '@chakra-ui/react';
import Target from './Target';
import { useColorModeValue } from '@/components/ui/color-mode';

export default function TargetPage() {
  const titleColor = useColorModeValue('green.600', 'green.500');
  const titleColorMuted = useColorModeValue('gray.500', 'gray.300');
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
