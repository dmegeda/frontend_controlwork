import { Picture } from './picture';

export interface ArtGallery {
  id: number;
  name: string;
  address: string;
  pictures: Picture[];
}
