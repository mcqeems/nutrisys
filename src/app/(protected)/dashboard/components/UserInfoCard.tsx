'use client';

import { Box, Flex, Text, Avatar, Badge, Grid, Link, IconButton } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { ExternalLinkIcon } from 'lucide-react';

interface UserInfoCardProps {
  user: {
    name: string;
    email: string;
    image?: string;
  } | null;
  userInfo: {
    gender?: string;
    blood_type?: string;
    height?: number;
    weight?: number;
    food_allergy?: string;
    medical_history?: string;
  } | null;
}

export default function UserInfoCard({ user, userInfo }: UserInfoCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const labelColor = useColorModeValue('gray.500', 'gray.400');
  const inputBg = useColorModeValue('green.50', 'green.900');

  return (
    <Box bg={cardBg} borderRadius="xl" border="1px solid" borderColor={borderColor} p={6}>
      <Flex direction="row" justifyContent="space-between">
        <Text fontWeight="semibold" mb={4}>
          User Info
        </Text>
        <Link href="/user">
          <IconButton size="sm" variant="outline">
            <ExternalLinkIcon />
          </IconButton>
        </Link>
      </Flex>

      <Flex gap={6} mb={6} direction={{ base: 'column', md: 'row' }}>
        {/* Left: Avatar and basic info */}
        <Flex gap={4} align="center">
          <Avatar.Root size="xl" w="80px" h="80px">
            <Avatar.Image src={user?.image || ''} />
            <Avatar.Fallback name={user?.name || 'User'} />
          </Avatar.Root>
          <Box>
            <Text fontWeight="medium" mb={1}>
              Nama: {user?.name || '-'}
            </Text>
            <Text fontSize="sm" color={labelColor} mb={2}>
              Email: {user?.email || '-'}
            </Text>
            <Badge colorPalette="green" variant="surface">
              Member
            </Badge>
          </Box>
        </Flex>

        {/* Right: Health info */}
        <Grid templateColumns="repeat(2, 1fr)" gap={2} flex={1}>
          <Text fontSize="sm">
            <Text as="span" color={labelColor}>
              Jenis Kelamin:{' '}
            </Text>
            {userInfo?.gender || '-'}
          </Text>
          <Text fontSize="sm">
            <Text as="span" color={labelColor}>
              Tinggi Badan:{' '}
            </Text>
            {userInfo?.height ? `${userInfo.height} cm` : '-'}
          </Text>
          <Text fontSize="sm">
            <Text as="span" color={labelColor}>
              Golongan Darah:{' '}
            </Text>
            {userInfo?.blood_type || '-'}
          </Text>
          <Text fontSize="sm">
            <Text as="span" color={labelColor}>
              Berat Badan:{' '}
            </Text>
            {userInfo?.weight ? `${userInfo.weight} kg` : '-'}
          </Text>
        </Grid>
      </Flex>

      {/* Alergi Makanan */}
      <Box mb={4}>
        <Text fontSize="sm" color={labelColor} mb={2}>
          Alergi Makanan:
        </Text>
        <Box bg={inputBg} p={3} borderRadius="md" minH="70px" border="2px dashed" borderColor={borderColor}>
          <Text fontSize="sm">{userInfo?.food_allergy || 'Tidak ada data'}</Text>
        </Box>
      </Box>

      {/* Riwayat Penyakit */}
      <Box>
        <Text fontSize="sm" color={labelColor} mb={2}>
          Riwayat Penyakit:
        </Text>
        <Box bg={inputBg} p={3} borderRadius="md" minH="70px" border="2px dashed" borderColor={borderColor}>
          <Text fontSize="sm">{userInfo?.medical_history || 'Tidak ada data'}</Text>
        </Box>
      </Box>
    </Box>
  );
}
