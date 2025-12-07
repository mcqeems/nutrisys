'use client';

import { Box, Flex, HStack, VStack, Text, IconButton } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { BotIcon, Trash2Icon } from 'lucide-react';

interface ChatHeaderProps {
  onReset: () => void;
  hasMessages: boolean;
}

export const ChatHeader = ({ onReset, hasMessages }: ChatHeaderProps) => {
  const glassBg = useColorModeValue('rgba(255, 255, 255, 0.6)', 'rgba(26, 32, 44, 0.8)');
  const glassBorder = useColorModeValue('whiteAlpha.400', 'whiteAlpha.100');
  const textColor = useColorModeValue('gray.800', 'white');
  const onlineColor = useColorModeValue('green.600', 'green.300');
  const redTrash = useColorModeValue('red.300', 'red.700');
  const redTrashColor = useColorModeValue('red.700', 'red.300');
  const redTrashHover = useColorModeValue('red.200', 'red.800');

  return (
    <Box position="absolute" top={4} left={4} right={4} zIndex={10}>
      <Flex
        justify="space-between"
        align="center"
        p={3}
        bg={glassBg}
        backdropFilter="blur(16px)"
        border="1px solid"
        borderColor={glassBorder}
        rounded="3xl"
        shadow="sm"
      >
        <HStack gap={3}>
          <Box position="relative">
            <BotIcon size={24} />
            <Box
              position="absolute"
              bottom={-1}
              right={-1}
              w={2.5}
              h={2.5}
              bg="green.400"
              rounded="full"
              border="2px solid white"
            />
          </Box>
          <VStack gap={0} align="start">
            <Text fontWeight="bold" fontSize="md" color={textColor}>
              NutriAI
            </Text>
            <Text fontSize="xs" color={onlineColor} fontWeight="medium">
              Online
            </Text>
          </VStack>
        </HStack>

        <IconButton
          variant="outline"
          aria-label="Reset Chat"
          rounded="full"
          disabled={!hasMessages}
          onClick={onReset}
          bg={redTrash}
          color={redTrashColor}
          _hover={{ bg: redTrashHover }}
        >
          <Trash2Icon size={30} />
        </IconButton>
      </Flex>
    </Box>
  );
};
