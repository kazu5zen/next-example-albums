import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export async function fetchAlbums(): Promise<Album[]> {
  const response = await axios.get<Album[]>(`${API_BASE_URL}/albums`);
  return response.data;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export async function fetchPhotos(albumId: number): Promise<Photo[]> {
  const response = await axios.get<Photo[]>(`${API_BASE_URL}/albums/${albumId}/photos`);
  return response.data;
}

export async function fetchPhoto(photoId: number): Promise<Photo> {
  const response = await axios.get<Photo>(`${API_BASE_URL}/photos/${photoId}`);
  return response.data;
}
