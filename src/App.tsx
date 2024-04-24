import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import StarshipCard from './components/StarshipCard';
import StarshipsLoader from './components/StarshipsLoader';

export type Starship = {
  name: string;
  model: string;
  url: string;
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="starships" element={<StarshipsLoader />} />
        <Route path="starships/:id" element={<StarshipCard />} />
      </Routes>
    </QueryClientProvider>
  );
}
