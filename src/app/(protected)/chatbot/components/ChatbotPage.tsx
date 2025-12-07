'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, VStack, Flex, Container, Button, Dialog, ScrollArea, Text } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { BotIcon, UserIcon } from 'lucide-react';
import { sendMessage, resetChat } from '../actions/actions';
import type { ChatLogs } from '../types/types';
import Loader from '@/components/Loader';
import Chatbot from './Chatbot';
import TypingIndicator from '@/components/TypingIndicator';
import { RenderMessage } from './RenderMessage';
import { QuickStartSuggestions } from './QuickStartSuggestions';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatLogs[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const botBg = useColorModeValue('white', 'gray.700');
  const botColor = useColorModeValue('gray.800', 'white');
  const botBorder = useColorModeValue('gray.100', 'gray.600');
  const emptyStateColor = useColorModeValue('gray.500', 'gray.400');

  const handleSuggestionClick = (prompt: string) => {
    setInputValue(prompt);
  };

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

  return (
    <Container maxW="full" h="calc(100vh - 140px)" p={0} display="flex" flexDirection="column" position="relative">
      <ChatHeader onReset={() => setIsResetDialogOpen(true)} hasMessages={messages.length > 0} />

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
                    <Box bg="transparent" w="full" maxW={{ base: '150px', md: '200px' }}>
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
                      <Text fontSize="14px" color={msg.sender_type === 'bot' ? 'gray.400' : 'gray.600'} textAlign="end">
                        {new Date(msg.timestamp).toLocaleString('id-ID', {
                          timeStyle: 'short',
                          dateStyle: 'medium',
                        })}
                      </Text>
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
                    <TypingIndicator />
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

      {messages.length === 0 && !isLoadingFetch && <QuickStartSuggestions onSuggestionClick={handleSuggestionClick} />}

      <ChatInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSend={handleSendMessage}
        isLoading={isLoading}
      />
    </Container>
  );
}
