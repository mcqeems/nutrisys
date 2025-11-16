'use client';

import { signOut } from 'next-auth/react';
import { Button, Center } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

export default function DashboardPage() {
  return (
    <div>
      <Flex gap="4" flexDirection="column">
        <Text textStyle="4xl">Dashboard</Text>
        <div>
          <Center>
            <Button size="md" onClick={() => signOut({ callbackUrl: '/' })}>
              Sign Out
            </Button>
          </Center>
        </div>
      </Flex>
    </div>
  );
}
