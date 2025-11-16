import NavbarPublic from "@/components/ui/navbar/PublicNavbar";
import { Button, HStack } from "@chakra-ui/react";
import Link from "next/link";

function App() {
  return (
    <div>
      <h1>NutrySys Dashboard</h1>
      <Link href="/login" className="text-blue-400 underline">
        LOGIN
      </Link>
    </div>
  );
}

export default App;
