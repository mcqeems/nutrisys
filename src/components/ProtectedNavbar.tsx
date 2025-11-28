import {
  Flex,
  Box,
  IconButton,
  Text,
  Popover,
  Portal,
  Button,
  Spinner,
  Drawer,
  VStack,
  Separator,
} from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useColorMode, useColorModeValue } from './ui/color-mode';
import { BellIcon, CircleUserIcon, DoorOpenIcon, MoonIcon, PencilIcon, SunIcon, MenuIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

interface UserInfo {
  id: number;
  user_id: string;
  gender?: string | null;
  height?: number | null;
  weight?: number | null;
  blood_type?: string | null;
  food_allergy?: string | null;
  medical_history?: string | null;
  created_at: string;
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

interface ProtectedNavbarProps {
  session: UserInfo | null;
  loadingUser: boolean;
}

export default function ProtectedNavbar({ session, loadingUser }: ProtectedNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toggleColorMode, colorMode } = useColorMode();
  const greenColor = useColorModeValue('green.500', 'green.400');
  const greenColorHover = useColorModeValue('green.400', 'green.500');
  const greenLogo = useColorModeValue('green.500', 'green.400');

  return (
    <>
      <Flex direction="row" justifyContent="space-between" mb="4" align="center">
        <div>
          <Link href="/">
            <Flex direction="row" justifyContent="center" alignItems="center" gap="2">
              <div className="h-15 w-15">
                <Image
                  src="/Logo/nutrisys.webp"
                  alt="logo"
                  width={500}
                  height={500}
                  style={{ width: '50px', height: '50px' }}
                ></Image>
              </div>
              <Text
                style={{
                  fontFamily: 'Stack Sans Headline',
                  fontSize: '20px',
                  fontWeight: 500,
                }}
                color={greenLogo}
                display={{ base: 'none', sm: 'block' }}
              >
                Nutrisys
              </Text>
            </Flex>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <Flex direction="row" gap="6" display={{ base: 'none', md: 'flex' }}>
          <NavLink href="/dashboard" label="Dashboard" pathname={pathname} activeColor={greenColor} />
          <NavLink href="/target" label="Target" pathname={pathname} activeColor={greenColor} />
          <NavLink href="/journal" label="Wellness Jurnal" pathname={pathname} activeColor={greenColor} />
          <NavLink href="/chatbot" label="AI Chat" pathname={pathname} activeColor={greenColor} />
          <NavLink href="/analyze" label="Analisis Nutrisi" pathname={pathname} activeColor={greenColor} />
        </Flex>

        <Flex direction="row" gap="4" justifyContent="center" alignItems="center">
          <IconButton
            aria-label="Color Mode"
            rounded="full"
            onClick={toggleColorMode}
            bg={greenColor}
            _hover={{ bg: greenColorHover }}
            suppressHydrationWarning
            size={{ base: 'sm', md: 'md' }}
          >
            {colorMode === 'light' ? <MoonIcon suppressHydrationWarning /> : <SunIcon suppressHydrationWarning />}
          </IconButton>
          <Link href="/notifications">
            <IconButton
              aria-label="Notifications"
              rounded="full"
              bg={greenColor}
              _hover={{ bg: greenColorHover }}
              size={{ base: 'sm', md: 'md' }}
            >
              <BellIcon />
            </IconButton>
          </Link>

          {/* Desktop User Menu */}
          <Box display={{ base: 'none', md: 'block' }}>
            <Popover.Root>
              <Popover.Trigger asChild>
                <IconButton
                  aria-label="User Menu"
                  rounded="full"
                  bg={greenColor}
                  _hover={{ bg: greenColorHover }}
                  overflow="hidden"
                >
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile Picture"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      style={{ width: '40px', height: '40px' }}
                    />
                  ) : loadingUser ? (
                    <Spinner />
                  ) : (
                    <CircleUserIcon />
                  )}
                </IconButton>
              </Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content>
                    <Popover.Arrow />
                    <Popover.Body>
                      <Box mb="2">
                        <Popover.Title fontWeight="bold">User Info</Popover.Title>
                        <Text>Nama: {session?.user.name || 'N/A'}</Text>
                        <Text>Email: {session?.user.email || 'N/A'}</Text>
                      </Box>
                      <Flex direction="column" gap="2">
                        <Button
                          colorPalette="blue"
                          variant="outline"
                          onClick={() => {
                            router.push('/user');
                          }}
                        >
                          <PencilIcon />
                          Personalisasi
                        </Button>
                        <Button
                          loading={logoutLoading}
                          loadingText="Logout"
                          spinnerPlacement="start"
                          colorPalette="red"
                          onClick={() => {
                            setLogoutLoading(true);
                            signOut();
                          }}
                        >
                          <DoorOpenIcon />
                          Logout
                        </Button>
                      </Flex>
                    </Popover.Body>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
          </Box>

          {/* Mobile Hamburger Menu */}
          <IconButton
            aria-label="Open Menu"
            display={{ base: 'flex', md: 'none' }}
            onClick={() => setIsDrawerOpen(true)}
            variant="ghost"
            color={greenColor}
          >
            <MenuIcon />
          </IconButton>
        </Flex>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={(e) => setIsDrawerOpen(e.open)} placement="end">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Menu</Drawer.Title>
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body>
              <VStack align="stretch" gap={4}>
                {/* User Info Section */}
                <Box p={4} bg="gray.50" rounded="md">
                  <Flex align="center" gap={3}>
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile Picture"
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                        style={{ width: '50px', height: '50px' }}
                      />
                    ) : (
                      <CircleUserIcon size={40} color="gray" />
                    )}
                    <Box>
                      <Text fontWeight="bold" lineClamp={1}>
                        {session?.user.name || 'User'}
                      </Text>
                      <Text fontSize="sm" color="gray.400" lineClamp={1}>
                        {session?.user.email || ''}
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                <Separator />

                {/* Navigation Links */}
                <VStack align="stretch" gap={1}>
                  <MobileNavLink
                    href="/dashboard"
                    label="Dashboard"
                    pathname={pathname}
                    onClose={() => setIsDrawerOpen(false)}
                  />
                  <MobileNavLink
                    href="/target"
                    label="Target"
                    pathname={pathname}
                    onClose={() => setIsDrawerOpen(false)}
                  />
                  <MobileNavLink
                    href="/journal"
                    label="Wellness Jurnal"
                    pathname={pathname}
                    onClose={() => setIsDrawerOpen(false)}
                  />
                  <MobileNavLink
                    href="/chatbot"
                    label="AI Chat"
                    pathname={pathname}
                    onClose={() => setIsDrawerOpen(false)}
                  />
                  <MobileNavLink
                    href="/analyze"
                    label="Analisis Nutrisi"
                    pathname={pathname}
                    onClose={() => setIsDrawerOpen(false)}
                  />
                </VStack>

                <Separator />

                {/* Actions */}
                <VStack align="stretch" gap={2}>
                  <Button
                    colorPalette="blue"
                    variant="outline"
                    onClick={() => {
                      setIsDrawerOpen(false);
                      router.push('/user');
                    }}
                  >
                    <PencilIcon />
                    Personalisasi
                  </Button>
                  <Button
                    loading={logoutLoading}
                    loadingText="Logout"
                    spinnerPlacement="start"
                    colorPalette="red"
                    variant="solid"
                    onClick={() => {
                      setLogoutLoading(true);
                      signOut();
                    }}
                  >
                    <DoorOpenIcon />
                    Logout
                  </Button>
                </VStack>
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
}

