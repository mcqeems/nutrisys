'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Container,
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Stack,
  Grid,
  Card,
  Avatar,
  Textarea,
  NativeSelect,
  Badge,
  IconButton,
  Skeleton,
} from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { toaster } from '@/components/ui/toaster';
import { Camera, Edit2, Save, X } from 'lucide-react';
import { updateUserProfile } from '@/lib/actions/updateUserProfile';
import { saveUploadedS3ImageToUser } from '@/lib/actions/postUserImage';

interface UserData {
  id: number;
  user_id: string;
  gender?: string;
  height?: number;
  weight?: number;
  blood_type?: string;
  food_allergy?: string;
  medical_history?: string;
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

export default function UserPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [userData, setUserData] = useState<UserData>();

  // User Info State
  const [formData, setFormData] = useState({
    gender: '',
    height: '',
    weight: '',
    blood_type: '',
    food_allergy: '',
    medical_history: '',
  });

  // Image State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const labelColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user');
        const json = await res.json();
        if (json.data) {
          setUserData(json.data);
          setFormData({
            gender: json.data.gender || '',
            height: json.data.height || '',
            weight: json.data.weight || '',
            blood_type: json.data.blood_type || '',
            food_allergy: json.data.food_allergy || '',
            medical_history: json.data.medical_history || '',
          });
          setImagePreview(json.data.user?.image || null);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        toaster.create({ title: 'Gagal memuat data pengguna', type: 'error' });
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // 1. Upload Image if changed
      if (selectedFile) {
        await saveUploadedS3ImageToUser(selectedFile);
      }

      // 2. Update Profile Data
      const res = await updateUserProfile({
        gender: formData.gender,
        height: formData.height ? parseInt(formData.height.toString()) : undefined,
        weight: formData.weight ? parseInt(formData.weight.toString()) : undefined,
        blood_type: formData.blood_type,
        food_allergy: formData.food_allergy,
        medical_history: formData.medical_history,
      });

      if (res.success) {
        toaster.create({ title: 'Profil berhasil diperbarui', type: 'success' });
        setIsEditing(false);
        // Refresh data to ensure sync
        const resData = await fetch('/api/user');
        const json = await resData.json();
        if (json.data) {
          setUserData(json.data);
        }
      } else {
        toaster.create({ title: res.message || 'Gagal memperbarui profil', type: 'error' });
      }
    } catch (error) {
      console.error(error);
      toaster.create({ title: 'Terjadi kesalahan', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userData) {
      setFormData({
        gender: userData.gender || '',
        height: userData.height !== undefined && userData.height !== null ? userData.height.toString() : '',
        weight: userData.weight !== undefined && userData.weight !== null ? userData.weight.toString() : '',
        blood_type: userData.blood_type || '',
        food_allergy: userData.food_allergy || '',
        medical_history: userData.medical_history || '',
      });
      setImagePreview(userData.user?.image || null);
    }
    setSelectedFile(null);
  };

  if (isFetching) {
    return (
      <Container maxW="container.md" py={8}>
        <Stack gap={4}>
          <Skeleton height="40px" width="200px" />
          <Card.Root>
            <Card.Body>
              <Stack gap={6}>
                <Flex gap={6} align="center">
                  <Skeleton height="120px" width="120px" borderRadius="full" />
                  <Stack gap={2} flex={1}>
                    <Skeleton height="30px" width="50%" />
                    <Skeleton height="20px" width="30%" />
                  </Stack>
                </Flex>
                <Skeleton height="200px" />
              </Stack>
            </Card.Body>
          </Card.Root>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading size="2xl">
          Profil
          <hr /> Pengguna
        </Heading>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} colorPalette="blue" variant="solid">
            <Edit2 size={16} /> <Text display={{ base: 'none', md: 'block' }}>Edit Profil</Text>
          </Button>
        ) : (
          <Flex gap={2}>
            <Button onClick={handleCancel} variant="solid" disabled={isLoading}>
              <X size={16} />
              <Text display={{ base: 'none', md: 'block' }}>Batal</Text>
            </Button>
            <Button onClick={handleSave} colorPalette="green" loading={isLoading}>
              <Save size={16} /> <Text display={{ base: 'none', md: 'block' }}>Simpan</Text>
            </Button>
          </Flex>
        )}
      </Flex>

