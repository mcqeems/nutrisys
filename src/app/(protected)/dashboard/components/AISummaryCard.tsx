'use client';

import { Box, Text, Button } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Sparkles } from 'lucide-react';

interface AISummaryCardProps {
  summary: string | null;
  onGenerate: () => void;
  isLoading?: boolean;
}

export default function AISummaryCard({ summary, onGenerate, isLoading }: AISummaryCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  const summaryBg = useColorModeValue('green.50', 'green.900');

  return (
    <Box bg={cardBg} borderRadius="xl" border="1px solid" borderColor={borderColor} p={6}>
      <Text fontWeight="semibold" mb={1}>
        Rangkuman AI
      </Text>
      <Text fontSize="sm" color={mutedColor} mb={4}>
        Dapatkan rangkuman AI lengkap untuk semua aktivitas anda di Nutrisys!
      </Text>

      <Box bg={summaryBg} p={4} borderRadius="md" minH="100px" mb={4} border="2px dashed" borderColor={borderColor}>
        {summary ? (
          <Text fontSize="sm">{summary}</Text>
        ) : (
          <Text fontSize="sm" color={mutedColor} textAlign="center" py={4}>
            Belum ada rangkuman. Klik tombol dibawah untuk memulai.
          </Text>
        )}
      </Box>

      <Box textAlign="center">
        <Button colorPalette="green" onClick={onGenerate} loading={isLoading}>
          <Sparkles size={16} /> Mulai
        </Button>
      </Box>
    </Box>
  );
}
