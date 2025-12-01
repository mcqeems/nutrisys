'use client';

import { Box, Text, Heading, IconButton } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { ExternalLinkIcon, LucideIcon } from 'lucide-react';
import RandomAnimation from '../../analyze/components/RandomAnimation';
import Chatbot from '../../chatbot/components/Chatbot';
import Book from '../../journal/components/Book';
import TargetAnimation from '../../target/components/Target';
import Link from 'next/link';

interface StatsCardProps {
  title: string;
  label: string;
  count: number;
  icon: LucideIcon;
  background: 'analyze' | 'chatbot' | 'journal' | 'target';
  link: string;
}

export default function StatsCard({ title, label, count, icon: Icon, background, link }: StatsCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  const iconBg = useColorModeValue('green.200', 'green.700');

  const renderBackground = () => {
    switch (background) {
      case 'analyze':
        return <RandomAnimation />;
      case 'chatbot':
        return <Chatbot />;
      case 'journal':
        return <Book loop={true} />;
      case 'target':
        return <TargetAnimation loop={true} />;
      default:
        return null;
    }
  };

  return (
    <Box
      bg={cardBg}
      borderRadius="xl"
      border="1px solid"
      borderColor={borderColor}
      p={5}
      position="relative"
      overflow="hidden"
    >
      {/* Background Lottie Animation */}
      <Box position="absolute" bottom="5px" left="5px" width="100px" opacity={0.3} zIndex={0} pointerEvents="none">
        {renderBackground()}
      </Box>

      {/* Content */}
      <Box position="relative" zIndex={1}>
        <Box display="flex" alignItems="stretch" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={3} mb={10}>
            <Box bg={iconBg} p={2} borderRadius="lg">
              <Icon size={20} />
            </Box>
            <Text fontWeight="semibold" fontSize="sm">
              {title}
            </Text>
          </Box>
          <Link href={link}>
            <IconButton size="sm" variant="outline">
              <ExternalLinkIcon />
            </IconButton>
          </Link>
        </Box>

        <Text textAlign="end" fontSize="sm" color={mutedColor}>
          {label}
        </Text>
        <Heading textAlign="end" size="3xl">
          {count}
        </Heading>
      </Box>
    </Box>
  );
}