      <Card.Root variant="elevated" bg={bgColor} borderColor={borderColor}>
        <Card.Body>
          <Stack gap="14">
            {/* Header Section: Avatar & Basic Info */}
            <Flex direction={{ base: 'column', sm: 'row' }} align="center" gap={6}>
              <Box position="relative">
                <Avatar.Root size="2xl" w="120px" h="120px">
                  <Avatar.Image src={imagePreview || undefined} />
                  <Avatar.Fallback name={userData?.user?.name || 'User'} />
                </Avatar.Root>
                {isEditing && (
                  <IconButton
                    aria-label="Upload Image"
                    position="absolute"
                    bottom={0}
                    right={0}
                    rounded="full"
                    colorPalette="blue"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera size={16} />
                  </IconButton>
                )}
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
              </Box>
              <Box textAlign={{ base: 'center', sm: 'left' }}>
                <Heading size="xl" mb={1}>
                  {userData?.user?.name || 'Pengguna'}
                </Heading>
                <Text color="gray.500" mb={2}>
                  {userData?.user?.email}
                </Text>
                <Badge colorPalette="green" variant="surface">
                  Member
                </Badge>
              </Box>
            </Flex>

            <Box height="1px" bg={borderColor} />

            {/* Personal Info Grid */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
              <Box>
                <Text color={labelColor} fontSize="sm" mb={1}>
                  Jenis Kelamin
                </Text>
                {isEditing ? (
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      placeholder="Pilih jenis kelamin"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                ) : (
                  <Text fontWeight="medium" fontSize="lg">
                    {formData.gender || '-'}
                  </Text>
                )}
              </Box>

              <Box>
                <Text color={labelColor} fontSize="sm" mb={1}>
                  Golongan Darah
                </Text>
                {isEditing ? (
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      name="blood_type"
                      value={formData.blood_type}
                      onChange={handleInputChange}
                      placeholder="Pilih golongan darah"
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="AB">AB</option>
                      <option value="O">O</option>
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                ) : (
                  <Text fontWeight="medium" fontSize="lg">
                    {formData.blood_type || '-'}
                  </Text>
                )}
              </Box>

              <Box>
                <Text color={labelColor} fontSize="sm" mb={1}>
                  Tinggi Badan (cm)
                </Text>
                {isEditing ? (
                  <Input
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                ) : (
                  <Text fontWeight="medium" fontSize="lg">
                    {formData.height ? `${formData.height} cm` : '-'}
                  </Text>
                )}
              </Box>

              <Box>
                <Text color={labelColor} fontSize="sm" mb={1}>
                  Berat Badan (kg)
                </Text>
                {isEditing ? (
                  <Input
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                ) : (
                  <Text fontWeight="medium" fontSize="lg">
                    {formData.weight ? `${formData.weight} kg` : '-'}
                  </Text>
                )}
              </Box>
            </Grid>

            <Box height="1px" bg={borderColor} />

            {/* Medical Info */}
            <Stack gap={4}>
              <Box>
                <Text color={labelColor} fontSize="sm" mb={1}>
                  Alergi Makanan
                </Text>
                {isEditing ? (
                  <Textarea
                    name="food_allergy"
                    value={formData.food_allergy}
                    onChange={handleInputChange}
                    placeholder="Contoh: Kacang, Udang..."
                    rows={2}
                  />
                ) : (
                  <Text fontWeight="medium">{formData.food_allergy || 'Tidak ada.'}</Text>
                )}
              </Box>

              <Box>
                <Text color={labelColor} fontSize="sm" mb={1}>
                  Riwayat Penyakit
                </Text>
                {isEditing ? (
                  <Textarea
                    name="medical_history"
                    value={formData.medical_history}
                    onChange={handleInputChange}
                    placeholder="Contoh: Diabetes, Hipertensi..."
                    rows={3}
                  />
                ) : (
                  <Text fontWeight="medium">{formData.medical_history || 'Tidak ada.'}</Text>
                )}
              </Box>
            </Stack>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
