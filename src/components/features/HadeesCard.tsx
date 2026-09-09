import { Hadees } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { Copy, Share2, Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from 'sonner';
import GlowCard from './GlowCard';

interface HadeesCardProps {
  hadees: Hadees;
  showBook?: boolean;
}

const HadeesCard = ({ hadees, showBook = false }: HadeesCardProps) => {
  const { settings, t, bookmarks, toggleBookmark } = useApp();
  const isBookmarked = bookmarks.includes(hadees.id);
  const isRTL = settings.language === 'ur' || settings.language === 'ar';

  const getTextStyle = () => {
    const effects: Record<string, string> = {
      glow: 'text-shadow: 0 0 10px rgba(255,200,200,0.8), 0 0 20px rgba(239,68,68,0.5)',
      luminous: 'text-shadow: 0 0 5px rgba(255,255,255,0.9), 0 0 15px rgba(239,68,68,0.7)',
      carved: '',
      boldTexture: '',
      none: '',
    };
    return {};
  };

  const getArabicFont = () => {
    const fonts: Record<string, string> = {
      'amiri-ar': "'Amiri', serif",
      'scheherazade-ar': "'Scheherazade New', serif",
      'noto-naskh-ar': "'Noto Naskh Arabic', serif",
      'cairo': "'Cairo', sans-serif",
      'tajawal-ar': "'Tajawal', sans-serif",
      'lateef-ar': "'Lateef', serif",
      'reem-kufi-ar': "'Reem Kufi', sans-serif",
      'el-messiri-ar': "'El Messiri', sans-serif",
      'aref-ruqaa-ar': "'Aref Ruqaa', serif",
      'mada': "'Mada', sans-serif",
    };
    return fonts[settings.arabicFont] || "'Amiri', serif";
  };

  const getUrduFont = () => {
    const fonts: Record<string, string> = {
      'noto-nastaliq': "'Noto Nastaliq Urdu', serif",
      'amiri': "'Amiri', serif",
      'scheherazade': "'Scheherazade New', serif",
      'noto-naskh': "'Noto Naskh Arabic', serif",
      'mirza': "'Mirza', serif",
      'aref-ruqaa': "'Aref Ruqaa', serif",
      'lateef': "'Lateef', serif",
      'reem-kufi': "'Reem Kufi', sans-serif",
      'el-messiri': "'El Messiri', sans-serif",
      'tajawal': "'Tajawal', sans-serif",
    };
    return fonts[settings.urduFont] || "'Noto Nastaliq Urdu', serif";
  };

  const getEnglishFont = () => {
    const fonts: Record<string, string> = {
      'orbitron': "'Orbitron', sans-serif",
      'rajdhani': "'Rajdhani', sans-serif",
      'exo2': "'Exo 2', sans-serif",
      'roboto': "'Roboto', sans-serif",
      'oswald': "'Oswald', sans-serif",
      'montserrat': "'Montserrat', sans-serif",
      'nunito': "'Nunito', sans-serif",
      'poppins': "'Poppins', sans-serif",
      'space-grotesk': "'Space Grotesk', sans-serif",
      'inter': "'Inter', sans-serif",
    };
    return fonts[settings.englishFont] || "'Orbitron', sans-serif";
  };

  const effectClass = {
    glow: 'hadees-glow-effect',
    luminous: 'hadees-luminous-effect',
    carved: 'hadees-carved-effect',
    'bold-texture': 'hadees-bold-effect',
    none: '',
  }[settings.textEffect] || '';

  const handleCopy = () => {
    const text = settings.language === 'ar'
      ? hadees.arabic
      : settings.language === 'ur'
      ? `${hadees.arabic}\n\n${hadees.urdu}`
      : `${hadees.arabic}\n\n${hadees.english}`;
    navigator.clipboard.writeText(text);
    toast.success(t('copiedToClipboard'));
  };

  const handleShare = async () => {
    const text = `${hadees.arabic}\n\n${hadees.urdu}\n\n${hadees.english}\n\n- ${hadees.reference}`;
    if (navigator.share) {
      await navigator.share({ title: t('appName'), text });
    } else {
      navigator.clipboard.writeText(text);
      toast.success(t('copiedToClipboard'));
    }
  };

  return (
    <GlowCard className="p-5 space-y-4">
      {/* Hadees Number Badge */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono glow-text-red">
          {t('hadithNumber')} {hadees.number}
        </span>
        {showBook && (
          <span className="text-xs text-white/40 font-mono">{hadees.reference}</span>
        )}
      </div>

      {/* Arabic Text */}
      <div className={`text-right leading-[2.2] ${effectClass}`} dir="rtl">
        <p
          className="text-white/95 leading-[2.5]"
          style={{
            fontFamily: getArabicFont(),
            fontSize: `${Math.max(settings.fontSize + 2, 20)}px`,
          }}
        >
          {hadees.arabic}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-red-500/20" />

      {/* Translation */}
      {settings.language === 'ur' && (
        <div className={`text-right leading-loose ${effectClass}`} dir="rtl">
          <p
            className="text-white/85"
            style={{
              fontFamily: getUrduFont(),
              fontSize: `${settings.fontSize}px`,
              lineHeight: '2.2',
            }}
          >
            {hadees.urdu}
          </p>
        </div>
      )}
      {settings.language === 'en' && (
        <div className={effectClass}>
          <p
            className="text-white/85 leading-relaxed"
            style={{
              fontFamily: getEnglishFont(),
              fontSize: `${settings.fontSize}px`,
            }}
          >
            {hadees.english}
          </p>
        </div>
      )}
      {settings.language === 'ar' && (
        <div className={`text-right leading-loose ${effectClass}`} dir="rtl">
          <p
            className="text-white/85"
            style={{
              fontFamily: getArabicFont(),
              fontSize: `${settings.fontSize}px`,
              lineHeight: '2.2',
            }}
          >
            {hadees.urdu}
          </p>
        </div>
      )}

      {/* Narrator & Grade */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-red-300/80 bg-red-900/20 px-2 py-1 rounded border border-red-500/20">
          {t('narrator')}: {settings.language === 'ur' ? hadees.narrator_ur : settings.language === 'ar' ? hadees.narrator_ar : hadees.narrator}
        </span>
        {hadees.grade && (
          <span className="text-xs text-emerald-300/80 bg-emerald-900/20 px-2 py-1 rounded border border-emerald-500/20">
            {hadees.grade}
          </span>
        )}
        <span className="text-xs text-white/40 ml-auto font-mono">{hadees.reference}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1 border-t border-white/10">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-white/60 hover:text-red-300 transition-colors min-w-[44px] min-h-[44px] justify-center"
        >
          <Copy size={14} />
          <span>{t('copy')}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs text-white/60 hover:text-red-300 transition-colors min-w-[44px] min-h-[44px] justify-center"
        >
          <Share2 size={14} />
          <span>{t('share')}</span>
        </button>
        <button
          onClick={() => { toggleBookmark(hadees.id); toast.success(isBookmarked ? 'Removed' : t('bookmarked')); }}
          className={`flex items-center gap-1.5 text-xs transition-colors min-w-[44px] min-h-[44px] justify-center ml-auto ${isBookmarked ? 'text-red-400' : 'text-white/60 hover:text-red-300'}`}
        >
          {isBookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          <span>{t('bookmark')}</span>
        </button>
      </div>
    </GlowCard>
  );
};

export default HadeesCard;
