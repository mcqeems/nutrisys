import Squares from '@/components/Squares';
import { Button, HStack } from '@chakra-ui/react';
import Link from 'next/link';

function App() {
  return (
    <div className="relative w-screen min-h-screen bg-gray-900">
      <div className="absolute inset-0 z-0">
        <Squares speed={0.5} squareSize={40} direction="diagonal" borderColor="#21BF73" hoverFillColor="#333" />
      </div>

      <div className="relative z-10 p-8 text-white">
        <h1>NutrySys Dashboard</h1>
        <Link href="/login" className="text-blue-400 underline">
          LOGIN
        </Link>
      </div>

      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
    </div>
  );
}

export default App;
