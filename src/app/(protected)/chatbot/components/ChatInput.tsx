'use client';

import { Box, HStack, Input, Button } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { SendIcon } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  isLoading: boolean;
}

export const ChatInput = ({ value, onChange, onSend, isLoading }: ChatInputProps) => {
  const glassBg = useColorModeValue('rgba(255, 255, 255, 0.6)', 'rgba(26, 32, 44, 0.8)');
  const glassBorder = useColorModeValue('whiteAlpha.400', 'whiteAlpha.100');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <Box p={4} position="absolute" bottom={0} left={0} right={0} zIndex={10}>
      <HStack
        w="full"
        bg={glassBg}
        backdropFilter="blur(16px)"
        border="1px solid"
        borderColor={glassBorder}
        rounded="3xl"
        p={2}
        shadow="lg"
        gap={2}
      >
        <Input
          placeholder="Tanya tentang kesehatan & nutrisi..."
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          variant="subtle"
          size="lg"
          bg="transparent"
          border="none"
          _focus={{ ring: 0, outline: 0 }}
          flex={1}
        />
        <Button
          onClick={onSend}
          colorPalette="green"
          rounded="full"
          size="lg"
          disabled={!value.trim() || isLoading}
          aria-label="Send message"
          w="12"
          h="12"
          p={0}
        >
          <SendIcon />
        </Button>
      </HStack>
    </Box>
  );
};
