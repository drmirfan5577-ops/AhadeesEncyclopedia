import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import GlowCard from '@/components/features/GlowCard';
import { BookOpen, ChevronRight, ChevronLeft, Maximize2, Minimize2, AlignJustify, BookMarked, Mic } from 'lucide-react';

type QuranMode = 'mushaf' | 'tajweed' | 'translation' | 'tafseer';
type ScreenMode = 'normal' | 'full' | 'half' | 'floating';

// Quran data - Surah Al-Fatiha and Al-Baqarah (beginning)
const QURAN_SURAHS = [
  {
    number: 1,
    name_ar: 'الفاتحة',
    name_ur: 'الفاتحہ',
    name_en: 'Al-Fatiha',
    revelation: 'Makki' as const,
    verses: 7,
    ayahs: [
      { number: 1, arabic: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ', urdu: 'اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے', english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' },
      { number: 2, arabic: 'ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ', urdu: 'سب تعریف اللہ کے لیے ہے جو تمام جہانوں کا پروردگار ہے', english: 'All praise is due to Allah, Lord of the worlds.' },
      { number: 3, arabic: 'ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ', urdu: 'جو بڑا مہربان، نہایت رحم والا ہے', english: 'The Entirely Merciful, the Especially Merciful.' },
      { number: 4, arabic: 'مَٰلِكِ يَوۡمِ ٱلدِّينِ', urdu: 'جو روز جزا کا مالک ہے', english: 'Sovereign of the Day of Recompense.' },
      { number: 5, arabic: 'إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ', urdu: 'ہم تیری ہی عبادت کرتے ہیں اور تجھ سے ہی مدد مانگتے ہیں', english: 'It is You we worship and You we ask for help.' },
      { number: 6, arabic: 'ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ', urdu: 'ہمیں سیدھی راہ دکھا', english: 'Guide us to the straight path.' },
      { number: 7, arabic: 'صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ', urdu: 'ان لوگوں کی راہ جن پر تو نے انعام کیا، نہ ان کی جن پر غضب ہوا اور نہ گمراہوں کی', english: 'The path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray.' },
    ]
  },
  {
    number: 2,
    name_ar: 'البقرة',
    name_ur: 'البقرہ',
    name_en: 'Al-Baqarah',
    revelation: 'Madani' as const,
    verses: 286,
    ayahs: [
      { number: 1, arabic: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ', urdu: 'اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے', english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' },
      { number: 2, arabic: 'الٓمٓ', urdu: 'الم', english: 'Alif. Lam. Meem.' },
      { number: 3, arabic: 'ذَٰلِكَ ٱلۡكِتَٰبُ لَا رَيۡبَۛ فِيهِۛ هُدٗى لِّلۡمُتَّقِينَ', urdu: 'یہ کتاب جس میں کوئی شک نہیں، پرہیزگاروں کے لیے رہنما ہے', english: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah.' },
      { number: 4, arabic: 'ٱلَّذِينَ يُؤۡمِنُونَ بِٱلۡغَيۡبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقۡنَٰهُمۡ يُنفِقُونَ', urdu: 'جو غیب پر ایمان لاتے ہیں اور نماز قائم کرتے ہیں اور جو کچھ ہم نے انہیں دیا ہے اس میں سے خرچ کرتے ہیں', english: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them.' },
      { number: 5, arabic: 'وَٱلَّذِينَ يُؤۡمِنُونَ بِمَآ أُنزِلَ إِلَيۡكَ وَمَآ أُنزِلَ مِن قَبۡلِكَ وَبِٱلۡأٓخِرَةِ هُمۡ يُوقِنُونَ', urdu: 'اور جو اس چیز پر ایمان لاتے ہیں جو آپ کی طرف نازل ہوئی اور جو آپ سے پہلے نازل ہوئی اور آخرت پر یقین رکھتے ہیں', english: 'And who believe in what has been revealed to you, and what was revealed before you, and of the Hereafter they are certain.' },
    ]
  },
  {
    number: 3, name_ar: 'آل عمران', name_ur: 'آل عمران', name_en: 'Aal-Imran', revelation: 'Madani' as const, verses: 200, ayahs: []
  },
  {
    number: 4, name_ar: 'النساء', name_ur: 'النساء', name_en: 'An-Nisa', revelation: 'Madani' as const, verses: 176, ayahs: []
  },
  {
    number: 5, name_ar: 'المائدة', name_ur: 'المائدہ', name_en: 'Al-Maidah', revelation: 'Madani' as const, verses: 120, ayahs: []
  },
  {
    number: 112, name_ar: 'الإخلاص', name_ur: 'الاخلاص', name_en: 'Al-Ikhlas', revelation: 'Makki' as const, verses: 4,
    ayahs: [
      { number: 1, arabic: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ', urdu: 'اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے', english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' },
      { number: 2, arabic: 'قُلۡ هُوَ ٱللَّهُ أَحَدٌ', urdu: 'کہو وہ اللہ ایک ہے', english: 'Say, He is Allah, the One.' },
      { number: 3, arabic: 'ٱللَّهُ ٱلصَّمَدُ', urdu: 'اللہ بے نیاز ہے', english: 'Allah, the Eternal Refuge.' },
      { number: 4, arabic: 'لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ', urdu: 'نہ اس نے کسی کو جنا اور نہ وہ جنا گیا', english: 'He neither begets nor is born.' },
      { number: 5, arabic: 'وَلَمۡ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ', urdu: 'اور نہ ہی کوئی اس کا ہمسر ہے', english: 'Nor is there to Him any equivalent.' },
    ]
  },
];

const RECITERS = [
  { id: 'sudais', name: 'عبد الرحمن السدیس', style: 'مرتل' },
  { id: 'afasy', name: 'مشاری العفاسی', style: 'مجود' },
  { id: 'ghamdi', name: 'سعد الغامدی', style: 'مرتل' },
  { id: 'maher', name: 'ماہر المعیقلی', style: 'مجود' },
  { id: 'abdulbasit', name: 'عبد الباسط', style: 'مجود مرتل' },
];

const QuranSection = () => {
  const { settings, isRTL } = useApp();
  const [mode, setMode] = useState<QuranMode>('translation');
  const [screenMode, setScreenMode] = useState<ScreenMode>('normal');
  const [selectedSurah, setSelectedSurah] = useState(QURAN_SURAHS[0]);
  const [currentAyah, setCurrentAyah] = useState(0);
  const [showSurahList, setShowSurahList] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0]);

  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const arabicFont = { fontFamily: "'Amiri', serif" };
  const lf = settings.language !== 'en' ? urduFont : {};

  const modes: { id: QuranMode; labelUr: string; labelEn: string; icon: string }[] = [
    { id: 'mushaf', labelUr: 'مصحف', labelEn: 'Mushaf', icon: '📖' },
    { id: 'tajweed', labelUr: 'تجوید', labelEn: 'Tajweed', icon: '✨' },
    { id: 'translation', labelUr: 'ترجمہ', labelEn: 'Translation', icon: '🌐' },
    { id: 'tafseer', labelUr: 'تفسیر', labelEn: 'Tafseer', icon: '🔍' },
  ];

  const screenModes: { id: ScreenMode; labelUr: string; labelEn: string }[] = [
    { id: 'normal', labelUr: 'معمول', labelEn: 'Normal' },
    { id: 'half', labelUr: 'آدھا', labelEn: 'Half' },
    { id: 'full', labelUr: 'پورا', labelEn: 'Full' },
    { id: 'floating', labelUr: 'فلوٹنگ', labelEn: 'Float' },
  ];

  const ayahs = selectedSurah.ayahs || [];
  const currentAyahData = ayahs[currentAyah];
  const effectClass = settings.textEffect === 'glow' ? 'hadees-glow-effect' : settings.textEffect === 'luminous' ? 'hadees-luminous-effect' : '';

  const getTajweedColor = (arabic: string) => {
    // Simple tajweed coloring for demo
    return arabic
      .replace(/ٱللَّهِ|اللَّهِ|الله/g, '<span style="color:#CC0000">$&</span>')
      .replace(/([اَ])/g, '<span style="color:#FFAA00">$&</span>');
  };

  return (
    <div className={`pb-24 md:pb-8 ${isRTL ? 'rtl' : 'ltr'} ${screenMode === 'full' ? 'fixed inset-0 z-40 overflow-y-auto bg-[#0a0005]' : ''}`}>
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-white glow-text-white" style={lf}>
            {settings.language === 'ur' ? 'قرآن کریم' : 'Quran Kareem'}
          </h1>
          <div className="flex gap-1.5">
            <button
              onClick={() => setShowSurahList(!showSurahList)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs min-h-[36px]"
            >
              <AlignJustify size={12} />
              <span style={lf}>{settings.language === 'ur' ? selectedSurah.name_ur : selectedSurah.name_en}</span>
            </button>
            <button
              onClick={() => setScreenMode(m => m === 'full' ? 'normal' : 'full')}
              className="p-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              {screenMode === 'full' ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-red-500 to-transparent rounded mt-2" />
      </div>

      <div className="px-4 mt-3 space-y-3">
        {/* Mode Selector */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all min-h-[40px] ${mode === m.id ? 'bg-red-500/30 border border-red-400/60 text-red-300 shadow-[0_0_8px_rgba(239,68,68,0.3)]' : 'bg-white/5 border border-white/10 text-white/50'}`}
            >
              <span>{m.icon}</span>
              <span style={lf}>{settings.language === 'ur' ? m.labelUr : m.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Screen Mode */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {screenModes.map(sm => (
            <button
              key={sm.id}
              onClick={() => setScreenMode(sm.id)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all min-h-[36px] ${screenMode === sm.id ? 'bg-red-900/40 border border-red-500/40 text-red-300' : 'bg-white/5 border border-white/10 text-white/40'}`}
              style={lf}
            >
              {settings.language === 'ur' ? sm.labelUr : sm.labelEn}
            </button>
          ))}
        </div>

        {/* Surah List Dropdown */}
        {showSurahList && (
          <GlowCard className="p-3" intensity="medium">
            <h3 className="text-xs font-bold text-white mb-2" style={lf}>
              {settings.language === 'ur' ? 'سورۃ منتخب کریں' : 'Select Surah'}
            </h3>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {QURAN_SURAHS.map(surah => (
                <button
                  key={surah.number}
                  onClick={() => { setSelectedSurah(surah); setCurrentAyah(0); setShowSurahList(false); }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-all min-h-[44px] ${selectedSurah.number === surah.number ? 'bg-red-500/20 border border-red-400/40 text-red-300' : 'bg-white/5 hover:bg-white/10 text-white/70'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-red-400/70 w-6">{surah.number}</span>
                    <span className="text-sm" style={urduFont}>{settings.language === 'en' ? surah.name_en : surah.name_ur}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm" style={arabicFont}>{surah.name_ar}</span>
                    <p className="text-[10px] text-white/30">{surah.verses} {settings.language === 'ur' ? 'آیات' : 'verses'}</p>
                  </div>
                </button>
              ))}
            </div>
          </GlowCard>
        )}

        {/* Reciter Selector */}
        <GlowCard className="p-3" intensity="low">
          <div className="flex items-center gap-2">
            <Mic size={14} className="text-red-400 shrink-0" />
            <p className="text-xs text-white/60" style={lf}>{settings.language === 'ur' ? 'قاری' : 'Reciter'}:</p>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide flex-1">
              {RECITERS.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedReciter(r)}
                  className={`px-2 py-1 rounded-lg text-xs whitespace-nowrap transition-all min-h-[32px] ${selectedReciter.id === r.id ? 'bg-red-500/30 border border-red-400/50 text-red-300' : 'bg-white/5 text-white/40'}`}
                  style={urduFont}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        </GlowCard>

        {/* Main Content */}
        <GlowCard className="p-5" intensity="high">
          {/* Surah Header */}
          <div className="text-center mb-4 pb-4 border-b border-red-500/20">
            <h2 className="text-2xl font-bold text-white glow-text-white" style={arabicFont}>
              سورة {selectedSurah.name_ar}
            </h2>
            <p className="text-sm text-white/60 mt-1" style={urduFont}>
              {selectedSurah.name_ur} ・ {selectedSurah.verses} {settings.language === 'ur' ? 'آیات' : 'verses'} ・ {selectedSurah.revelation}
            </p>
          </div>

          {/* Ayah Content */}
          {ayahs.length > 0 ? (
            <div className="space-y-4">
              {mode === 'mushaf' && (
                <div className="text-center">
                  <p className="text-2xl text-white/95 leading-[2.5]" dir="rtl" style={{ ...arabicFont, fontSize: `${Math.max(settings.fontSize + 4, 22)}px` }}>
                    {ayahs.map((a, i) => (
                      <span
                        key={a.number}
                        onClick={() => setCurrentAyah(i)}
                        className={`cursor-pointer transition-all px-1 ${currentAyah === i ? 'text-red-300 glow-text-red' : 'hover:text-red-200'}`}
                      >
                        {a.arabic} ۝{a.number}{' '}
                      </span>
                    ))}
                  </p>
                </div>
              )}

              {mode === 'tajweed' && (
                <div className="space-y-3">
                  {ayahs.map((ayah, i) => (
                    <div key={ayah.number} onClick={() => setCurrentAyah(i)} className={`p-3 rounded-xl cursor-pointer transition-all ${currentAyah === i ? 'bg-red-500/10 border border-red-500/30' : 'hover:bg-white/5'}`}>
                      <p
                        className="text-right text-white/95 leading-[2.5]"
                        dir="rtl"
                        style={{ ...arabicFont, fontSize: `${Math.max(settings.fontSize + 4, 22)}px` }}
                        dangerouslySetInnerHTML={{ __html: getTajweedColor(ayah.arabic) + ` <span class="text-red-400 text-base">﴿${ayah.number}﴾</span>` }}
                      />
                    </div>
                  ))}
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-red-900/30 text-red-300">🔴 {settings.language === 'ur' ? 'لفظ اللہ' : 'Allah Name'}</span>
                    <span className="px-2 py-1 rounded bg-yellow-900/30 text-yellow-300">🟡 {settings.language === 'ur' ? 'مد' : 'Madd'}</span>
                  </div>
                </div>
              )}

              {mode === 'translation' && (
                <div className="space-y-4">
                  {ayahs.map((ayah, i) => (
                    <div key={ayah.number} onClick={() => setCurrentAyah(i)} className={`p-3 rounded-xl cursor-pointer transition-all ${currentAyah === i ? 'bg-red-500/10 border border-red-500/30' : 'hover:bg-white/5'}`}>
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-xs font-mono text-red-400/70 bg-red-900/20 px-2 py-0.5 rounded-full shrink-0">
                          {ayah.number}
                        </span>
                      </div>
                      <p className={`text-right leading-[2.5] text-white/95 ${effectClass}`} dir="rtl" style={{ ...arabicFont, fontSize: `${Math.max(settings.fontSize + 2, 20)}px` }}>
                        {ayah.arabic}
                      </p>
                      <div className="mt-2 pt-2 border-t border-white/10">
                        <p className={`text-right text-white/80 leading-relaxed ${effectClass}`} dir="rtl" style={{ ...urduFont, fontSize: `${settings.fontSize}px`, lineHeight: '2.2' }}>
                          {ayah.urdu}
                        </p>
                        {settings.language === 'en' && (
                          <p className="text-white/70 text-sm leading-relaxed mt-2">{ayah.english}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {mode === 'tafseer' && (
                <div className="space-y-4">
                  {ayahs.map((ayah, i) => (
                    <div key={ayah.number} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-right leading-[2.5] text-white/95" dir="rtl" style={{ ...arabicFont, fontSize: '20px' }}>
                        {ayah.arabic}
                        <span className="text-red-400 text-base"> ﴿{ayah.number}﴾</span>
                      </p>
                      <div className="mt-2 pt-2 border-t border-white/10">
                        <p className="text-right text-white/80 leading-loose" dir="rtl" style={{ ...urduFont, lineHeight: '2' }}>
                          {ayah.urdu}
                        </p>
                        <p className="text-white/50 text-xs mt-2 text-right" dir="rtl" style={urduFont}>
                          {settings.language === 'ur'
                            ? 'تفسیر: اس آیت میں اللہ تعالیٰ نے مومنوں کے صفات بیان فرمائے ہیں۔ (تفسیر ابن کثیر)'
                            : 'Tafseer: This verse describes the qualities of believers. (Tafseer Ibn Kathir)'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/40 text-sm" style={lf}>
                {settings.language === 'ur' ? 'اس سورۃ کا مکمل متن جلد شامل ہوگا' : 'Full surah text coming soon'}
              </p>
            </div>
          )}
        </GlowCard>

        {/* Page Navigation */}
        {ayahs.length > 0 && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentAyah(Math.max(0, currentAyah - 1))}
              disabled={currentAyah === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white/70 hover:bg-red-500/20 hover:border-red-500/40 transition-all disabled:opacity-30 min-h-[44px]"
              style={lf}
            >
              {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              <span className="text-sm">{settings.language === 'ur' ? 'پچھلی' : 'Prev'}</span>
            </button>
            <span className="text-xs text-white/40 font-mono">{currentAyah + 1} / {ayahs.length}</span>
            <button
              onClick={() => setCurrentAyah(Math.min(ayahs.length - 1, currentAyah + 1))}
              disabled={currentAyah === ayahs.length - 1}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/30 border border-red-500/40 text-red-300 hover:bg-red-500/40 transition-all disabled:opacity-30 min-h-[44px]"
              style={lf}
            >
              <span className="text-sm">{settings.language === 'ur' ? 'اگلی' : 'Next'}</span>
              {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuranSection;
