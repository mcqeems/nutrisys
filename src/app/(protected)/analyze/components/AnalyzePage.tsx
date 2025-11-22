'use client';

import { useState, useActionState } from 'react';
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
  Badge,
  Grid,
  Separator,
} from '@chakra-ui/react';
import { UploadCloudIcon, FileTextIcon, CameraIcon, ScanSearchIcon } from 'lucide-react';
import { analyzeFood, AnalyzeState } from '../actions';

// Define types for the response
interface NutritionData {
  food_name: string;
  description: string;
  origin: string;
  portion_size: {
    amount: number;
    unit: string;
  };
  nutritional_facts: {
    calories: number;
    macronutrients: {
      carbohydrates: number;
      protein: number;
      fat: number;
    };
    micronutrients: {
      fiber: number;
      sugar: number;
      sodium: number;
      cholesterol: number;
      vitamins: Record<string, number>;
      minerals: Record<string, number>;
    };
  };
  health_analysis: {
    summary: string;
    recommended_for: string;
    cautions: string;
  };
}

const initialState: AnalyzeState = {
  success: false,
  error: null,
  data: null,
};

export default function AnalyzePage() {
  const [inputType, setInputType] = useState<'image' | 'text'>('image');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState(analyzeFood, initialState);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <Container maxW="4xl" py={8}>
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

        {state.error && (
          <Box p={4} bg="red.100" color="red.700" rounded="md">
            <Text fontWeight="bold">Error:</Text>
            <Text>{state.error}</Text>
          </Box>
        )}

        {state.data && (
          <VStack gap={6} align="stretch" animation="fade-in 0.5s">
            <Heading size="lg" color="green.700">
              Hasil Analisis
            </Heading>

            <Card.Root variant="outline" borderColor="green.200" overflow="hidden">
              <Box bg="green.50" p={4} borderBottomWidth="1px" borderColor="green.200">
                <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
                  <Box>
                    <Heading size="xl" color="green.800">
                      {(state.data as NutritionData).food_name}
                    </Heading>
                    <Text color="gray.600">{(state.data as NutritionData).origin}</Text>
                  </Box>
                  <Badge colorPalette="green" size="lg" variant="solid">
                    {(state.data as NutritionData).nutritional_facts.calories} kkal
                  </Badge>
                </Flex>
              </Box>
              <Card.Body>
                <Text mb={6} fontSize="lg">
                  {(state.data as NutritionData).description}
                </Text>

                <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} mb={6}>
                  <StatBox
                    label="Karbohidrat"
                    value={`${(state.data as NutritionData).nutritional_facts.macronutrients.carbohydrates}g`}
                    color="blue"
                  />
                  <StatBox
                    label="Protein"
                    value={`${(state.data as NutritionData).nutritional_facts.macronutrients.protein}g`}
                    color="green"
                  />
                  <StatBox
                    label="Lemak"
                    value={`${(state.data as NutritionData).nutritional_facts.macronutrients.fat}g`}
                    color="orange"
                  />
                </Grid>

                <Separator my={4} />

                <Heading size="md" mb={3}>
                  Analisis Kesehatan
                </Heading>
                <VStack align="stretch" gap={3}>
                  <InfoBox title="Ringkasan" content={(state.data as NutritionData).health_analysis.summary} />
                  <InfoBox
                    title="Direkomendasikan Untuk"
                    content={(state.data as NutritionData).health_analysis.recommended_for}
                  />
                  <InfoBox
                    title="Peringatan"
                    content={(state.data as NutritionData).health_analysis.cautions}
                    isWarning
                  />
                </VStack>
              </Card.Body>
            </Card.Root>
          </VStack>
        )}
      </VStack>
    </Container>
  );
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <Box p={3} bg={`${color}.50`} rounded="lg" textAlign="center" border="1px solid" borderColor={`${color}.200`}>
      <Text fontSize="sm" color="gray.600">
        {label}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" color={`${color}.600`}>
        {value}
      </Text>
    </Box>
  );
}

function InfoBox({ title, content, isWarning = false }: { title: string; content: string; isWarning?: boolean }) {
  return (
    <Box
      p={3}
      bg={isWarning ? 'orange.50' : 'gray.50'}
      rounded="md"
      borderLeft="4px solid"
      borderColor={isWarning ? 'orange.400' : 'green.400'}
    >
      <Text fontWeight="bold" mb={1} color={isWarning ? 'orange.700' : 'gray.700'}>
        {title}
      </Text>
      <Text fontSize="sm" color="gray.700">
        {content}
      </Text>
    </Box>
  );
}
