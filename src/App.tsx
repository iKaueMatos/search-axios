import { useState } from 'react';
import './App.css';
import { useAxios } from './hook/SearchAxios';

interface Repository {
  name: string;
  description: string;
}

interface Error {
  message: string;
}

export function App() {
  const { data: repositories, loading, error }: { data: Repository[], loading: boolean, error: Error | null } = useAxios('https://api.github.com/users/ikauematos/repos');
  const [search, setSearch] = useState<string>('');

  if (loading) {
    return <div className='w-full bg-orange-400 text-white h-screen font-bold items-center flex justify-center'>Carregando...</div>;
  }

  if (error) {
    return <div className='w-full bg-orange-400 text-white h-screen font-bold items-center flex justify-center'>Ocorreu um erro: {error.message}</div>;
  }

  const filterRepositories: Repository[] = search.length > 0 ?
    repositories.filter((repo: Repository) => repo.name.includes(search)) : repositories;

  return (
    <div className="bg-orange-500 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-white">GitHub Repositories</h1>

        <div className="flex items-center space-x-4 mb-4">
          <input 
            type="text" 
            className="border p-2 rounded-md flex-1" 
            placeholder="Buscar repositório"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterRepositories.map((repo: Repository) => (
            <li key={repo.name} className="bg-white shadow-md p-4 rounded-md">
              <h2 className="text-xl font-semibold">{repo.name}</h2>
              <p className="text-gray-600">{repo.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