const NavLink = ({
  href,
  label,
  pathname,
  activeColor,
}: {
  href: string;
  label: string;
  pathname: string;
  activeColor: string;
}) => {
  const isActive = pathname === href;
  return (
    <div className="h-full flex flex-col justify-center items-center relative">
      <Link href={href} className="p-2 hoverText text-hover-light">
        <Text fontWeight={500} color={isActive ? activeColor : undefined}>
          {label}
        </Text>
      </Link>
      {isActive && (
        <Box
          height="1"
          width="full"
          bg={activeColor}
          position="absolute"
          bottom="0"
          rounded="lg"
          display={{ base: 'none', md: 'block' }}
        />
      )}
    </div>
  );
};

const MobileNavLink = ({
  href,
  label,
  pathname,
  onClose,
}: {
  href: string;
  label: string;
  pathname: string;
  onClose: () => void;
}) => {
  const isActive = pathname === href;
  return (
    <Link href={href} onClick={onClose}>
      <Box
        p={3}
        rounded="md"
        bg={isActive ? 'green.100' : 'transparent'}
        color={isActive ? 'green.700' : 'inherit'}
        _hover={{ bg: 'gray.100' }}
      >
        <Text fontWeight="medium">{label}</Text>
      </Box>
    </Link>
  );
};
