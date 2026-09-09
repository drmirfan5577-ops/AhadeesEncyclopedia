import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { BOOKS, SAMPLE_HADEES } from '@/data/hadeesData';
import GlowCard from '@/components/features/GlowCard';
import HadeesCard from '@/components/features/HadeesCard';
import { BookOpen, Search, Sparkles, ChevronRight, BookMarked, Music, Image, Sun } from 'lucide-react';
import heroImg from '@/assets/hero-banner.jpg';

const Index = () => {
  const { t, settings, isRTL, updateSettings } = useApp();
  const dailyHadees = SAMPLE_HADEES[new Date().getDate() % SAMPLE_HADEES.length];
  const isLight = settings.theme === 'light';

  const urduFontStyle = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const arabicFontStyle = { fontFamily: "'Amiri', serif" };
  const englishFontStyle = { fontFamily: "'Orbitron', sans-serif" };
  const lf = settings.language !== 'en' ? urduFontStyle : englishFontStyle;

  // Super Bright Launcher Displays
  const launchers = [
    {
      to: '/books',
      icon: '📖',
      labelUr: 'احادیث کتابیں',
      labelEn: 'Hadees Books',
      count: `${BOOKS.length} Books`,
      gradient: 'from-red-600 to-rose-800',
    },
    {
      to: '/quran',
      icon: '🕌',
      labelUr: 'قرآن کریم',
      labelEn: 'Quran Kareem',
      count: '114 Surahs',
      gradient: 'from-rose-600 to-red-900',
    },
    {
      to: '/media',
      icon: '🎵',
      labelUr: 'آڈیو / ویڈیو',
      labelEn: 'Audio / Video',
      count: 'Media Player',
      gradient: 'from-red-700 to-rose-700',
    },
    {
      to: '/gallery',
      icon: '🖼️',
      labelUr: 'گیلری',
      labelEn: 'Gallery',
      count: '9+ Images',
      gradient: 'from-rose-700 to-red-800',
    },
  ];

  return (
    <div className={`pb-20 md:pb-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[50vw] md:min-h-[300px] max-h-[440px] flex items-end">
        <img src={heroImg} alt="Ahadees Encyclopedia" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0005] via-[#0a000580] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent glow-line" />
        {/* Scan line effect */}
        <div className="scan-line" />

        <div className="relative z-10 px-5 pb-6 md:px-10 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/50 mb-3 shadow-[0_0_12px_rgba(239,68,68,0.4)]">
              <Sparkles size={12} className="text-red-300" />
              <span className="text-xs text-red-300 font-mono">احادیث انسائیکلوپیڈیا v2.0</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 hero-title-carved leading-tight" style={lf}>
              {t('appName')}
            </h1>
            <p className="text-white/70 text-sm md:text-base mb-5" style={lf}>{t('appSubtitle')}</p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/books" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(239,68,68,0.6)] border border-red-400/50 min-h-[44px]">
                <BookOpen size={16} />
                <span style={lf}>{t('books')}</span>
              </Link>
              <Link to="/quran" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20 min-h-[44px] backdrop-blur-sm">
                <BookMarked size={16} />
                <span style={lf}>{settings.language === 'ur' ? 'قرآن' : 'Quran'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 md:px-6 space-y-6 mt-5">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: settings.language === 'ur' ? 'کتب' : 'Books', value: BOOKS.length },
            { label: settings.language === 'ur' ? 'کل احادیث' : 'Total Hadees', value: '62K+' },
            { label: settings.language === 'ur' ? 'زبانیں' : 'Languages', value: 3 },
          ].map((stat, i) => (
            <GlowCard key={i} className="p-3 text-center" intensity="low">
              <div className="text-2xl font-bold text-red-300 glow-text-red" style={englishFontStyle}>{stat.value}</div>
              <div className="text-xs text-white/60 mt-1" style={lf}>{stat.label}</div>
            </GlowCard>
          ))}
        </div>

        {/* Super Bright Dynamic Launcher Displays */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white glow-text-white" style={lf}>
              {settings.language === 'ur' ? '🌟 فوری رسائی لانچرز' : '🌟 Quick Launchers'}
            </h2>
            {/* Theme toggle in launchers row */}
            <button
              onClick={() => updateSettings({ theme: isLight ? 'dark' : 'light' })}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs min-h-[36px]"
            >
              <Sun size={12} />
              <span className="text-[11px]">{isLight ? 'Dark' : 'Light'}</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {launchers.map((launcher, i) => (
              <Link key={i} to={launcher.to}>
                <div className="launcher-display relative overflow-hidden p-4 min-h-[100px] flex flex-col justify-between hover:scale-[1.03] transition-transform">
                  {/* Scan line on launcher */}
                  <div className="scan-line opacity-50" />
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{launcher.icon}</span>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${launcher.gradient} animate-pulse`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-tight" style={lf}>
                      {settings.language === 'ur' ? launcher.labelUr : launcher.labelEn}
                    </p>
                    <p className="text-[10px] text-red-300/70 mt-0.5 font-mono">{launcher.count}</p>
                  </div>
                  {/* LED edge glow effect */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${launcher.gradient} opacity-70`} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Daily Hadees */}
        <section>
          <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-sm font-bold text-white glow-text-white" style={lf}>{t('dailyHadees')}</h2>
            <div className="w-8 h-[2px] bg-gradient-to-r from-red-500 to-transparent rounded" />
          </div>
          <HadeesCard hadees={dailyHadees} showBook />
        </section>

        {/* Books Grid */}
        <section>
          <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-sm font-bold text-white" style={lf}>{t('books')}</h2>
            <Link to="/books" className="flex items-center gap-1 text-xs text-red-300 hover:text-red-200 transition-colors">
              <span style={lf}>{t('viewAll')}</span>
              <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {BOOKS.map(book => (
              <Link key={book.id} to={`/books/${book.id}`}>
                <GlowCard className="p-4 h-full hover:scale-[1.02] transition-transform" intensity="low">
                  <div className="text-3xl mb-2">{book.icon}</div>
                  <h3 className="text-sm font-bold text-white leading-snug mb-1" style={settings.language === 'en' ? englishFontStyle : settings.language === 'ar' ? arabicFontStyle : urduFontStyle}>
                    {settings.language === 'en' ? book.title_en : settings.language === 'ar' ? book.title_ar : book.title_ur}
                  </h3>
                  <p className="text-xs text-white/50" style={englishFontStyle}>{book.totalHadees.toLocaleString()} {t('hadees')}</p>
                  <div className={`mt-2 h-1 rounded-full bg-gradient-to-r ${book.color} opacity-60`} />
                </GlowCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Hadees */}
        <section>
          <h2 className="text-sm font-bold text-white mb-3" style={lf}>{t('featuredHadees')}</h2>
          <div className="space-y-4">
            {SAMPLE_HADEES.slice(3, 6).map(h => <HadeesCard key={h.id} hadees={h} showBook />)}
          </div>
        </section>

        {/* Bismillah + Surah Baqarah */}
        <GlowCard className="p-6 text-center" intensity="high">
          <p className="text-2xl text-white/90 leading-loose mb-3" style={{ ...arabicFontStyle, fontSize: '28px' }} dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <div className="border-t border-red-500/20 pt-3 mt-3">
            <p className="text-lg text-red-300/90 leading-loose" style={{ ...arabicFontStyle, fontSize: '24px' }} dir="rtl">
              الم
            </p>
          </div>
          <p className="text-xs text-white/40 mt-2" style={urduFontStyle}>سورہ البقرہ - آیت ۱</p>
        </GlowCard>
      </div>
    </div>
  );
};

export default Index;
