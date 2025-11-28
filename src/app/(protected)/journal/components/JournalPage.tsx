'use client';

import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import Book from './Book';

export default function JournalPage() {
  return (
    <Container>
      <Flex direction="column" alignItems="center" justifyContent="center" textAlign="center">
        <Heading size="2xl" mb={2} color="green.600">
          Wellness Journal
        </Heading>
        <Text color="gray.500">
          Tulis catatan mengenai perkembangan kesehatan nutrisi anda dan dapatkan balasan dari Nutrisys AI.
        </Text>
        <Box bg="transparent" w="full" maxW="200px" mt="4">
          <Book />
        </Box>
      </Flex>
    </Container>
  );
}
