'use client';

import { Container, Flex, Heading, Text, Box } from '@chakra-ui/react';
import Target from './Target';

export default function TargetPage() {
  return (
    <Container>
      <Flex direction="column" alignItems="center" justifyContent="center" textAlign="center">
        <Heading size="2xl" mb={2} color="green.600">
          Target
        </Heading>
        <Text color="gray.400">Buat target untuk membantu anda memenuhi tujuan anda.</Text>
        <Box bg="transparent" w="full" maxW="200px" mt="4">
          <Target />
        </Box>
      </Flex>
    </Container>
  );
}
