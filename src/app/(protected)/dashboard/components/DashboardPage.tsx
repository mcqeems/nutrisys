'use client';

import { useState, useEffect } from 'react';
import { Container, Heading, Text, Grid, Box, Skeleton } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Utensils, MessageCircle, BookHeart, Target } from 'lucide-react';
import UserInfoCard from './UserInfoCard';
import NotificationsCard from './NotificationsCard';
import AISummaryCard from './AISummaryCard';
import StatsCard from './StatsCard';
import { toaster } from '@/components/ui/toaster';
import { generateAISummary } from '@/lib/actions/generateAISummary';

interface DashboardData {
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
  notifications: Array<{
    id: number;
    message: string;
    type: string;
    is_read: boolean;
    created_at: string;
  }>;
  summary: string | null;
  stats: {
    totalAnalisis: number;
    totalPesan: number;
    totalJurnal: number;
    totalTarget: number;
  };
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [data, setData] = useState<DashboardData>({
    user: null,
    userInfo: null,
    notifications: [
      {
        id: 0,
        message: '',
        type: '',
        is_read: false,
        created_at: '',
      },
    ],
    summary: null,
    stats: {
      totalAnalisis: 0,
      totalPesan: 0,
      totalJurnal: 0,
      totalTarget: 0,
    },
  });

  const titleColor = useColorModeValue('green.600', 'green.400');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/dashboard');
        const json = await res.json();
        if (json.data) {
          setData(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toaster.create({ title: 'Gagal memuat data dashboard', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const result = await generateAISummary();
      if (result.success && result.summary) {
        setData((prev) => ({ ...prev, summary: result.summary! }));
        toaster.create({ title: result.message, type: 'success' });
      } else {
        toaster.create({ title: result.message || 'Gagal membuat rangkuman', type: 'error' });
      }
    } catch (error) {
      toaster.create({ title: 'Gagal membuat rangkuman', type: 'error' });
      console.error(error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Skeleton height="40px" width="300px" mb={8} />
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={6}>
          <Skeleton height="350px" borderRadius="xl" />
          <Skeleton height="350px" borderRadius="xl" />
        </Grid>
        <Skeleton height="200px" borderRadius="xl" mb={6} />
        <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height="130px" borderRadius="xl" />
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      {/* Greeting */}
      <Heading size="3xl" mb={8}>
        Selamat datang,{' '}
        <Text as="span" color={titleColor}>
          {data.user?.name || 'Pengguna'}
        </Text>
      </Heading>

      {/* User Info + Notifications Row */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={6}>
        <UserInfoCard user={data.user} userInfo={data.userInfo} />
        <NotificationsCard notifications={data.notifications} />
      </Grid>

      {/* AI Summary */}
      <Box mb={6}>
        <AISummaryCard
          summary={data.summary}
          onGenerate={handleGenerateSummary}
          isLoading={isGeneratingSummary}
          userInfo={data.userInfo}
        />
      </Box>

      {/* Stats Row */}
      <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
        <StatsCard
          title="Analisis Nutrisi"
          label="Total Analisis:"
          count={data.stats.totalAnalisis}
          icon={Utensils}
          background="analyze"
          link="/analyze"
        />
        <StatsCard
          title="AI Chat"
          label="Total Pesan:"
          count={data.stats.totalPesan}
          icon={MessageCircle}
          background="chatbot"
          link="/chatbot"
        />
        <StatsCard
          title="Wellness Journal"
          label="Total Jurnal:"
          count={data.stats.totalJurnal}
          icon={BookHeart}
          background="journal"
          link="/journal"
        />
        <StatsCard
          title="Target"
          label="Total Target:"
          count={data.stats.totalTarget}
          icon={Target}
          background="target"
          link="/target"
        />
      </Grid>
    </Container>
  );
}
