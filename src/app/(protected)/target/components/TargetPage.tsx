'use client';

import {
  Container,
  Flex,
  Heading,
  Text,
  Box,
  Button,
  Grid,
  Card,
  Badge,
  Input,
  Dialog,
  Stack,
  NativeSelect,
  IconButton,
  Menu,
  Skeleton,
  Portal,
} from '@chakra-ui/react';
import TargetAnimation from './Target';
import { useColorModeValue } from '@/components/ui/color-mode';
import type { TargetTypes, Target } from '../types/types';
import { useState, useEffect } from 'react';
import {
  PlusIcon,
  MoreVertical,
  CalendarIcon,
  Trash2,
  PauseCircle,
  PlayCircle,
  FileText,
  PauseIcon,
  HourglassIcon,
} from 'lucide-react';
import { createTarget } from '@/lib/actions/createTarget';
import { updateTargetStatus } from '@/lib/actions/updateTargetStatus';
import { deleteTarget } from '@/lib/actions/deleteTarget';
import { toaster } from '@/components/ui/toaster';

async function fetchTargetData(page: number = 1, limit: number = 15): Promise<TargetTypes> {
  const response = await fetch(`/api/target?page=${page}&limit=${limit}`);
  return response.json();
}

export default function TargetPage() {
  const titleColor = useColorModeValue('green.600', 'green.500');
  const titleColorMuted = useColorModeValue('gray.500', 'gray.300');
  const cardBg = useColorModeValue('white', 'gray.800');
  const dateColor = useColorModeValue('gray.500', 'gray.200');

  const [targets, setTargets] = useState<Target[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Aktif');

  const loadTargets = async (pageNum: number, isInitial: boolean = false) => {
    if (isInitial) setIsLoading(true);
    else setIsLoadingMore(true);

    try {
      const res = await fetchTargetData(pageNum);
      if (res.data && res.data.length > 0) {
        if (isInitial) {
          setTargets(res.data);
        } else {
          setTargets((prev) => [...prev, ...res.data]);
        }
        if (res.data.length < 15) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    loadTargets(1, true);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadTargets(nextPage);
  };

  const handleCreate = async () => {
    if (!name || !startDate || !endDate) {
      toaster.create({ title: 'Mohon lengkapi semua data', type: 'error' });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await createTarget(name, startDate, endDate, status);
      if (res.success) {
        toaster.create({ title: res.message, type: 'success' });
        setIsDialogOpen(false);
        // Reset form
        setName('');
        setStartDate('');
        setEndDate('');
        setStatus('Aktif');

        // Reset list
        setPage(1);
        setHasMore(true);
        loadTargets(1, true);
      } else {
        toaster.create({ title: res.message, type: 'error' });
      }
    } catch (error) {
      console.error(error);
      toaster.create({ title: 'Terjadi kesalahan', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      const res = await updateTargetStatus(id, newStatus);
      if (res.success) {
        toaster.create({ title: res.message, type: 'success' });
        setTargets((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
      } else {
        toaster.create({ title: res.message, type: 'error' });
      }
    } catch (error) {
      console.error(error);
      toaster.create({ title: 'Gagal mengupdate status', type: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    // Optional: Add a confirmation dialog or toast here if desired
    try {
      const res = await deleteTarget(id);
      if (res.success) {
        toaster.create({ title: res.message, type: 'success' });
        setTargets((prev) => prev.filter((t) => t.id !== id));
      } else {
        toaster.create({ title: res.message, type: 'error' });
      }
    } catch (error) {
      console.error(error);
      toaster.create({ title: 'Gagal menghapus target', type: 'error' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif':
        return 'green';
      case 'Selesai':
        return 'blue';
      case 'Menunggu':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="3xl" mb={2} color={titleColor}>
            Targeting
          </Heading>
          <Text color={titleColorMuted}>Tantang dirimu dengan membuat target!</Text>
        </Box>
        <Button colorPalette="green" onClick={() => setIsDialogOpen(true)}>
          <PlusIcon size={16} /> Buat Target
        </Button>
      </Flex>

      <Grid
        templateColumns={
          !isLoading && targets.length === 0 ? '1fr' : { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }
        }
        gap={6}
        mb={8}
      >
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} height="160px" width="full" borderRadius="md" />
          ))
        ) : targets.length > 0 ? (
          targets.map((item) => (
            <Card.Root key={item.id} variant="elevated" bg={cardBg} overflow="hidden" position="relative">
              <Card.Body>
                <Flex justify="space-between" align="start" mb={4} position="relative" zIndex={2}>
                  <Heading size="md" truncate maxW="70%">
                    {item.name}
                  </Heading>
                  <Badge colorPalette={getStatusColor(item.status || 'draft')} variant="surface">
                    {item.status || 'Draft'}
                  </Badge>
                </Flex>

                <Flex align="center" gap={2} color={dateColor} fontSize="sm" position="relative" zIndex={2}>
                  <CalendarIcon size={14} />
                  <Text>
                    {new Date(item.start_date).toLocaleDateString()} — {new Date(item.end_date).toLocaleDateString()}
                  </Text>
                </Flex>

                {/* Background Lottie */}
                <Box
                  position="absolute"
                  bottom="-20px"
                  left="-20px"
                  width="150px"
                  opacity={0.2}
                  zIndex={1}
                  pointerEvents="none"
                >
                  {item.status === 'Aktif' ? (
                    <TargetAnimation />
                  ) : item.status === 'Selesai' ? (
                    <Box p="6">
                      <PauseIcon size="100px" />
                    </Box>
                  ) : (
                    <Box p="6">
                      <HourglassIcon size="100px" />
                    </Box>
                  )}
                </Box>

                {/* Actions Menu */}
                <Box position="absolute" bottom={4} right={4} zIndex={2}>
                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <IconButton variant="ghost" size="sm" aria-label="Options">
                        <MoreVertical size={16} />
                      </IconButton>
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content>
                          <Menu.Item value="Aktif" onClick={() => handleStatusUpdate(item.id, 'Aktif')}>
                            <PlayCircle size={14} /> Set Aktif
                          </Menu.Item>
                          <Menu.Item value="Selesai" onClick={() => handleStatusUpdate(item.id, 'Selesai')}>
                            <PauseCircle size={14} /> Set Selesai
                          </Menu.Item>
                          <Menu.Item value="Menunggu" onClick={() => handleStatusUpdate(item.id, 'Menunggu')}>
                            <FileText size={14} /> Set Menunggu
                          </Menu.Item>
                          <Menu.Item value="delete" color="red.500" onClick={() => handleDelete(item.id)}>
                            <Trash2 size={14} /> Hapus
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
                </Box>
              </Card.Body>
            </Card.Root>
          ))
        ) : (
          <Flex alignItems="center" justifyContent="center" w="full">
            <Box w="200px">
              <TargetAnimation />
              <Text color={titleColorMuted} textAlign="center">
                Anda belum mempunyai target.
              </Text>
            </Box>
          </Flex>
        )}
      </Grid>

      {hasMore && !isLoading && (
        <Flex justify="center" mt={4}>
          <Button onClick={handleLoadMore} loading={isLoadingMore} variant="outline" size="lg">
            Load More Targets
          </Button>
        </Flex>
      )}

      <Dialog.Root open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e.open)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Buat Target Baru</Dialog.Title>
              <Dialog.CloseTrigger />
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={4}>
                <Box>
                  <Text mb={2} fontWeight="medium">
                    Nama
                  </Text>
                  <Input placeholder="Isi target anda" value={name} onChange={(e) => setName(e.target.value)} />
                </Box>
                <Flex gap={4}>
                  <Box flex={1}>
                    <Text mb={2} fontWeight="medium">
                      Tanggal Mulai
                    </Text>
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </Box>
                  <Box flex={1}>
                    <Text mb={2} fontWeight="medium">
                      Tanggal Selesai
                    </Text>
                    <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </Box>
                </Flex>
                <Box>
                  <Text mb={2} fontWeight="medium">
                    Status
                  </Text>
                  <NativeSelect.Root>
                    <NativeSelect.Field value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="Aktif">Aktif</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Menunggu">Menunggu</option>
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Box>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Tutup</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleCreate} loading={isSubmitting} colorPalette="green">
                Buat Target
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Container>
  );
}
