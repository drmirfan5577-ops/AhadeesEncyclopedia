import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, AppSettings, TextEffect, LastReadPosition } from '@/types';

interface AppContextType {
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  t: (key: string) => string;
  isRTL: boolean;
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  lastRead: LastReadPosition | null;
  setLastRead: (pos: LastReadPosition) => void;
  drafts: Record<string, string>;
  saveDraft: (id: string, content: string) => void;
  isAdminAuthenticated: boolean;
  setAdminAuthenticated: (val: boolean) => void;
}

const defaultSettings: AppSettings = {
  language: 'ur',
  urduFont: 'noto-nastaliq',
  arabicFont: 'amiri-ar',
  englishFont: 'orbitron',
  textEffect: 'glow',
  fontSize: 18,
  theme: 'dark',
  autoplay: false,
  pageTurnDirection: 'vertical',
  sidebarExpanded: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('ahadees_settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    const saved = localStorage.getItem('ahadees_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('ahadees_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [lastRead, setLastReadState] = useState<LastReadPosition | null>(() => {
    const saved = localStorage.getItem('ahadees_last_read');
    return saved ? JSON.parse(saved) : null;
  });

  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('ahadees_drafts');
    return saved ? JSON.parse(saved) : {};
  });

  const [isAdminAuthenticated, setAdminAuth] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });

  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    import('@/data/translations').then(({ translations: t }) => {
      setTranslations(t[settings.language] || t.en);
    });
  }, [settings.language]);

  useEffect(() => {
    localStorage.setItem('ahadees_settings', JSON.stringify(settings));
    // Apply theme to document
    if (settings.theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [settings]);

  useEffect(() => { localStorage.setItem('ahadees_bookmarks', JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem('ahadees_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { if (lastRead) localStorage.setItem('ahadees_last_read', JSON.stringify(lastRead)); }, [lastRead]);
  useEffect(() => { localStorage.setItem('ahadees_drafts', JSON.stringify(drafts)); }, [drafts]);

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }));
  };

  const t = (key: string): string => translations[key] || key;
  const isRTL = settings.language === 'ur' || settings.language === 'ar';

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const setLastRead = (pos: LastReadPosition) => setLastReadState(pos);

  const saveDraft = (id: string, content: string) => {
    setDrafts(prev => ({ ...prev, [id]: content }));
  };

  const setAdminAuthenticated = (val: boolean) => {
    setAdminAuth(val);
    if (val) sessionStorage.setItem('admin_auth', 'true');
    else sessionStorage.removeItem('admin_auth');
  };

  return (
    <AppContext.Provider value={{
      settings, updateSettings, t, isRTL,
      bookmarks, toggleBookmark,
      favorites, toggleFavorite,
      lastRead, setLastRead,
      drafts, saveDraft,
      isAdminAuthenticated, setAdminAuthenticated,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
