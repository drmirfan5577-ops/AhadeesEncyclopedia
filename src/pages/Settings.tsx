import { useApp } from '@/contexts/AppContext';
import { URDU_FONTS, ARABIC_FONTS, ENGLISH_FONTS } from '@/data/translations';
import GlowCard from '@/components/features/GlowCard';
import { TextEffect } from '@/types';
import { Settings2, Type, Palette, Globe, Sliders, Download, Upload } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const { settings, updateSettings, t, isRTL } = useApp();
  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const engFont = { fontFamily: "'Orbitron', sans-serif" };

  const effects: { id: TextEffect; label_en: string; label_ur: string }[] = [
    { id: 'none', label_en: 'None', label_ur: 'بغیر اثر' },
    { id: 'glow', label_en: 'Glow', label_ur: 'چمک' },
    { id: 'luminous', label_en: 'Luminous', label_ur: 'روشن' },
    { id: 'carved', label_en: 'Carved 4D', label_ur: 'نقش 4D' },
    { id: 'bold-texture', label_en: 'Bold Texture', label_ur: 'گہری ساخت' },
  ];

  const languages = [
    { id: 'ur', label: 'اردو', sub: 'Urdu' },
    { id: 'ar', label: 'العربية', sub: 'Arabic' },
    { id: 'en', label: 'English', sub: '' },
  ];

  const exportSettings = () => {
    const data = {
      settings,
      bookmarks: JSON.parse(localStorage.getItem('ahadees_bookmarks') || '[]'),
      library: JSON.parse(localStorage.getItem('ahadees_library') || '[]'),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ahadees_backup.json';
    a.click();
    toast.success('Exported successfully!');
  };

  const importSettings = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          if (data.settings) updateSettings(data.settings);
          if (data.bookmarks) localStorage.setItem('ahadees_bookmarks', JSON.stringify(data.bookmarks));
          if (data.library) localStorage.setItem('ahadees_library', JSON.stringify(data.library));
          toast.success('Imported successfully!');
          window.location.reload();
        } catch {
          toast.error('Invalid file format');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className={`pb-24 md:pb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <Settings2 size={18} className="text-red-400" />
          <h1 className="text-xl font-bold text-white glow-text-white" style={settings.language !== 'en' ? urduFont : engFont}>
            {t('settings')}
          </h1>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-red-500 to-transparent rounded mt-2" />
      </div>

      <div className="px-4 space-y-5 mt-4">
        {/* Language */}
        <GlowCard className="p-4" intensity="medium">
          <div className="flex items-center gap-2 mb-3">
            <Globe size={16} className="text-red-400" />
            <h2 className="text-sm font-bold text-white" style={settings.language !== 'en' ? urduFont : {}}>{t('language')}</h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {languages.map(lang => (
              <button
                key={lang.id}
                onClick={() => updateSettings({ language: lang.id as any })}
                className={`p-3 rounded-xl border transition-all text-center min-h-[60px] ${
                  settings.language === lang.id
                    ? 'bg-red-500/30 border-red-400/60 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                    : 'bg-white/5 border-white/20 hover:border-red-500/40'
                }`}
              >
                <div className="text-lg text-white font-bold">{lang.label}</div>
                {lang.sub && <div className="text-xs text-white/50">{lang.sub}</div>}
              </button>
            ))}
          </div>
        </GlowCard>

        {/* Text Effects */}
        <GlowCard className="p-4" intensity="medium">
          <div className="flex items-center gap-2 mb-3">
            <Palette size={16} className="text-red-400" />
            <h2 className="text-sm font-bold text-white" style={settings.language !== 'en' ? urduFont : {}}>{t('textEffect')}</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {effects.map(ef => (
              <button
                key={ef.id}
                onClick={() => updateSettings({ textEffect: ef.id })}
                className={`p-3 rounded-xl border transition-all text-center min-h-[50px] ${
                  settings.textEffect === ef.id
                    ? 'bg-red-500/30 border-red-400/60 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                    : 'bg-white/5 border-white/20 hover:border-red-500/40'
                }`}
              >
                <span className={`text-sm ${
                  ef.id === 'glow' ? 'hadees-glow-effect text-white' :
                  ef.id === 'luminous' ? 'hadees-luminous-effect text-white' :
                  ef.id === 'carved' ? 'hadees-carved-effect text-white' :
                  ef.id === 'bold-texture' ? 'hadees-bold-effect text-white' :
                  'text-white/80'
                }`} style={settings.language === 'ur' ? urduFont : {}}>
                  {settings.language === 'ur' ? ef.label_ur : ef.label_en}
                </span>
              </button>
            ))}
          </div>

          {/* Effect Preview */}
          <div className="mt-4 p-3 rounded-lg bg-black/30 border border-red-500/20">
            <p className={`text-center text-base ${settings.textEffect === 'glow' ? 'hadees-glow-effect' : settings.textEffect === 'luminous' ? 'hadees-luminous-effect' : settings.textEffect === 'carved' ? 'hadees-carved-effect' : settings.textEffect === 'bold-texture' ? 'hadees-bold-effect' : ''} text-white`}
              style={{ fontFamily: "'Amiri', serif", fontSize: '22px' }} dir="rtl">
              إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ
            </p>
          </div>
        </GlowCard>

        {/* Font Size */}
        <GlowCard className="p-4" intensity="medium">
          <div className="flex items-center gap-2 mb-3">
            <Sliders size={16} className="text-red-400" />
            <h2 className="text-sm font-bold text-white" style={settings.language !== 'en' ? urduFont : {}}>{t('fontSize')}</h2>
            <span className="ml-auto text-red-300 font-mono text-sm">{settings.fontSize}px</span>
          </div>
          <input
            type="range"
            min={14}
            max={28}
            value={settings.fontSize}
            onChange={e => updateSettings({ fontSize: Number(e.target.value) })}
            className="w-full accent-red-500"
          />
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>14</span>
            <span>28</span>
          </div>
        </GlowCard>

        {/* Urdu Fonts */}
        <GlowCard className="p-4" intensity="low">
          <div className="flex items-center gap-2 mb-3">
            <Type size={16} className="text-red-400" />
            <h2 className="text-sm font-bold text-white" style={urduFont}>{t('urduFont')}</h2>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {URDU_FONTS.map(font => (
              <button
                key={font.id}
                onClick={() => updateSettings({ urduFont: font.id })}
                className={`w-full p-2.5 rounded-lg border transition-all text-right flex items-center justify-between min-h-[44px] ${
                  settings.urduFont === font.id
                    ? 'bg-red-500/20 border-red-400/50 shadow-[0_0_8px_rgba(239,68,68,0.3)]'
                    : 'bg-white/5 border-white/10 hover:border-red-500/30'
                }`}
              >
                <span className="text-xs text-white/40">{font.name}</span>
                <span className="text-sm text-white" style={{ fontFamily: font.family }}>احادیث مبارکہ</span>
              </button>
            ))}
          </div>
        </GlowCard>

        {/* Arabic Fonts */}
        <GlowCard className="p-4" intensity="low">
          <div className="flex items-center gap-2 mb-3">
            <Type size={16} className="text-red-400" />
            <h2 className="text-sm font-bold text-white" style={urduFont}>{t('arabicFont')}</h2>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {ARABIC_FONTS.map(font => (
              <button
                key={font.id}
                onClick={() => updateSettings({ arabicFont: font.id })}
                className={`w-full p-2.5 rounded-lg border transition-all text-right flex items-center justify-between min-h-[44px] ${
                  settings.arabicFont === font.id
                    ? 'bg-red-500/20 border-red-400/50'
                    : 'bg-white/5 border-white/10 hover:border-red-500/30'
                }`}
              >
                <span className="text-xs text-white/40">{font.name}</span>
                <span className="text-sm text-white" style={{ fontFamily: font.family }}>إِنَّمَا الأَعْمَالُ</span>
              </button>
            ))}
          </div>
        </GlowCard>

        {/* English Fonts */}
        <GlowCard className="p-4" intensity="low">
          <div className="flex items-center gap-2 mb-3">
            <Type size={16} className="text-red-400" />
            <h2 className="text-sm font-bold text-white">{t('englishFont')}</h2>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {ENGLISH_FONTS.map(font => (
              <button
                key={font.id}
                onClick={() => updateSettings({ englishFont: font.id })}
                className={`w-full p-2.5 rounded-lg border transition-all flex items-center justify-between min-h-[44px] ${
                  settings.englishFont === font.id
                    ? 'bg-red-500/20 border-red-400/50'
                    : 'bg-white/5 border-white/10 hover:border-red-500/30'
                }`}
              >
                <span className="text-xs text-white/40">{font.name}</span>
                <span className="text-sm text-white" style={{ fontFamily: font.family }}>Ahadees</span>
              </button>
            ))}
          </div>
        </GlowCard>

        {/* Export / Import */}
        <GlowCard className="p-4" intensity="low">
          <h2 className="text-sm font-bold text-white mb-3" style={settings.language !== 'en' ? urduFont : {}}>
            {t('export')} / {t('import')}
          </h2>
          <div className="flex gap-3">
            <button
              onClick={exportSettings}
              className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-red-600/30 border border-red-500/50 text-red-300 hover:bg-red-500/40 transition-all text-sm min-h-[44px]"
            >
              <Download size={16} />
              <span style={settings.language !== 'en' ? urduFont : {}}>{t('export')}</span>
            </button>
            <button
              onClick={importSettings}
              className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-all text-sm min-h-[44px]"
            >
              <Upload size={16} />
              <span style={settings.language !== 'en' ? urduFont : {}}>{t('import')}</span>
            </button>
          </div>
        </GlowCard>
      </div>
    </div>
  );
};

export default Settings;
