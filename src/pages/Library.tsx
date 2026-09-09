import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { SAMPLE_HADEES } from '@/data/hadeesData';
import { BOOKS } from '@/data/hadeesData';
import HadeesCard from '@/components/features/HadeesCard';
import GlowCard from '@/components/features/GlowCard';
import { CustomMedia } from '@/types';
import {
  Library as LibraryIcon, Upload, FileText, Music, Video, Image,
  Bookmark, Star, Clock, Edit3, Trash2, Eye, EyeOff, ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

type LibraryTab = 'bookmarks' | 'favorites' | 'lastread' | 'drafts' | 'media';

const Library = () => {
  const { t, settings, bookmarks, favorites, lastRead, drafts, saveDraft, isRTL } = useApp();
  const [tab, setTab] = useState<LibraryTab>('bookmarks');
  const [mediaItems, setMediaItems] = useState<CustomMedia[]>([]);
  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const engFont = { fontFamily: "'Orbitron', sans-serif" };
  const lf = settings.language !== 'en' ? urduFont : {};

  useEffect(() => {
    const saved = localStorage.getItem('ahadees_library');
    if (saved) setMediaItems(JSON.parse(saved));
  }, []);

  const saveMedia = (items: CustomMedia[]) => {
    setMediaItems(items);
    localStorage.setItem('ahadees_library', JSON.stringify(items));
  };

  const bookmarkedHadees = SAMPLE_HADEES.filter(h => bookmarks.includes(h.id));
  const favoriteBooks = BOOKS.filter(b => favorites.includes(b.id));

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const type = file.type.startsWith('audio') ? 'audio' :
      file.type.startsWith('video') ? 'video' :
      file.type.startsWith('image') ? 'image' :
      file.type === 'application/pdf' ? 'pdf' : 'document';
    const newItem: CustomMedia = {
      id: Date.now().toString(), type, title: file.name,
      description: '', url: URL.createObjectURL(file),
      size: file.size, createdAt: new Date().toISOString(), tags: [], enabled: true,
    };
    saveMedia([...mediaItems, newItem]);
    toast.success(settings.language === 'ur' ? 'فائل اپلوڈ ہو گئی!' : 'File uploaded!');
  };

  const toggleItem = (id: string) => saveMedia(mediaItems.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  const deleteItem = (id: string) => { saveMedia(mediaItems.filter(m => m.id !== id)); toast.success('Deleted!'); };

  const getIcon = (type: string) => {
    if (type === 'audio') return <Music size={20} className="text-red-400" />;
    if (type === 'video') return <Video size={20} className="text-red-400" />;
    if (type === 'image') return <Image size={20} className="text-red-400" />;
    return <FileText size={20} className="text-red-400" />;
  };

  const tabs: { id: LibraryTab; labelEn: string; labelUr: string; icon: any; count?: number }[] = [
    { id: 'bookmarks', labelEn: 'Bookmarks', labelUr: 'بُک مارکس', icon: Bookmark, count: bookmarks.length },
    { id: 'favorites', labelEn: 'Favorites', labelUr: 'پسندیدہ', icon: Star, count: favorites.length },
    { id: 'lastread', labelEn: 'Last Read', labelUr: 'آخری مطالعہ', icon: Clock },
    { id: 'drafts', labelEn: 'Drafts', labelUr: 'مسودے', icon: Edit3, count: Object.keys(drafts).length },
    { id: 'media', labelEn: 'Media', labelUr: 'میڈیا', icon: Upload, count: mediaItems.length },
  ];

  return (
    <div className={`pb-24 md:pb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <LibraryIcon size={18} className="text-red-400" />
          <h1 className="text-xl font-bold text-white glow-text-white" style={settings.language !== 'en' ? urduFont : engFont}>
            {t('myLibrary')}
          </h1>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-red-500 to-transparent rounded mt-2" />
      </div>

      {/* Tabs */}
      <div className="px-2 pt-1 pb-2 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1.5 min-w-max px-2">
          {tabs.map(tabItem => {
            const Icon = tabItem.icon;
            const active = tab === tabItem.id;
            return (
              <button
                key={tabItem.id}
                onClick={() => setTab(tabItem.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border transition-all min-h-[40px] whitespace-nowrap ${active ? 'bg-red-500/30 border-red-400/60 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-white/5 border-white/20 text-white/60 hover:border-red-500/30'}`}
              >
                <Icon size={13} />
                <span style={lf}>{settings.language === 'ur' ? tabItem.labelUr : tabItem.labelEn}</span>
                {tabItem.count !== undefined && tabItem.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-red-500/40 text-red-200' : 'bg-white/10 text-white/40'}`}>{tabItem.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookmarks */}
      {tab === 'bookmarks' && (
        <div className="px-4 space-y-4">
          {bookmarkedHadees.length === 0 ? (
            <GlowCard className="p-10 text-center" intensity="low">
              <Bookmark size={32} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/50 text-sm" style={lf}>{settings.language === 'ur' ? 'کوئی بُک مارک نہیں' : 'No bookmarks yet'}</p>
            </GlowCard>
          ) : bookmarkedHadees.map(h => <HadeesCard key={h.id} hadees={h} showBook />)}
        </div>
      )}

      {/* Favorites */}
      {tab === 'favorites' && (
        <div className="px-4 space-y-3">
          {favoriteBooks.length === 0 ? (
            <GlowCard className="p-10 text-center" intensity="low">
              <Star size={32} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/50 text-sm" style={lf}>{settings.language === 'ur' ? 'کوئی پسندیدہ کتاب نہیں' : 'No favorites yet'}</p>
              <Link to="/books" className="mt-3 inline-block text-xs text-red-300 underline" style={lf}>
                {settings.language === 'ur' ? 'کتابیں دیکھیں' : 'Browse Books'}
              </Link>
            </GlowCard>
          ) : favoriteBooks.map(book => (
            <Link key={book.id} to={`/books/${book.id}`}>
              <GlowCard className="p-4 hover:scale-[1.01] transition-transform" intensity="low">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${book.color} flex items-center justify-center text-2xl`}>{book.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white" style={lf}>
                      {settings.language === 'en' ? book.title_en : settings.language === 'ar' ? book.title_ar : book.title_ur}
                    </h3>
                    <p className="text-xs text-white/40">{book.totalHadees.toLocaleString()} hadees</p>
                  </div>
                  <ChevronRight size={16} className="text-red-400/60" />
                </div>
              </GlowCard>
            </Link>
          ))}
        </div>
      )}

      {/* Last Read */}
      {tab === 'lastread' && (
        <div className="px-4">
          {!lastRead ? (
            <GlowCard className="p-10 text-center" intensity="low">
              <Clock size={32} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/50 text-sm" style={lf}>{settings.language === 'ur' ? 'ابھی تک کچھ نہیں پڑھا' : 'Nothing read yet'}</p>
              <Link to="/books" className="mt-3 inline-block text-xs text-red-300 underline" style={lf}>
                {settings.language === 'ur' ? 'کتابیں دیکھیں' : 'Browse Books'}
              </Link>
            </GlowCard>
          ) : (
            <GlowCard className="p-5" intensity="medium">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={18} className="text-red-400" />
                <h3 className="text-sm font-bold text-white" style={lf}>{settings.language === 'ur' ? 'آخری مطالعہ' : 'Last Read Position'}</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-white/50" style={lf}>{settings.language === 'ur' ? 'کتاب' : 'Book'}:</span>
                  <span className="text-xs text-red-300">{lastRead.bookId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/50" style={lf}>{settings.language === 'ur' ? 'باب' : 'Chapter'}:</span>
                  <span className="text-xs text-red-300">{lastRead.chapterId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/50" style={lf}>{settings.language === 'ur' ? 'حدیث' : 'Hadees'}:</span>
                  <span className="text-xs text-red-300 font-mono">#{lastRead.hadeesId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/50" style={lf}>{settings.language === 'ur' ? 'وقت' : 'Time'}:</span>
                  <span className="text-xs text-white/40">{new Date(lastRead.timestamp).toLocaleString()}</span>
                </div>
              </div>
              <Link to={`/books/${lastRead.bookId}`}>
                <button className="mt-4 w-full py-2.5 rounded-xl bg-red-600/30 border border-red-500/40 text-red-300 text-sm hover:bg-red-500/40 transition-all min-h-[44px]" style={lf}>
                  {settings.language === 'ur' ? 'وہاں سے جاری رکھیں' : 'Continue Reading'} →
                </button>
              </Link>
            </GlowCard>
          )}
        </div>
      )}

      {/* Drafts */}
      {tab === 'drafts' && (
        <div className="px-4 space-y-3">
          {Object.keys(drafts).length === 0 ? (
            <GlowCard className="p-10 text-center" intensity="low">
              <Edit3 size={32} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/50 text-sm" style={lf}>{settings.language === 'ur' ? 'کوئی مسودہ نہیں' : 'No drafts yet'}</p>
            </GlowCard>
          ) : Object.entries(drafts).map(([id, content]) => (
            <GlowCard key={id} className="p-4" intensity="low">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-mono text-red-400/70 mb-1">{id}</p>
                  <p className="text-sm text-white/70" style={lf}>{String(content).slice(0, 100)}...</p>
                </div>
                <button onClick={() => saveDraft(id, '')} className="text-red-500/60 hover:text-red-400 transition-colors p-1">
                  <Trash2 size={14} />
                </button>
              </div>
            </GlowCard>
          ))}
        </div>
      )}

      {/* Media */}
      {tab === 'media' && (
        <div className="px-4 space-y-4">
          <div className="flex gap-3 flex-wrap">
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/30 border border-red-500/50 text-red-300 hover:bg-red-500/40 transition-all text-sm cursor-pointer min-h-[44px]">
              <Upload size={15} />
              <span style={lf}>{t('uploadFile')}</span>
              <input type="file" className="hidden" accept="audio/*,video/*,image/*,.pdf,.doc,.docx" onChange={handleUpload} />
            </label>
          </div>

          {mediaItems.length === 0 ? (
            <GlowCard className="p-10 text-center" intensity="low">
              <Upload size={32} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/50 text-sm" style={lf}>{settings.language === 'ur' ? 'کوئی فائل نہیں' : 'No files yet'}</p>
            </GlowCard>
          ) : (
            <div className="space-y-3">
              {mediaItems.map(item => (
                <GlowCard key={item.id} className="p-4" intensity="low">
                  <div className="flex items-start gap-3">
                    {getIcon(item.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{item.title}</p>
                      <p className="text-xs text-white/40 capitalize">{item.type}</p>
                      {item.size && <p className="text-xs text-white/30">{(item.size / 1024).toFixed(1)} KB</p>}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => toggleItem(item.id)} className="p-2 hover:bg-white/10 rounded-lg transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center">
                        {item.enabled ? <Eye size={14} className="text-red-300" /> : <EyeOff size={14} className="text-white/40" />}
                      </button>
                      <button onClick={() => deleteItem(item.id)} className="p-2 hover:bg-red-900/30 rounded-lg transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center">
                        <Trash2 size={14} className="text-red-500/70" />
                      </button>
                    </div>
                  </div>
                  {item.type === 'image' && item.enabled && <img src={item.url} alt={item.title} className="mt-3 rounded-lg max-h-40 object-cover w-full" />}
                  {item.type === 'audio' && item.enabled && <audio controls src={item.url} className="mt-3 w-full" />}
                  {item.type === 'video' && item.enabled && <video controls src={item.url} className="mt-3 rounded-lg w-full max-h-48" />}
                </GlowCard>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Library;
