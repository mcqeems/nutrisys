'use client';

import {
  Badge,
  Button,
  Flex,
  Heading,
  IconButton,
  VStack,
  Card,
  Text,
  Image as ChakraImage,
  Box,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, HistoryIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FoodLog } from '../types/types';

export default function HistorySection({
  foods,
  onViewAll,
  onSelect,
}: {
  foods: FoodLog[];
  onViewAll: () => void;
  onSelect: (log: FoodLog) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 10);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [foods]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
      // Wait for scroll to finish roughly
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <VStack align="stretch" gap={4} position="relative">
      <Flex justify="space-between" align="center">
        <Heading size="md" color="gray.600" display="flex" alignItems="center" gap={2}>
          <HistoryIcon size={20} /> Riwayat Terakhir
        </Heading>
      </Flex>

      <Box position="relative" mx={-2} px={2}>
        {showLeft && (
          <IconButton
            onClick={() => scroll('left')}
            position="absolute"
            left={0}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            variant="surface"
            shadow="md"
            bg="white"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon />
          </IconButton>
        )}

        <Flex
          ref={scrollRef}
          overflowX="auto"
          gap={4}
          pb={4}
          onScroll={checkScroll}
          css={{
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          {foods.slice(0, 10).map((log) => (
            <Card.Root
              key={log.id}
              minW="280px"
              maxW="280px"
              cursor="pointer"
              onClick={() => onSelect(log)}
              _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
              flexShrink={0}
            >
              <ChakraImage
                src={log.image_url || '/food_mockup.webp'}
                h="140px"
                w="full"
                objectFit="cover"
                borderTopRadius="md"
              />
              <Card.Body p={3}>
                <VStack align="start" gap={1}>
                  <Heading size="sm" lineClamp={1}>
                    {log.description.food_name}
                  </Heading>
                  <Text fontSize="xs" color="gray.500">
                    {new Date(log.log_date).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                  </Text>
                  <Badge size="sm" colorPalette="green" variant="surface">
                    {log.description.nutritional_facts.calories} kkal
                  </Badge>
                </VStack>
              </Card.Body>
            </Card.Root>
          ))}
        </Flex>

        {showRight && (
          <IconButton
            onClick={() => scroll('right')}
            position="absolute"
            right={0}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            variant="surface"
            shadow="md"
            bg="white"
            aria-label="Scroll right"
          >
            <ChevronRightIcon />
          </IconButton>
        )}
      </Box>

      <Button variant="surface" colorPalette="white" onClick={onViewAll} alignSelf="center" size="sm">
        Lihat semua riwayat
      </Button>
    </VStack>
  );
}
