export type Language = 'ur' | 'ar' | 'en';
export type TextEffect = 'none' | 'glow' | 'carved' | 'luminous' | 'bold-texture';
export type FontTheme = 'default' | string;
export type PageTurnDirection = 'vertical' | 'horizontal';

export interface Hadees {
  id: number;
  bookId: string;
  chapterId: string;
  number: number;
  arabic: string;
  urdu: string;
  english: string;
  narrator: string;
  narrator_ur: string;
  narrator_ar: string;
  grade?: string;
  reference?: string;
}

export interface Chapter {
  id: string;
  bookId: string;
  number: number;
  title_ar: string;
  title_ur: string;
  title_en: string;
  hadeesCount: number;
}

export interface Book {
  id: string;
  title_ar: string;
  title_ur: string;
  title_en: string;
  author_ar: string;
  author_ur: string;
  author_en: string;
  totalHadees: number;
  color: string;
  icon: string;
  description_ur: string;
  description_en: string;
  chapters: Chapter[];
}

export interface AppSettings {
  language: Language;
  urduFont: string;
  arabicFont: string;
  englishFont: string;
  textEffect: TextEffect;
  fontSize: number;
  theme: 'dark' | 'light';
  autoplay: boolean;
  pageTurnDirection: PageTurnDirection;
  sidebarExpanded: boolean;
}

export interface CustomMedia {
  id: string;
  type: 'audio' | 'video' | 'image' | 'pdf' | 'document';
  title: string;
  description: string;
  url: string;
  size?: number;
  createdAt: string;
  tags: string[];
  enabled: boolean;
}

export interface LastReadPosition {
  bookId: string;
  chapterId: string;
  hadeesId: number;
  timestamp: number;
}

export interface AdminConfig {
  isAuthenticated: boolean;
  theme: string;
  appName_ur: string;
  appName_en: string;
  maintenanceMode: boolean;
}

export interface QuranAyah {
  number: number;
  arabic: string;
  urdu: string;
  english: string;
  juz: number;
}

export interface QuranSurah {
  number: number;
  name_ar: string;
  name_ur: string;
  name_en: string;
  meaning_ur: string;
  meaning_en: string;
  verses: number;
  revelation: 'Makki' | 'Madani';
  ayahs: QuranAyah[];
}

export interface MediaItem {
  id: string;
  type: 'audio' | 'video' | 'image';
  title: string;
  subtitle?: string;
  url: string;
  thumbnail?: string;
  duration?: number;
  size?: number;
  tags: string[];
}
