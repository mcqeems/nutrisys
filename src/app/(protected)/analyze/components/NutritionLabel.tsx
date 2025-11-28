import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { NutritionData } from '../types/types';

export default function NutritionLabel({ data }: { data: NutritionData }) {
  const { nutritional_facts, portion_size } = data;
  const { macronutrients, micronutrients, calories } = nutritional_facts;

  return (
    <Box
      border="1px solid"
      borderColor="gray.400"
      bg="white"
      color="black"
      fontFamily="Helvetica, Arial, sans-serif"
      w="full"
    >
      <Flex direction={{ base: 'column', xl: 'row' }}>
        {/* Left Header Section */}
        <Box
          flex={{ base: '1', xl: '0 0 320px' }}
          p={4}
          borderRight={{ base: 'none', xl: '1px solid black' }}
          borderBottom={{ base: '1px solid black', xl: 'none' }}
        >
          <Heading size="3xl" fontWeight="900" lineHeight="0.8" mb={6} letterSpacing="-2px">
            Informasi Nilai Gizi
          </Heading>

          <Box borderBottom="1px solid black" pb={2} mb={2}>
            <Flex justify="space-between" align="baseline">
              <Text fontWeight="bold" fontSize="xl">
                Takaran Saji
              </Text>
              <Text fontWeight="bold" fontSize="xl">
                {portion_size.amount} {portion_size.unit}
              </Text>
            </Flex>
          </Box>

          <Box borderBottom="10px solid black" pb={4} mb={4} spaceY="2">
            <Text fontWeight="bold" fontSize="md">
              Jumlah Per Sajian
            </Text>
            <Flex direction="row" justifyContent="space-between" align="baseline" gap={2}>
              <Text fontWeight="900" fontSize="xl">
                Energi Total:
              </Text>
              <Text fontWeight="900" fontSize="xl">
                {calories} kkal
              </Text>
            </Flex>
          </Box>

          <Text fontSize="xs" color="gray.600">
            * Persen Angka Kecukupan Gizi (AKG) berdasarkan kebutuhan energi 2150 kkal. Kebutuhan energi anda mungkin
            lebih tinggi atau lebih rendah.
          </Text>
        </Box>

        {/* Right Nutrient Columns */}
        <Flex flex="1" direction={{ base: 'column', md: 'row' }}>
          {/* Column 1: Macros */}
          <Box flex="1" p={4} borderRight={{ base: 'none', md: '1px solid black' }}>
            <Text textAlign="right" fontSize="xs" fontWeight="bold" borderBottom="1px solid black" mb={2} pb={1}>
              % AKG*
            </Text>
            <VStack align="stretch" gap={0}>
              <NutrientRow label="Lemak Total" value={`${macronutrients.fat}g`} isBold withBorder />
              <NutrientRow label="Kolesterol" value={`${micronutrients.cholesterol}mg`} isBold withBorder />
              <NutrientRow label="Natrium" value={`${micronutrients.sodium}mg`} isBold withBorder />
              <NutrientRow label="Karbohidrat Total" value={`${macronutrients.carbohydrates}g`} isBold withBorder />
              <NutrientRow label="Serat Pangan" value={`${micronutrients.fiber}g`} indent withBorder />
              <NutrientRow label="Gula Total" value={`${micronutrients.sugar}g`} indent withBorder />
              <NutrientRow label="Protein" value={`${macronutrients.protein}g`} isBold withBorder />
            </VStack>
          </Box>

          {/* Column 2: Micros */}
          <Box flex="1" p={4}>
            <Text textAlign="right" fontSize="xs" fontWeight="bold" borderBottom="1px solid black" mb={2} pb={1}>
              % AKG*
            </Text>
            <VStack align="stretch" gap={0}>
              {Object.entries(micronutrients.vitamins).map(([key, value]) => (
                <NutrientRow key={key} label={formatLabel(key)} value={`${value}${getUnit(key)}`} withBorder />
              ))}
              {Object.entries(micronutrients.minerals).map(([key, value]) => (
                <NutrientRow key={key} label={formatLabel(key)} value={`${value}${getUnit(key)}`} withBorder />
              ))}
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

function NutrientRow({
  label,
  value,
  isBold,
  indent,
  withBorder,
}: {
  label: string;
  value: string;
  isBold?: boolean;
  indent?: boolean;
  withBorder?: boolean;
}) {
  return (
    <Flex
      justify="space-between"
      py={1}
      borderBottom={withBorder ? '1px solid' : 'none'}
      borderColor="gray.300"
      ml={indent ? 6 : 0}
    >
      <Text fontWeight={isBold ? '800' : 'normal'}>{label}</Text>
      <Text fontWeight={isBold ? '800' : 'normal'}>{value}</Text>
    </Flex>
  );
}

function formatLabel(key: string) {
  const translations: Record<string, string> = {
    vitamin_a: 'Vitamin A',
    vitamin_c: 'Vitamin C',
    vitamin_d: 'Vitamin D',
    vitamin_e: 'Vitamin E',
    vitamin_k: 'Vitamin K',
    vitamin_b1: 'Vitamin B1',
    vitamin_b2: 'Vitamin B2',
    vitamin_b3: 'Vitamin B3',
    vitamin_b6: 'Vitamin B6',
    vitamin_b12: 'Vitamin B12',
    calcium: 'Kalsium',
    iron: 'Zat Besi',
    magnesium: 'Magnesium',
    potassium: 'Kalium',
    sodium: 'Natrium',
    zinc: 'Seng',
    phosphorus: 'Fosfor',
    iodine: 'Yodium',
  };

  const lowerKey = key.toLowerCase();
  if (translations[lowerKey]) {
    return translations[lowerKey];
  }

  return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

function getUnit(key: string) {
  const k = key.toLowerCase();
  if (k.includes('vitamin_a') || k.includes('b12')) return 'mcg';
  if (k.includes('vitamin_d')) return 'IU';
  return 'mg';
}
