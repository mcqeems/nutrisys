'use client';

import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Sparkles, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface AISummaryCardProps {
  summary: string | null;
  onGenerate: () => void;
  isLoading?: boolean;
  userInfo?: {
    gender?: string;
    blood_type?: string;
    height?: number;
    weight?: number;
    food_allergy?: string;
    medical_history?: string;
  } | null;
}

export default function AISummaryCard({ summary, onGenerate, isLoading, userInfo }: AISummaryCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  const summaryBg = useColorModeValue('green.50', 'green.900');
  const warningBg = useColorModeValue('yellow.50', 'yellow.900');
  const warningBorder = useColorModeValue('yellow.400', 'yellow.600');
  const warningText = useColorModeValue('yellow.800', 'yellow.200');

  // Check if user info is incomplete
  const isUserInfoIncomplete =
    !userInfo || !userInfo.gender || !userInfo.height || !userInfo.weight || !userInfo.blood_type;

  return (
    <Box bg={cardBg} borderRadius="xl" border="1px solid" borderColor={borderColor} p={6}>
      <Text fontWeight="semibold" mb={1}>
        Rangkuman AI
      </Text>
      <Text fontSize="sm" color={mutedColor} mb={4}>
        Dapatkan rangkuman AI lengkap untuk semua aktivitas anda di Nutrisys!
      </Text>

      {/* Warning if user info is incomplete */}
      {isUserInfoIncomplete && (
        <Box bg={warningBg} border="1px solid" borderColor={warningBorder} borderRadius="md" p={4} mb={4}>
          <Flex align="center" gap={3}>
            <AlertTriangle size={20} color="var(--chakra-colors-yellow-500)" />
            <Box flex={1}>
              <Text fontWeight="medium" color={warningText} fontSize="sm">
                Data profil anda belum lengkap
              </Text>
              <Text fontSize="xs" color={mutedColor}>
                Lengkapi data profil Anda untuk memaksimalkan analisis dan rangkuman AI.
              </Text>
            </Box>
            <Link href="/user">
              <Button size="sm" colorPalette="yellow" variant="solid">
                Lengkapi Profil
              </Button>
            </Link>
          </Flex>
        </Box>
      )}

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
        <Button colorPalette={summary ? 'blue' : 'green'} onClick={onGenerate} loading={isLoading}>
          <Sparkles size={16} />
          {summary ? 'Refresh' : 'Mulai'}
        </Button>
      </Box>
    </Box>
  );
}
