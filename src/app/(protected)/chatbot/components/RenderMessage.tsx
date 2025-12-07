'use client';

import { Text, Link as ChakraLink } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import NextLink from 'next/link';

export const RenderMessage = ({ content, isUser }: { content: string; isUser: boolean }) => {
  const linkColor = useColorModeValue('blue.500', 'blue.300');
  const linkHover = useColorModeValue('blue.600', 'blue.400');

  const parts = content.split(/(\*\*\[[^\]]+\]\([^)]+\)\*\*|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        const boldLinkMatch = part.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*$/);
        if (boldLinkMatch) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, text, url] = boldLinkMatch;
          return (
            <ChakraLink
              key={index}
              as={NextLink}
              href={url}
              color={isUser ? 'white' : linkColor}
              textDecoration="underline"
              fontWeight="bold"
              _hover={{ color: isUser ? 'gray.200' : linkHover }}
              transition="all"
            >
              {text}
            </ChakraLink>
          );
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, text, url] = linkMatch;
          return (
            <ChakraLink
              key={index}
              as={NextLink}
              href={url}
              color={isUser ? 'white' : linkColor}
              textDecoration="underline"
              _hover={{ color: isUser ? 'gray.200' : linkHover }}
              transition="all"
            >
              {text}
            </ChakraLink>
          );
        }
        const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
        if (boldMatch) {
          return (
            <Text as="span" fontWeight="bold" key={index}>
              {boldMatch[1]}
            </Text>
          );
        }
        const italicMatch = part.match(/^\*([^*]+)\*$/);
        if (italicMatch) {
          return (
            <Text as="span" fontStyle="italic" key={index}>
              {italicMatch[1]}
            </Text>
          );
        }
        return part;
      })}
    </>
  );
};
