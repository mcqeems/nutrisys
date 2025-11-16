import Link from 'next/link';

function App() {
  return (
    <div>
      <h1>NutrySys Homepage</h1>
      <Link href="/login" className="text-blue-400 underline">
        LOGIN
      </Link>
    </div>
  );
}

export default App;
