import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Album, fetchAlbums } from '../../utils/api';

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAlbums();
      setAlbums(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">Albums</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {albums.map((album) => (
          <li key={album.id} className="bg-white p-4 shadow-md rounded">
            <Link href={`/albums/${album.id}/photos`} className="text-xl font-semibold text-blue-500 hover:text-blue-700">
              {album.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
