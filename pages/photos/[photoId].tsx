import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Photo, fetchPhoto } from '../../utils/api';
import Image from 'next/image'

const PhotoPage: React.FC = () => {
  const router = useRouter();
  const photoId = router.query.photoId as string;
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!photoId) return;
    async function fetchData() {
      const data = await fetchPhoto(Number(photoId));
      setPhoto(data);
      setIsLoading(false);
    }
    fetchData();
  }, [photoId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!photo) {
    return <div>Photo not found</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">{photo.title}</h1>
      <Image
        src={photo.url}
        alt={photo.title}
        className="w-full max-w-md mx-auto mb-4 object-contain"
        fill
      />
      <p className="text-lg font-semibold">Album ID: {photo.albumId}</p>
    </div>
  );
};

export default PhotoPage;
