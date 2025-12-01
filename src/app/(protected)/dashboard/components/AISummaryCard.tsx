'use client';

import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Sparkles, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useRef, useEffect } from 'react';

interface AISummaryCardProps {
  summary: string | null;
  generatedAt?: Date | null;
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

export default function AISummaryCard({ summary, generatedAt, onGenerate, isLoading, userInfo }: AISummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const MAX_HEIGHT = 300; // Maximum height in pixels before showing "Read more"

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  const summaryBg = useColorModeValue('green.50', 'green.900');
  const warningBg = useColorModeValue('yellow.50', 'yellow.900');
  const warningBorder = useColorModeValue('yellow.400', 'yellow.600');
  const warningText = useColorModeValue('yellow.800', 'yellow.200');
  const headingColor = useColorModeValue('green.700', 'green.300');
  const linkColor = useColorModeValue('blue.600', 'blue.300');
  const fadeGradient = useColorModeValue('linear(to-t, green.50, transparent)', 'linear(to-t, green.900, transparent)');

  // Check if content exceeds max height and measure full height
  useEffect(() => {
    if (contentRef.current && summary) {
      const fullHeight = contentRef.current.scrollHeight;
      setContentHeight(fullHeight);
      setShowExpandButton(fullHeight > MAX_HEIGHT);
    }
  }, [summary]);

  // Check if user info is incomplete
  const isUserInfoIncomplete =
    !userInfo || !userInfo.gender || !userInfo.height || !userInfo.weight || !userInfo.blood_type;

  // Format generated date
  const formattedDate = generatedAt
    ? new Date(generatedAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <Box bg={cardBg} borderRadius="xl" border="1px solid" borderColor={borderColor} p={6}>
      <Flex direction="row" justifyContent="space-between" alignItems="flex-start" mb={4}>
        <Box>
          <Text fontWeight="semibold" mb={1}>
            Rangkuman AI
          </Text>
          <Text fontSize="sm" color={mutedColor}>
            Dapatkan rangkuman AI lengkap untuk semua aktivitas anda di Nutrisys!
          </Text>
        </Box>
        {formattedDate && (
          <Text fontSize="xs" color={mutedColor} whiteSpace="nowrap">
            Terakhir: {formattedDate}
          </Text>
        )}
      </Flex>

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

      <Box
        bg={summaryBg}
        p={4}
        borderRadius="md"
        minH="100px"
        mb={4}
        border="2px dashed"
        borderColor={borderColor}
        position="relative"
      >
        {summary ? (
          <>
            <Box
              ref={contentRef}
              fontSize="sm"
              lineHeight="tall"
              maxH={isExpanded ? `${contentHeight}px` : `${MAX_HEIGHT}px`}
              overflow="hidden"
              transition="max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
              css={{
                '& h2': {
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: headingColor,
                  marginTop: '0.5rem',
                  marginBottom: '0.75rem',
                },
                '& h3': {
                  fontSize: '1rem',
                  fontWeight: 'semibold',
                  color: headingColor,
                  marginTop: '1rem',
                  marginBottom: '0.5rem',
                },
                '& p': {
                  marginBottom: '0.5rem',
                },
                '& ul, & ol': {
                  paddingLeft: '1.5rem',
                  marginBottom: '0.75rem',
                },
                '& li': {
                  marginBottom: '0.25rem',
                },
                '& strong': {
                  fontWeight: 'bold',
                },
                '& em': {
                  fontStyle: 'italic',
                  color: mutedColor,
                },
                '& hr': {
                  marginTop: '1rem',
                  marginBottom: '0.5rem',
                  borderColor: borderColor,
                },
                '& a': {
                  color: linkColor,
                  textDecoration: 'underline',
                },
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
            </Box>

            {/* Gradient fade overlay when collapsed */}
            {showExpandButton && (
              <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                h="60px"
                bgGradient={fadeGradient}
                pointerEvents="none"
                borderBottomRadius="md"
                opacity={isExpanded ? 0 : 1}
                transition="opacity 0.3s ease-in-out"
              />
            )}

            {/* Expand/Collapse button */}
            {showExpandButton && (
              <Flex justify="center" mt={isExpanded ? 3 : 0} position="relative" zIndex={1}>
                <Button
                  size="sm"
                  variant="ghost"
                  colorPalette="green"
                  onClick={() => setIsExpanded(!isExpanded)}
                  transition="all 0.2s"
                  _hover={{ transform: 'translateY(2px)' }}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp size={16} />
                      Sembunyikan
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      Baca Selengkapnya
                    </>
                  )}
                </Button>
              </Flex>
            )}
          </>
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
