'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Text,
  Box,
  Flex,
  Stack,
  Card,
  Badge,
  Button,
  Skeleton,
  IconButton,
} from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle, Clock, Check } from 'lucide-react';
import { markNotificationsAsRead } from '@/lib/actions/markNotificationsAsRead';
import { toaster } from '@/components/ui/toaster';
import { useNotifications } from '@/context/NotificationContext';

interface Notification {
  id: number;
  message: string;
  type: string | null;
  is_read: boolean | null;
  created_at: string | null;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMarkingAll, setIsMarkingAll] = useState(false);
  const { refreshUnreadCount } = useNotifications();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  const titleColor = useColorModeValue('green.600', 'green.500');
  const unreadBg = useColorModeValue('green.50', 'green.900');
  const unreadBorder = useColorModeValue('green.200', 'green.700');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        const data = await response.json();
        // Sort by created_at descending (newest first)
        const sorted = (data.data || []).sort(
          (a: Notification, b: Notification) =>
            new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        );
        setNotifications(sorted);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    setIsMarkingAll(true);
    try {
      const result = await markNotificationsAsRead();
      if (result.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
        toaster.create({ title: 'Semua notifikasi telah dibaca', type: 'success' });
        // Refresh navbar unread count
        await refreshUnreadCount();
      } else {
        toaster.create({ title: result.message, type: 'error' });
      }
    } catch (error) {
      console.error(error);
      toaster.create({ title: 'Gagal menandai notifikasi', type: 'error' });
    } finally {
      setIsMarkingAll(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      const result = await markNotificationsAsRead([id]);
      if (result.success) {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
        // Refresh navbar unread count
        await refreshUnreadCount();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTypeIcon = (type: string | null) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} color="green" />;
      case 'warning':
        return <AlertTriangle size={18} color="orange" />;
      case 'error':
        return <AlertTriangle size={18} color="red" />;
      case 'reminder':
        return <Clock size={18} color="blue" />;
      default:
        return <Info size={18} color="gray" />;
    }
  };

  const getTypeBadgeColor = (type: string | null) => {
    switch (type) {
      case 'success':
        return 'green';
      case 'warning':
        return 'orange';
      case 'error':
        return 'red';
      case 'reminder':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  if (isLoading) {
    return (
      <Container maxW="container.lg" py={8}>
        <Skeleton height="40px" width="250px" mb={4} />
        <Skeleton height="20px" width="200px" mb={8} />
        <Stack gap={4}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} height="80px" borderRadius="xl" />
          ))}
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Flex justify="space-between" align="center" mb={2}>
        <Heading size="3xl" color={titleColor}>
          Notifikasi
        </Heading>
        {unreadCount > 0 && (
          <Button colorPalette="green" size="sm" onClick={handleMarkAllAsRead} loading={isMarkingAll}>
            <CheckCheck size={16} />
            Tandai Semua Dibaca
          </Button>
        )}
      </Flex>
      <Text color={mutedColor} mb={6}>
        {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : 'Semua notifikasi sudah dibaca'}
      </Text>

      {notifications.length > 0 ? (
        <Stack gap={4}>
          {notifications.map((notif) => (
            <Card.Root
              key={notif.id}
              variant="elevated"
              bg={notif.is_read ? cardBg : unreadBg}
              borderWidth={notif.is_read ? '1px' : '2px'}
              borderColor={notif.is_read ? borderColor : unreadBorder}
              transition="all 0.2s"
              _hover={{ shadow: 'md' }}
            >
              <Card.Body>
                <Flex justify="space-between" align="start" gap={4}>
                  <Flex gap={4} align="start" flex={1}>
                    <Box mt={1}>{getTypeIcon(notif.type)}</Box>
                    <Box flex={1}>
                      <Flex align="center" gap={2} mb={2}>
                        <Badge colorPalette={getTypeBadgeColor(notif.type)} variant="surface" size="sm">
                          {notif.type || 'info'}
                        </Badge>
                        {!notif.is_read && (
                          <Badge colorPalette="red" variant="solid" size="sm">
                            Baru
                          </Badge>
                        )}
                      </Flex>
                      <Text fontSize="md" mb={2}>
                        {notif.message}
                      </Text>
                      <Text fontSize="xs" color={mutedColor}>
                        {notif.created_at
                          ? new Date(notif.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '-'}
                      </Text>
                    </Box>
                  </Flex>
                  {!notif.is_read && (
                    <IconButton
                      aria-label="Mark as read"
                      variant="outline"
                      p={2}
                      size="sm"
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      <Check size={16} />
                      Tandai
                    </IconButton>
                  )}
                </Flex>
              </Card.Body>
            </Card.Root>
          ))}
        </Stack>
      ) : (
        <Card.Root variant="elevated" bg={cardBg}>
          <Card.Body>
            <Flex direction="column" align="center" justify="center" py={12} textAlign="center">
              <Bell size={64} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <Text fontSize="lg" fontWeight="medium" mb={2}>
                Tidak ada notifikasi
              </Text>
              <Text color={mutedColor}>Anda akan menerima notifikasi tentang aktivitas Anda di sini.</Text>
            </Flex>
          </Card.Body>
        </Card.Root>
      )}
    </Container>
  );
}
