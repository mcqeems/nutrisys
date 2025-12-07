import { Card, VStack, Flex, Box, Text, Separator, Heading } from '@chakra-ui/react';
import NutritionLabel from './NutritionLabel';
import { NutritionData } from '../types/types';

export default function AnalysisResult({ data }: { data: NutritionData }) {
  return (
    <Card.Root variant="elevated" overflow="hidden" bg="white">
      <Card.Body p={{ base: 4, md: 8 }}>
        <VStack align="stretch" gap={8}>
          {/* Header */}
          <Box>
            <Flex justify="space-between" align="start" wrap="wrap" gap={4}>
              <Box>
                <Heading size="3xl" mb={2} color="green.800">
                  {data.food_name}
                </Heading>
                <Text fontSize="xl" color="gray.400" fontWeight="medium">
                  {data.origin}
                </Text>
              </Box>
            </Flex>
            <Text mt={6} fontSize="lg" lineHeight="relaxed" color="gray.700">
              {data.description}
            </Text>
          </Box>

          <Separator borderColor="gray.200" />

          {/* Main Content Grid */}
          <VStack gap={10} align="stretch">
            {/* Top: Nutrition Label (Horizontal) */}
            <Box w="full">
              <NutritionLabel data={data} />
            </Box>

            <Separator borderColor="gray.200" />

            {/* Bottom: Health Analysis (3 Columns) */}
            <Box>
              <Heading size="lg" color="green.700" mb={6}>
                Analisis Kesehatan
              </Heading>
              <Flex direction="column" gap="4">
                <InfoBox title="Ringkasan Nutrisi" content={data.health_analysis.summary} icon="🥗" />
                <InfoBox
                  title="Direkomendasikan Untuk"
                  content={data.health_analysis.recommended_for}
                  icon="✅"
                  colorScheme="blue"
                />
                <InfoBox title="Peringatan Kesehatan" content={data.health_analysis.cautions} isWarning icon="⚠️" />
                {data.health_analysis.reference && (
                  <InfoBox title="Referensi" content={data.health_analysis.reference} icon="📚" colorScheme="purple" />
                )}
              </Flex>
            </Box>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}

function InfoBox({
  title,
  content,
  isWarning = false,
  icon,
  colorScheme = 'green',
}: {
  title: string;
  content: string;
  isWarning?: boolean;
  icon?: string;
  colorScheme?: string;
}) {
  const bgColor = isWarning ? 'orange.50' : `${colorScheme}.50`;
  const borderColor = isWarning ? 'orange.400' : `${colorScheme}.400`;
  const titleColor = isWarning ? 'orange.800' : `${colorScheme}.800`;

  return (
    <Box p={5} bg={bgColor} rounded="lg" borderLeft="4px solid" borderColor={borderColor} shadow="sm">
      <Flex align="center" gap={2} mb={2}>
        {icon && <Text fontSize="xl">{icon}</Text>}
        <Text fontWeight="bold" fontSize="lg" color={titleColor}>
          {title}
        </Text>
      </Flex>
      <Text fontSize="md" color="gray.700" lineHeight="tall">
        {content}
      </Text>
    </Box>
  );
}
