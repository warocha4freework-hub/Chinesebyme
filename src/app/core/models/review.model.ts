export interface StudentReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  program: string; // e.g., "ต้าเหลียน 1 เดือน"
  images?: string[]; // Social post images if any
  postDate?: string;
  platform?: 'instagram' | 'facebook' | 'web';
}

export interface MemoryPhoto {
  id: string;
  imageUrl: string;
  caption: string;
}
