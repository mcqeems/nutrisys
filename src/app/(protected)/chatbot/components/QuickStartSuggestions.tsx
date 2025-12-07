'use client';

import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Apple, Activity, HelpCircle, Sparkles, Heart, Dumbbell, Moon, Droplets } from 'lucide-react';

const quickStartSuggestions = [
  {
    icon: Apple,
    label: 'Nutrisi Sehat',
    prompt: 'Apa saja makanan yang kaya akan nutrisi untuk diet seimbang?',
  },
  {
    icon: Activity,
    label: 'Tips Kesehatan',
    prompt: 'Berikan tips untuk menjaga kesehatan tubuh sehari-hari',
  },
  {
    icon: HelpCircle,
    label: 'Tentang NutriSys',
    prompt: 'Apa itu NutriSys dan fitur apa saja yang tersedia?',
  },
  {
    icon: Sparkles,
    label: 'Rekomendasi Diet',
    prompt: 'Rekomendasikan pola makan sehat untuk menurunkan berat badan',
  },
  {
    icon: Heart,
    label: 'Kesehatan Jantung',
    prompt: 'Makanan apa yang baik untuk menjaga kesehatan jantung?',
  },
  {
    icon: Dumbbell,
    label: 'Nutrisi Olahraga',
    prompt: 'Apa yang sebaiknya dimakan sebelum dan sesudah berolahraga?',
  },
  {
    icon: Moon,
    label: 'Tidur Berkualitas',
    prompt: 'Makanan apa yang membantu meningkatkan kualitas tidur?',
  },
  {
    icon: Droplets,
    label: 'Hidrasi Tubuh',
    prompt: 'Berapa banyak air yang harus diminum setiap hari dan tips hidrasi?',
  },
];

interface QuickStartSuggestionsProps {
  onSuggestionClick: (prompt: string) => void;
}

export const QuickStartSuggestions = ({ onSuggestionClick }: QuickStartSuggestionsProps) => {
  const glassBg = useColorModeValue('rgba(255, 255, 255, 0.6)', 'rgba(26, 32, 44, 0.8)');
  const glassBorder = useColorModeValue('whiteAlpha.400', 'whiteAlpha.100');
  const quickStartBorder = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box position="absolute" bottom="90px" left={4} right={4} zIndex={10}>
      <Box
        bg={glassBg}
        display={{ base: 'none', lg: 'block' }}
        backdropFilter="blur(16px)"
        border="1px solid"
        borderColor={glassBorder}
        rounded="2xl"
        p={4}
        shadow="sm"
      >
        <Flex gap={2} flexWrap="wrap" justifyContent="center">
          {quickStartSuggestions.map((suggestion, index) => (
            <Button
              key={index}
              size="sm"
              onClick={() => onSuggestionClick(suggestion.prompt)}
              bg={glassBg}
              border="1px solid"
              borderColor={quickStartBorder}
              color={textColor}
              rounded="full"
              px={4}
              py={2}
              _hover={{
                bg: 'green.500',
                color: 'white',
                borderColor: 'green.500',
                transform: 'translateY(-2px)',
                shadow: 'md',
              }}
              transition="all 0.2s"
            >
              <suggestion.icon size={14} />
              <Text ml={2} fontSize="xs" fontWeight="medium">
                {suggestion.label}
              </Text>
            </Button>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
