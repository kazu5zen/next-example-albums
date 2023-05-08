import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Photo, fetchPhotos } from '../../../utils/api';
import Image from 'next/image'

const Photos: React.FC = () => {
  const router = useRouter();
  const albumId = router.query.albumId as string;
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!albumId) return;

    async function fetchData() {
      const data = await fetchPhotos(Number(albumId));
      setPhotos(data);
      setIsLoading(false);
    }
    fetchData();
  }, [albumId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">Photos</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <li key={photo.id} className="bg-white p-4 shadow-md rounded">
            <Link href={`/photos/${photo.id}`} className="flex flex-col items-center">
              <Image
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="mb-2 object-contain"
                width={150}
                height={150}
              />
              <p className="text-base font-medium text-blue-500 hover:text-blue-700">{photo.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photos;
