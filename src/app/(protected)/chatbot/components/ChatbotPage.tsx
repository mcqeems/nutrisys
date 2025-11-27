'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Input,
  Text,
  Flex,
  Container,
  Spinner,
  Button,
  Link as ChakraLink,
  Dialog,
  ScrollArea,
  IconButton,
} from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import NextLink from 'next/link';
import { SendIcon, BotIcon, UserIcon, Trash2Icon } from 'lucide-react';
import { sendMessage, resetChat } from '../actions/actions';
import type { ChatLogs } from '../types/types';
import Loader from '@/components/Loader';
import Chatbot from './Chatbot';

const RenderMessage = ({ content, isUser }: { content: string; isUser: boolean }) => {
  const linkColor = useColorModeValue('blue.500', 'blue.300');
  const linkHover = useColorModeValue('blue.600', 'blue.400');

  const parts = content.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, text, url] = linkMatch;
          return (
            <ChakraLink
              key={index}
              as={NextLink}
              href={url}
              color={isUser ? 'white' : linkColor}
              textDecoration="underline"
              _hover={{ color: isUser ? 'gray.200' : linkHover }}
            >
              {text}
            </ChakraLink>
          );
        }
        const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
        if (boldMatch) {
          return (
            <Text as="span" fontWeight="bold" key={index}>
              {boldMatch[1]}
            </Text>
          );
        }
        return part;
      })}
    </>
  );
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatLogs[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const redTrash = useColorModeValue('red.300', 'red.700');
  const redTrashColor = useColorModeValue('red.700', 'red.300');
  const redTrashHover = useColorModeValue('red.200', 'red.800');

  const glassBg = useColorModeValue('rgba(255, 255, 255, 0.6)', 'rgba(26, 32, 44, 0.8)');
  const glassBorder = useColorModeValue('whiteAlpha.400', 'whiteAlpha.100');
  const textColor = useColorModeValue('gray.800', 'white');
  const botBg = useColorModeValue('white', 'gray.700');
  const botColor = useColorModeValue('gray.800', 'white');
  const botBorder = useColorModeValue('gray.100', 'gray.600');
  const onlineColor = useColorModeValue('green.600', 'green.300');
  const emptyStateColor = useColorModeValue('gray.400', 'gray.500');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    async function fetchChatLogs() {
      try {
        setIsLoadingFetch(true);
        const response = await fetch('/api/chats');
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setMessages(data.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch chat logs:', error);
      } finally {
        setIsLoadingFetch(false);
      }
    }
    fetchChatLogs();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleResetChat = async () => {
    setIsLoading(true);
    try {
      const response = await resetChat();
      if (response.success) {
        setMessages([]);
        setIsResetDialogOpen(false);
      }
    } catch (error) {
      console.error('Failed to reset chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatLogs = {
      id: Date.now(),
      user_id: 'me',
      session_id: 'current',
      sender_type: 'user',
      message: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessage(newMessage.message);

      if (response.success && response.message) {
        const botMessage: ChatLogs = {
          id: Date.now() + 1,
          user_id: 'bot',
          session_id: 'current',
          sender_type: 'bot',
          message: response.message,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxW="full" h="calc(100vh - 140px)" p={0} display="flex" flexDirection="column" position="relative">
      {/* Header */}
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
                Nutrisys AI
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
            disabled={messages.length === 0}
            onClick={() => setIsResetDialogOpen(true)}
            bg={redTrash}
            color={redTrashColor}
            _hover={{ bg: redTrashHover }}
          >
            <Trash2Icon size={30} />
          </IconButton>
        </Flex>
      </Box>

      <Dialog.Root open={isResetDialogOpen} onOpenChange={(e) => setIsResetDialogOpen(e.open)}>
        <Dialog.Backdrop />
        <Dialog.Positioner justifyContent="center" alignItems="center" h="100vh">
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Hapus Riwayat Chat?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>
                Apakah Anda yakin ingin menghapus semua riwayat percakapan? Tindakan ini tidak dapat dibatalkan.
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Batal</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={handleResetChat} loading={isLoading}>
                Hapus
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      {/* Messages Area */}
      <ScrollArea.Root flex={1} w="full" h="full" variant="hover">
        <ScrollArea.Viewport w="full" h="full">
          <ScrollArea.Content minH="full" display="flex" flexDirection="column">
            <VStack p={4} pt="100px" pb="100px" gap={6} align="stretch" flex="1">
              {isLoadingFetch ? (
                <Loader />
              ) : (
                messages.length === 0 && (
                  <Flex direction="column" alignItems="center" justifyContent="center" flex={1} color={emptyStateColor}>
                    <Box bg="transparent" w="full" maxW="200px">
                      <Chatbot />
                    </Box>
                    <Text mt={4}>Mulai percakapan dengan Nutrisys AI</Text>
                  </Flex>
                )
              )}

              {messages.map((msg) => (
                <Flex
                  key={msg.id}
                  justify={msg.sender_type === 'user' ? 'flex-end' : 'flex-start'}
                  align="flex-start"
                  gap={3}
                >
                  {msg.sender_type === 'bot' && (
                    <Box bg="green.500" p={2} rounded="full" color="white" boxShadow="sm">
                      <BotIcon size={20} />
                    </Box>
                  )}

                  <Box
                    maxW={{ base: '85%', md: '70%' }}
                    bg={msg.sender_type === 'user' ? 'green.500' : botBg}
                    color={msg.sender_type === 'user' ? 'white' : botColor}
                    px={5}
                    py={3}
                    rounded="2xl"
                    borderTopLeftRadius={msg.sender_type === 'bot' ? '0' : '2xl'}
                    borderTopRightRadius={msg.sender_type === 'user' ? '0' : '2xl'}
                    boxShadow="sm"
                    borderWidth={msg.sender_type === 'bot' ? '1px' : '0'}
                    borderColor={botBorder}
                  >
                    <Box whiteSpace="pre-wrap" lineHeight="tall">
                      <RenderMessage content={msg.message} isUser={msg.sender_type === 'user'} />
                    </Box>
                  </Box>

                  {msg.sender_type === 'user' && (
                    <Box bg="blue.500" p={2} rounded="full" color="white" boxShadow="sm">
                      <UserIcon size={20} />
                    </Box>
                  )}
                </Flex>
              ))}
              {isLoading && (
                <Flex justify="flex-start" align="center" gap={3}>
                  <Box bg="green.500" p={2} rounded="full" color="white" boxShadow="sm">
                    <BotIcon size={20} />
                  </Box>
                  <Box
                    bg={botBg}
                    px={5}
                    py={3}
                    rounded="2xl"
                    borderTopLeftRadius="0"
                    boxShadow="sm"
                    borderWidth="1px"
                    borderColor={botBorder}
                  >
                    <Spinner size="sm" color="green.500" />
                  </Box>
                </Flex>
              )}
              <div ref={messagesEndRef} />
            </VStack>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      {/* Input Area */}
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="subtle"
            size="lg"
            bg="transparent"
            border="none"
            _focus={{ ring: 0, outline: 0 }}
            flex={1}
          />
          <Button
            onClick={handleSendMessage}
            colorPalette="green"
            rounded="full"
            size="lg"
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
            w="12"
            h="12"
            p={0}
          >
            <SendIcon />
          </Button>
        </HStack>
      </Box>
    </Container>
  );
}
