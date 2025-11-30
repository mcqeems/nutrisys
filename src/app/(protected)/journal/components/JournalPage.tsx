'use client';

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Card,
  Skeleton,
  VStack,
  Grid,
  GridItem,
  Button,
  Textarea,
  Input,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { PlusIcon, XIcon, SparklesIcon, PenLineIcon } from 'lucide-react';
import Book from './Book';
import type { Journals } from '../types/types';
import { createJournal, getAiReply } from '../actions/actions';
import { useColorModeValue } from '@/components/ui/color-mode';
import { toaster } from '@/components/ui/toaster';

export default function JournalPage() {
  const [journals, setJournals] = useState<Journals[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newJournalMood, setNewJournalMood] = useState('');
  const [newJournalContent, setNewJournalContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState<Journals | null>(null);

  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBgGreen = useColorModeValue('green.50', 'green.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const borderColorGreen = useColorModeValue('green.200', 'green.700');
  const sectionBg = useColorModeValue('gray.50', 'gray.900');
  const aiResponseBg = useColorModeValue('green.50', 'green.900');
  const borderCard = useColorModeValue('1px dashed rgba(0, 0, 0, 0.2)', '1px dashed rgba(255, 255, 255, 0.5)');
  const borderCardOuter = useColorModeValue('1px solid rgba(0, 0, 0, 0.2)', '1px solid rgba(255, 255, 255, 0.3)');
  const titleCardColor = useColorModeValue('gray.700', 'gray.400');
  const titleColor = useColorModeValue('green.600', 'green.500');
  const titleColorMuted = useColorModeValue('gray.500', 'gray.300');

  async function fetchJournals() {
    try {
      const response = await fetch('/api/journals');
      if (response.ok) {
        const data = await response.json();
        const sorted = (data.data || []).sort((a: Journals, b: Journals) => b.id - a.id);
        setJournals(sorted);
        setSelectedJournal((prev) => {
          if (prev) {
            const found = sorted.find((j: Journals) => j.id === prev.id);
            return found || sorted[0];
          }
          return sorted[0];
        });
      }
    } catch (error) {
      console.error('Failed to fetch Journals: ', error);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleCreate = async () => {
    if (!newJournalContent.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await createJournal(newJournalMood || 'neutral', newJournalContent);
      if (res.success) {
        toaster.create({ title: 'Jurnal berhasil disimpan', type: 'success' });
        setIsCreating(false);
        setNewJournalContent('');
        setNewJournalMood('');
        // Fetch journals will update the list and set selected to the new one (since it's sorted first)
        // But we need to make sure selectedJournal is cleared so it picks the first one
        setSelectedJournal(null);
        fetchJournals();
      } else {
        toaster.create({ title: 'Gagal menyimpan jurnal', type: 'error' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetAiReply = async (journal: Journals) => {
    setIsGeneratingAi(true);
    try {
      const res = await getAiReply(journal.id, journal.content, journal.mood);
      if (res.success) {
        fetchJournals();
      } else {
        toaster.create({ title: 'Gagal mendapatkan balasan AI', type: 'error' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const displayJournal = selectedJournal || (journals && journals.length > 0 ? journals[0] : null);
  const historyJournals = journals || [];

  return (
    <Container py={8}>
      <Heading size="2xl" mb={2} color={titleColor}>
        Wellness Journal
      </Heading>
      <Text color={titleColorMuted} mb="5">
        Tulis catatan mengenai perkembangan kesehatan nutrisi anda dan dapatkan balasan dari Nutrisys AI.
      </Text>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={2}>
        {/* Left Column: Latest Journal / Create Form */}
        <GridItem>
          <Box bg={sectionBg} p={6} rounded="xl" border={borderCardOuter} h="full" position="relative">
            {isCreating ? (
              <VStack align="stretch" gap={4} animation="fade-in 0.3s">
                <Flex justify="space-between" align="center">
                  <Heading size="md">Buat Jurnal Baru</Heading>
                  <IconButton variant="ghost" size="sm" onClick={() => setIsCreating(false)} aria-label="Cancel">
                    <XIcon />
                  </IconButton>
                </Flex>
                <Box>
                  <Text mb={2} fontSize="sm" fontWeight="medium">
                    Mood
                  </Text>
                  <Input
                    placeholder="Bagaimana perasaanmu hari ini?"
                    value={newJournalMood}
                    onChange={(e) => setNewJournalMood(e.target.value)}
                    bg={cardBg}
                  />
                </Box>
                <Box flex={1}>
                  <Text mb={2} fontSize="sm" fontWeight="medium">
                    Ceritakan harimu
                  </Text>
                  <Textarea
                    placeholder="Tuliskan catatanmu di sini..."
                    value={newJournalContent}
                    onChange={(e) => setNewJournalContent(e.target.value)}
                    rows={10}
                    bg={cardBg}
                    resize="none"
                  />
                </Box>
                <Button
                  colorPalette="green"
                  onClick={handleCreate}
                  loading={isSubmitting}
                  disabled={!newJournalContent.trim()}
                >
                  Simpan Jurnal
                </Button>
              </VStack>
            ) : (
              <VStack align="stretch" gap={4} h="full">
                <Flex justify="space-between" align="center">
                  <Heading size="md" color={titleCardColor}>
                    Jurnal Terakhir
                  </Heading>
                  <IconButton variant="outline" size="sm" onClick={() => setIsCreating(true)} aria-label="Add Journal">
                    <PlusIcon />
                  </IconButton>
                </Flex>

                {isFetching ? (
                  <Skeleton height="300px" rounded="md" />
                ) : displayJournal ? (
                  <Flex direction="column" gap={4} flex={1}>
                    <Card.Root variant="elevated" flex={1} bg={cardBg}>
                      <Card.Body position="relative">
                        <Flex
                          position="absolute"
                          inset={0}
                          alignItems="center"
                          justifyContent="center"
                          opacity={0.3}
                          pointerEvents="none"
                        >
                          <Box w="150px">
                            <Book />
                          </Box>
                        </Flex>
                        <Box position="relative" zIndex={1}>
                          <Flex justify="space-between" mb={2}>
                            <Badge colorPalette="blue">{displayJournal.mood}</Badge>
                            <Text fontSize="xs" color="gray.400">
                              {new Date(displayJournal.entry_date).toLocaleDateString('id-ID', {
                                dateStyle: 'medium',
                              })}
                            </Text>
                          </Flex>
                          <Text whiteSpace="pre-wrap">{displayJournal.content}</Text>
                        </Box>
                      </Card.Body>
                    </Card.Root>

                    <Box>
                      <Heading size="sm" mb={2} color={titleCardColor}>
                        Pesan AI:
                      </Heading>
                      <Card.Root variant="subtle" bg={aiResponseBg}>
                        <Card.Body border={borderCard} rounded="lg">
                          {displayJournal.ai_reply ? (
                            <Text fontSize="sm" fontStyle="italic">
                              &quot;{displayJournal.ai_reply}&quot;
                            </Text>
                          ) : (
                            <Flex direction="column" align="center" justify="center" py={4} gap={2}>
                              <Text fontSize="sm" color="gray.500">
                                Belum ada balasan AI
                              </Text>
                              <Button
                                size="sm"
                                variant="surface"
                                colorPalette="green"
                                onClick={() => handleGetAiReply(displayJournal)}
                                loading={isGeneratingAi}
                              >
                                <SparklesIcon size={16} /> Dapatkan Balasan AI
                              </Button>
                            </Flex>
                          )}
                        </Card.Body>
                      </Card.Root>
                    </Box>
                  </Flex>
                ) : (
                  <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    flex={1}
                    border={borderColor}
                    rounded="lg"
                    p={8}
                    textAlign="center"
                  >
                    <Box w="150px" mb={4}>
                      <Book />
                    </Box>
                    <Text color="gray.500" mb={4}>
                      Belum ada catatan jurnal.
                    </Text>
                    <Button onClick={() => setIsCreating(true)} colorPalette="green">
                      <PenLineIcon /> Mulai Menulis
                    </Button>
                  </Flex>
                )}
              </VStack>
            )}
          </Box>
        </GridItem>

        {/* Right Column: History */}
        <GridItem>
          <Box bg={sectionBg} p={6} rounded="xl" border={borderCardOuter} h="full" minH="500px">
            <Heading size="md" mb={4} color={titleCardColor}>
              Riwayat Jurnal
            </Heading>

            {isFetching ? (
              <VStack gap={4}>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} height="100px" w="full" rounded="md" />
                ))}
              </VStack>
            ) : historyJournals.length > 0 ? (
              <VStack gap={4} align="stretch" maxH="600px" overflowY="auto" pr={2}>
                {historyJournals.map((journal) => {
                  const isSelected = displayJournal?.id === journal.id;
                  return (
                    <Card.Root
                      key={journal.id}
                      variant={isSelected ? 'elevated' : 'outline'}
                      bg={isSelected ? cardBgGreen : cardBg}
                      borderColor={isSelected ? borderColorGreen : borderColor}
                      borderWidth={isSelected ? '2px' : '1px'}
                      _hover={{ borderColor: 'green.400', cursor: 'pointer' }}
                      transition="all 0.2s"
                      onClick={() => setSelectedJournal(journal)}
                    >
                      <Card.Body p={4}>
                        <Flex justify="space-between" mb={2}>
                          <Badge colorPalette={isSelected ? 'green' : 'gray'} variant="surface">
                            {journal.mood}
                          </Badge>
                          <Text fontSize="xs" color="gray.400">
                            {new Date(journal.entry_date).toLocaleDateString('id-ID', {
                              dateStyle: 'medium',
                            })}
                          </Text>
                        </Flex>
                        <Text lineClamp={2} fontSize="sm" fontWeight={isSelected ? 'medium' : 'normal'}>
                          {journal.content}
                        </Text>
                      </Card.Body>
                    </Card.Root>
                  );
                })}
              </VStack>
            ) : (
              <Flex direction="column" align="center" justify="center" h="300px" color="gray.400">
                <Text>Belum ada riwayat jurnal.</Text>
              </Flex>
            )}
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
}
