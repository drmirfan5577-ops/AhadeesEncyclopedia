import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { BOOKS, SAMPLE_HADEES } from '@/data/hadeesData';
import GlowCard from '@/components/features/GlowCard';
import HadeesCard from '@/components/features/HadeesCard';
import { Search, Filter, X } from 'lucide-react';

const SearchPage = () => {
  const { t, settings, isRTL } = useApp();
  const [query, setQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const engFont = { fontFamily: "'Orbitron', sans-serif" };
  const lf = settings.language !== 'en' ? urduFont : {};

  const grades = ['all', 'Sahih', 'Hasan', 'Hasan Sahih', 'Daif'];

  const results = SAMPLE_HADEES.filter(h => {
    const matchesBook = selectedBook === 'all' || h.bookId === selectedBook;
    const matchesGrade = selectedGrade === 'all' || h.grade === selectedGrade;
    if (!query.trim()) return matchesBook && matchesGrade;
    const q = query.toLowerCase();
    return matchesBook && matchesGrade && (
      h.arabic.includes(query) ||
      h.urdu.includes(query) ||
      h.english.toLowerCase().includes(q) ||
      h.narrator.toLowerCase().includes(q) ||
      h.narrator_ur.includes(query)
    );
  });

  return (
    <div className={`pb-24 md:pb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <Search size={18} className="text-red-400" />
          <h1 className="text-xl font-bold text-white glow-text-white" style={settings.language !== 'en' ? urduFont : engFont}>
            {t('search')}
          </h1>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-red-500 to-transparent rounded mt-2" />
      </div>

      <div className="px-4 mt-4 space-y-3">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={16} className="text-red-400/60" />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-black/30 border border-red-500/30 rounded-2xl pl-11 pr-10 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-red-400/70 focus:shadow-[0_0_12px_rgba(239,68,68,0.3)] transition-all"
            style={lf}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute inset-y-0 right-4 flex items-center text-white/40 hover:text-red-300">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters */}
        <GlowCard className="p-3" intensity="low">
          <div className="flex items-center gap-2 mb-2">
            <Filter size={12} className="text-red-400" />
            <span className="text-xs text-white/60" style={lf}>{settings.language === 'ur' ? 'فلٹر' : 'Filters'}</span>
          </div>
          <div className="space-y-2">
            {/* Book Filter */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-1.5 min-w-max">
                <button
                  onClick={() => setSelectedBook('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all min-h-[36px] ${selectedBook === 'all' ? 'bg-red-500/30 border border-red-400/60 text-red-300' : 'bg-white/5 border border-white/10 text-white/50'}`}
                  style={lf}
                >
                  {settings.language === 'ur' ? 'سب کتابیں' : 'All Books'}
                </button>
                {BOOKS.map(book => (
                  <button
                    key={book.id}
                    onClick={() => setSelectedBook(book.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all min-h-[36px] ${selectedBook === book.id ? 'bg-red-500/30 border border-red-400/60 text-red-300' : 'bg-white/5 border border-white/10 text-white/50'}`}
                    style={lf}
                  >
                    {settings.language === 'ur' ? book.title_ur : settings.language === 'ar' ? book.title_ar : book.title_en}
                  </button>
                ))}
              </div>
            </div>
            {/* Grade Filter */}
            <div className="flex gap-1.5 flex-wrap">
              {grades.map(grade => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-3 py-1 rounded-lg text-xs transition-all min-h-[32px] ${selectedGrade === grade ? 'bg-emerald-500/30 border border-emerald-400/60 text-emerald-300' : 'bg-white/5 border border-white/10 text-white/40'}`}
                >
                  {grade === 'all' ? (settings.language === 'ur' ? 'سب درجے' : 'All Grades') : grade}
                </button>
              ))}
            </div>
          </div>
        </GlowCard>

        {/* Results Count */}
        <div className="flex items-center justify-between px-1">
          <p className="text-xs text-white/40" style={lf}>
            {results.length} {settings.language === 'ur' ? 'نتائج' : 'results'}
            {query && ` ${settings.language === 'ur' ? 'کے لیے' : 'for'} "${query}"`}
          </p>
          {(query || selectedBook !== 'all' || selectedGrade !== 'all') && (
            <button
              onClick={() => { setQuery(''); setSelectedBook('all'); setSelectedGrade('all'); }}
              className="text-xs text-red-300/70 hover:text-red-300 transition-colors flex items-center gap-1"
            >
              <X size={10} />
              <span style={lf}>{settings.language === 'ur' ? 'صاف کریں' : 'Clear'}</span>
            </button>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results.length === 0 ? (
            <GlowCard className="p-10 text-center" intensity="low">
              <Search size={32} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/50 text-sm" style={lf}>{t('noResults')}</p>
            </GlowCard>
          ) : results.map(h => <HadeesCard key={h.id} hadees={h} showBook />)}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
