'use client';

import { Box, Text, Stack, Flex, IconButton } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Bell, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

interface Notification {
  id: number;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationsCardProps {
  notifications: Notification[];
}

export default function NotificationsCard({ notifications }: NotificationsCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  const bgBoxColor = useColorModeValue('green.50', 'green.900');

  return (
    <Box bg={cardBg} borderRadius="xl" border="1px solid" borderColor={borderColor} p={6} h="full">
      <Flex direction="row" justifyContent="space-between">
        <Box>
          <Text fontWeight="semibold" mb={2}>
            Notifikasi:
          </Text>
          <Text fontSize="sm" color={mutedColor} mb={4}>
            Reminder kegiatan anda.
          </Text>
        </Box>
        <Link href="/notifications">
          <IconButton size="sm" variant="outline">
            <ExternalLinkIcon />
          </IconButton>
        </Link>
      </Flex>

      <Stack gap={3} maxH="350px" overflowY="auto">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <Box
              key={notif.id}
              p={3}
              bg={notif.is_read ? 'transparent' : bgBoxColor}
              borderRadius="md"
              border="2px dashed"
              borderColor={borderColor}
            >
              <Text fontSize="sm">{notif.message}</Text>
              <Text fontSize="xs" color={mutedColor}>
                {new Date(notif.created_at).toLocaleDateString('id-ID')}
              </Text>
            </Box>
          ))
        ) : (
          <Box textAlign="center" py={8}>
            <Bell size={32} style={{ margin: '0 auto', opacity: 0.3 }} />
            <Text color={mutedColor} mt={2} fontSize="sm">
              Tidak ada notifikasi
            </Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
