import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import GlowCard from '@/components/features/GlowCard';
import { Image, Video, Grid, List, X, ZoomIn, ChevronLeft, ChevronRight, Heart, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  url: string;
  tags: string[];
}

const SAMPLE_GALLERY: GalleryItem[] = [
  { id: '1', type: 'image', title: 'مسجد الحرام', url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80', tags: ['مسجد', 'مکہ'] },
  { id: '2', type: 'image', title: 'مسجد نبوی', url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80', tags: ['مدینہ', 'نبوی'] },
  { id: '3', type: 'image', title: 'قرآن مجید', url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80', tags: ['قرآن', 'کتاب'] },
  { id: '4', type: 'image', title: 'رات کی نماز', url: 'https://images.unsplash.com/photo-1470162656305-197566f2a1d4?w=600&q=80', tags: ['نماز', 'رات'] },
  { id: '5', type: 'image', title: 'اسلامی فن', url: 'https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=600&q=80', tags: ['فن', 'آرٹ'] },
  { id: '6', type: 'image', title: 'خوشنویسی', url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80', tags: ['خط', 'عربی'] },
  { id: '7', type: 'image', title: 'گنبد الصخرہ', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80', tags: ['القدس', 'مسجد'] },
  { id: '8', type: 'image', title: 'ہلال چاند', url: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=600&q=80', tags: ['چاند', 'رمضان'] },
  { id: '9', type: 'image', title: 'تسبیح', url: 'https://images.unsplash.com/photo-1614121977735-a67fa1a6a0cd?w=600&q=80', tags: ['تسبیح', 'ذکر'] },
];

const Gallery = () => {
  const { settings, isRTL } = useApp();
  const [items] = useState<GalleryItem[]>(SAMPLE_GALLERY);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [favorites, setFavs] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const lf = settings.language !== 'en' ? urduFont : {};

  const filtered = items.filter(i => filter === 'all' || i.type === filter);
  const selectedIdx = selected ? filtered.findIndex(i => i.id === selected.id) : -1;

  const toggleFav = (id: string) => setFavs(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const handleShare = async (item: GalleryItem) => {
    if (navigator.share) {
      await navigator.share({ title: item.title, url: item.url });
    } else {
      navigator.clipboard.writeText(item.url);
      toast.success('Link copied!');
    }
  };

  const handleDownload = (item: GalleryItem) => {
    const a = document.createElement('a');
    a.href = item.url;
    a.download = `${item.title}.jpg`;
    a.target = '_blank';
    a.click();
    toast.success(settings.language === 'ur' ? 'ڈاؤنلوڈ شروع ہو گیا' : 'Downloading...');
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.multiple = true;
    input.onchange = () => {
      const files = input.files;
      if (files?.length) toast.success(`${files.length} ${settings.language === 'ur' ? 'فائلیں منتخب' : 'files selected'}`);
    };
    input.click();
  };

  return (
    <div className={`pb-24 md:pb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-white glow-text-white" style={lf}>
            {settings.language === 'ur' ? 'گیلری' : 'Gallery'}
          </h1>
          <div className="flex gap-2">
            <button onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')} className="p-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 min-w-[36px] min-h-[36px] flex items-center justify-center">
              {viewMode === 'grid' ? <List size={14} /> : <Grid size={14} />}
            </button>
            <button onClick={handleUpload} className="px-3 py-1.5 rounded-lg bg-red-600/30 border border-red-500/40 text-red-300 text-xs min-h-[36px]" style={lf}>
              + {settings.language === 'ur' ? 'شامل' : 'Add'}
            </button>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-red-500 to-transparent rounded mt-2" />
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mt-3 flex gap-2">
        {[
          { id: 'all' as const, label: settings.language === 'ur' ? 'سب' : 'All' },
          { id: 'image' as const, label: settings.language === 'ur' ? 'تصاویر' : 'Images' },
          { id: 'video' as const, label: settings.language === 'ur' ? 'ویڈیو' : 'Videos' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-1.5 rounded-xl text-xs transition-all min-h-[36px] ${filter === tab.id ? 'bg-red-500/30 border border-red-400/60 text-red-300' : 'bg-white/5 border border-white/10 text-white/50'}`}
            style={lf}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid View */}
      <div className="px-4 mt-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-2">
            {filtered.map(item => (
              <div
                key={item.id}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelected(item)}
              >
                <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <p className="text-white text-xs truncate" style={urduFont}>{item.title}</p>
                </div>
                {favorites.includes(item.id) && (
                  <div className="absolute top-1.5 right-1.5">
                    <Heart size={12} className="fill-red-400 text-red-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(item => (
              <GlowCard key={item.id} className="p-3" intensity="low" onClick={() => setSelected(item)}>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium" style={urduFont}>{item.title}</p>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-900/30 border border-red-500/20 text-red-300/70" style={urduFont}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={e => { e.stopPropagation(); toggleFav(item.id); }} className="text-white/40 hover:text-red-300 transition-colors">
                      <Heart size={14} className={favorites.includes(item.id) ? 'fill-red-400 text-red-400' : ''} />
                    </button>
                    <button onClick={e => { e.stopPropagation(); handleDownload(item); }} className="text-white/40 hover:text-red-300 transition-colors">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col" onClick={() => setSelected(null)}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 z-10" onClick={e => e.stopPropagation()}>
            <p className="text-white font-medium" style={urduFont}>{selected.title}</p>
            <div className="flex gap-2">
              <button onClick={() => toggleFav(selected.id)} className="p-2 rounded-lg bg-white/10 min-w-[40px] min-h-[40px] flex items-center justify-center">
                <Heart size={16} className={favorites.includes(selected.id) ? 'fill-red-400 text-red-400' : 'text-white/60'} />
              </button>
              <button onClick={() => handleShare(selected)} className="p-2 rounded-lg bg-white/10 min-w-[40px] min-h-[40px] flex items-center justify-center">
                <Share2 size={16} className="text-white/60" />
              </button>
              <button onClick={() => handleDownload(selected)} className="p-2 rounded-lg bg-white/10 min-w-[40px] min-h-[40px] flex items-center justify-center">
                <Download size={16} className="text-white/60" />
              </button>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg bg-red-500/30 min-w-[40px] min-h-[40px] flex items-center justify-center">
                <X size={16} className="text-red-300" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center p-4" onClick={e => e.stopPropagation()}>
            <img src={selected.url} alt={selected.title} className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Nav Arrows */}
          <div className="absolute inset-y-0 left-4 flex items-center" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelected(filtered[(selectedIdx - 1 + filtered.length) % filtered.length])}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelected(filtered[(selectedIdx + 1) % filtered.length])}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
