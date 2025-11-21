'use client';

import { Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

export default function DashboardPage() {
  return (
    <div>
      <Flex gap="4" flexDirection="column">
        <Text textStyle="4xl">Dashboard</Text>
        <div></div>
      </Flex>
    </div>
  );
}
