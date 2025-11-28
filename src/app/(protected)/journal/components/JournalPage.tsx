'use client';

import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Book from './Book';
import type { Journals } from '../types/types';

export default function JournalPage() {
  const [journals, setJournals] = useState<Journals>();
  return (
    <Container>
      <Flex direction="column" alignItems="center" justifyContent="center" textAlign="center">
        <Heading size="2xl" mb={2} color="green.600">
          Wellness Journal
        </Heading>
        <Text color="gray.400">
          Tulis catatan mengenai perkembangan kesehatan nutrisi anda dan dapatkan balasan dari Nutrisys AI.
        </Text>
      </Flex>
      <Flex
        direction="column"
        minHeight="400px"
        rounded="lg"
        border="2px dashed"
        alignItems="center"
        justifyContent="center"
        borderColor="gray.400"
        mt="2"
      >
        <Box bg="transparent" w="full" maxW="200px" mt="4">
          <Book />
        </Box>
        <Text color="gray.400">Belum ada catatan jurnal.</Text>
      </Flex>
    </Container>
  );
}
