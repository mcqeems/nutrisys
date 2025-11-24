'use client';

import { useState, useActionState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
  Tabs,
  Image as ChakraImage,
  Card,
  Grid,
  Dialog,
  Badge,
  Skeleton,
} from '@chakra-ui/react';
import { UploadCloudIcon, FileTextIcon, CameraIcon, ScanSearchIcon, ClockIcon } from 'lucide-react';
import { analyzeFood, AnalyzeState } from '../actions/actions';
import HistorySection from './HistorySection';
import AnalysisResult from './AnalysisResult';
import { NutritionData, FoodLog } from '../types/types';

const initialState: AnalyzeState = {
  success: false,
  error: null,
  data: null,
};

export default function AnalyzePage() {
  const [inputType, setInputType] = useState<'image' | 'text'>('image');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [foods, setFoods] = useState<FoodLog[]>([]);
  const [foodsLoading, setFoodsLoading] = useState(true);
  const [state, formAction, isPending] = useActionState(analyzeFood, initialState);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<FoodLog | null>(null);

  useEffect(() => {
    async function fetchFoodLogs(): Promise<void> {
      try {
        const response = await fetch('/api/food');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFoods(data.data || []);
        setFoodsLoading(false);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }
    fetchFoodLogs();
  }, [state.success]); // Refresh when new analysis is successful

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <Container maxW="full" py={8}>
      <VStack gap={8} align="stretch">
        <Box textAlign="center">
          <Heading size="2xl" mb={2} color="green.600">
            Smart Food Analyzer
          </Heading>
          <Text color="gray.500">
            Upload foto atau deskripsikan makanan Anda untuk mendapatkan analisis nutrisi lengkap dari AI.
          </Text>
        </Box>

        <Card.Root variant="elevated">
          <Card.Body>
            <Tabs.Root
              value={inputType}
              onValueChange={(e) => setInputType(e.value as 'image' | 'text')}
              variant="enclosed"
              fitted
            >
              <Tabs.List mb={4}>
                <Tabs.Trigger value="image">
                  <CameraIcon size={18} style={{ marginRight: '8px' }} />
                  Upload Foto
                </Tabs.Trigger>
                <Tabs.Trigger value="text">
                  <FileTextIcon size={18} style={{ marginRight: '8px' }} />
                  Input Teks
                </Tabs.Trigger>
              </Tabs.List>

              <form action={formAction}>
                <input type="hidden" name="inputType" value={inputType} />

                <Tabs.Content value="image">
                  <VStack gap={6}>
                    <Box
                      border="2px dashed"
                      borderColor="gray.300"
                      rounded="xl"
                      p={10}
                      w="full"
                      textAlign="center"
                      bg="gray.50"
                      _hover={{ borderColor: 'green.400', bg: 'green.50' }}
                      transition="all 0.2s"
                      position="relative"
                    >
                      <Input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        opacity={0}
                        position="absolute"
                        top={0}
                        left={0}
                        w="full"
                        h="full"
                        cursor="pointer"
                        zIndex={1}
                      />

                      {previewUrl ? (
                        <VStack>
                          <ChakraImage src={previewUrl} maxH="300px" objectFit="contain" rounded="md" shadow="md" />
                          <Text fontSize="sm" color="gray.500">
                            Klik untuk ganti foto
                          </Text>
                        </VStack>
                      ) : (
                        <VStack gap={2}>
                          <UploadCloudIcon size={48} color="#48BB78" />
                          <Text fontWeight="bold">Klik atau drag foto makanan di sini</Text>
                          <Text fontSize="sm" color="gray.500">
                            Support JPG, PNG, WEBP (Max 2MB)
                          </Text>
                        </VStack>
                      )}
                    </Box>

                    <Button
                      type="submit"
                      colorPalette="green"
                      size="lg"
                      w="full"
                      loading={isPending}
                      loadingText="Menganalisis..."
                      disabled={!previewUrl}
                    >
                      <ScanSearchIcon /> Analisis Foto
                    </Button>
                  </VStack>
                </Tabs.Content>

                <Tabs.Content value="text">
                  <VStack gap={6}>
                    <Textarea
                      name="text"
                      placeholder="Contoh: Nasi goreng dengan telur mata sapi, 2 tusuk sate ayam, dan kerupuk udang..."
                      rows={6}
                      size="lg"
                      p={4}
                    />
                    <Button
                      type="submit"
                      colorPalette="green"
                      size="lg"
                      w="full"
                      loading={isPending}
                      loadingText="Menganalisis..."
                    >
                      <ScanSearchIcon /> Analisis Teks
                    </Button>
                  </VStack>
                </Tabs.Content>
              </form>
            </Tabs.Root>
          </Card.Body>
        </Card.Root>

        {!!state.data && (
          <VStack gap={8} align="stretch" animation="fade-in 0.5s">
            <Heading size="lg" color="green.700">
              Hasil Analisis Baru
            </Heading>
            <AnalysisResult data={state.data as NutritionData} />
          </VStack>
        )}

        {/* History Section */}
        {foods && foods.length > 0 ? (
          <HistorySection
            foods={foods}
            onViewAll={() => setIsHistoryOpen(true)}
            onSelect={(log) => setSelectedLog(log)}
          />
        ) : (
          foodsLoading && <Skeleton height="200px" />
        )}

        {state.error && (
          <Box p={4} bg="red.100" color="red.700" rounded="md">
            <Text fontWeight="bold">Error:</Text>
            <Text>{state.error}</Text>
          </Box>
        )}
      </VStack>

      {/* History Modal */}
      <Dialog.Root
        open={isHistoryOpen}
        onOpenChange={(e) => setIsHistoryOpen(e.open)}
        size="xl"
        scrollBehavior="inside"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="4xl" maxH="85vh">
            <Dialog.Header>
              <Dialog.Title>Riwayat Analisis Makanan</Dialog.Title>
              <Dialog.CloseTrigger />
            </Dialog.Header>
            <Dialog.Body>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
                {foods.map((log) => (
                  <Card.Root
                    key={log.id}
                    cursor="pointer"
                    onClick={() => {
                      setSelectedLog(log);
                      // Optional: Keep history open or close it?
                      // Let's keep it open so user can go back easily, but the detail modal will overlay it.
                    }}
                    _hover={{ shadow: 'md', borderColor: 'green.400' }}
                    transition="all 0.2s"
                  >
                    <ChakraImage
                      src={log.image_url || '/food_mockup.webp'}
                      h="150px"
                      w="full"
                      objectFit="cover"
                      borderTopRadius="md"
                    />
                    <Card.Body p={4}>
                      <VStack align="start" gap={2}>
                        <Heading size="sm" lineClamp={1}>
                          {log.description.food_name}
                        </Heading>
                        <Flex align="center" gap={2} color="gray.500" fontSize="xs">
                          <ClockIcon size={12} />
                          <Text>
                            {new Date(log.log_date).toLocaleDateString('id-ID', {
                              dateStyle: 'medium',
                            })}
                          </Text>
                        </Flex>
                        <Badge colorPalette="green" variant="surface">
                          {log.description.nutritional_facts.calories} kkal
                        </Badge>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                ))}
              </Grid>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      {/* Detail Modal */}
      <Dialog.Root
        open={!!selectedLog}
        onOpenChange={(e) => !e.open && setSelectedLog(null)}
        size="xl"
        scrollBehavior="inside"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="5xl" maxH="90vh">
            <Dialog.Body p={0}>
              {selectedLog && (
                <Box p={6}>
                  {selectedLog.image_url && (
                    <Box mb={6} display="flex" justifyContent="center">
                      <ChakraImage
                        src={selectedLog.image_url}
                        maxH="300px"
                        objectFit="contain"
                        rounded="lg"
                        shadow="md"
                      />
                    </Box>
                  )}
                  <AnalysisResult data={selectedLog.description} />
                </Box>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Container>
  );
}
