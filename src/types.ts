export interface Poet {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  isVerified?: boolean;
}

export interface PoetryPost {
  id: number;
  text: string;
  poetName: string;
  category: string;
  photoUrl?: string;
  videoUrl?: string;
  formattedDate: string;
  viewsCount: string;
  mediaType: "NONE" | "PHOTO" | "VIDEO" | "DESIGNED_POSTER";
  isDesignedPoster?: boolean;
  authorName: string;
  timestamp: number;
}

export interface TelegramAdmin {
  id: string;
  name: string;
  username: string;
  role: string;
  avatar?: string;
  followers?: string;
  bio?: string;
  whatsapp?: string;
  facebook?: string;
  youtube?: string;
  instagram?: string;
  tiktok?: string;
  twitterX?: string;
  phone?: string;
  website?: string;
  isVerified?: boolean;
  isBlocked?: boolean;
}

export interface FeaturedSlide {
  id: number;
  poet: string;
  category: string;
  avatar: string;
  verse: string;
  bgUrl: string;
}
