import { Link, useParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { BOOKS, SAMPLE_HADEES } from '@/data/hadeesData';
import GlowCard from '@/components/features/GlowCard';
import HadeesCard from '@/components/features/HadeesCard';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

const BooksList = () => {
  const { t, settings, isRTL } = useApp();
  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const arabicFont = { fontFamily: "'Amiri', serif" };
  const engFont = { fontFamily: "'Orbitron', sans-serif" };

  return (
    <div className={`pb-24 md:pb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Page Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={18} className="text-red-400" />
          <h1 className="text-xl font-bold text-white glow-text-white" style={settings.language !== 'en' ? urduFont : engFont}>
            {t('books')}
          </h1>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-red-500 to-transparent rounded mt-2" />
      </div>

      <div className="px-4 mt-4 space-y-4">
        {BOOKS.map(book => (
          <Link key={book.id} to={`/books/${book.id}`}>
            <GlowCard className="p-4 hover:scale-[1.01] transition-transform" intensity="medium">
              <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${book.color} flex items-center justify-center text-2xl shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.4)]`}>
                  {book.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-white leading-snug"
                    style={settings.language === 'en' ? engFont : settings.language === 'ar' ? arabicFont : urduFont}>
                    {settings.language === 'en' ? book.title_en : settings.language === 'ar' ? book.title_ar : book.title_ur}
                  </h2>
                  <p className="text-xs text-white/50 mt-0.5"
                    style={settings.language === 'en' ? {} : settings.language === 'ar' ? arabicFont : urduFont}>
                    {settings.language === 'en' ? book.author_en : settings.language === 'ar' ? book.author_ar : book.author_ur}
                  </p>
                  <p className="text-xs text-white/60 mt-2 leading-relaxed line-clamp-2"
                    style={settings.language === 'en' ? {} : urduFont}>
                    {settings.language === 'en' ? book.description_en : book.description_ur}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-red-300 bg-red-900/30 px-2 py-0.5 rounded-full border border-red-500/30">
                      {book.totalHadees.toLocaleString()} {t('hadees')}
                    </span>
                    <span className="text-xs text-white/40">
                      {book.chapters.length} {t('chapters')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  {isRTL ? <ChevronLeft size={18} className="text-red-400/60" /> : <ChevronRight size={18} className="text-red-400/60" />}
                </div>
              </div>
            </GlowCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { t, settings, isRTL } = useApp();
  const book = BOOKS.find(b => b.id === bookId);
  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const arabicFont = { fontFamily: "'Amiri', serif" };
  const engFont = { fontFamily: "'Orbitron', sans-serif" };

  if (!book) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-white/60">Book not found</p>
    </div>
  );

  const bookHadees = SAMPLE_HADEES.filter(h => h.bookId === bookId);

  return (
    <div className={`pb-24 md:pb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Back */}
      <div className="px-4 pt-4">
        <Link to="/books" className="inline-flex items-center gap-2 text-red-300 hover:text-red-200 text-sm transition-colors min-h-[44px]">
          {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          <span style={settings.language !== 'en' ? urduFont : {}}>{t('backToBooks')}</span>
        </Link>
      </div>

      {/* Book Header */}
      <div className="px-4 mt-3">
        <GlowCard className="p-5" intensity="high">
          <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${book.color} flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(239,68,68,0.5)]`}>
              {book.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white glow-text-white"
                style={settings.language === 'en' ? engFont : settings.language === 'ar' ? arabicFont : urduFont}>
                {settings.language === 'en' ? book.title_en : settings.language === 'ar' ? book.title_ar : book.title_ur}
              </h1>
              <p className="text-sm text-white/60 mt-0.5"
                style={settings.language !== 'en' ? urduFont : {}}>
                {settings.language === 'en' ? book.author_en : settings.language === 'ar' ? book.author_ar : book.author_ur}
              </p>
              <div className="flex gap-3 mt-2">
                <span className="text-xs text-red-300">{book.totalHadees.toLocaleString()} {t('hadees')}</span>
                <span className="text-xs text-white/40">|</span>
                <span className="text-xs text-white/60">{book.chapters.length} {t('chapters')}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-white/70 mt-4 leading-relaxed" style={settings.language !== 'en' ? { ...urduFont, lineHeight: '2' } : {}}>
            {settings.language === 'en' ? book.description_en : book.description_ur}
          </p>
        </GlowCard>
      </div>

      {/* Chapters */}
      <div className="px-4 mt-5">
        <h2 className="text-sm font-bold text-white/80 mb-3" style={settings.language !== 'en' ? urduFont : {}}>
          {t('chapters')}
        </h2>
        <div className="space-y-2">
          {book.chapters.map(ch => (
            <GlowCard key={ch.id} className="p-3" intensity="low">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <span className="text-xs font-mono text-red-400 mr-2">{ch.number}.</span>
                  <span className="text-sm text-white"
                    style={settings.language === 'en' ? {} : settings.language === 'ar' ? arabicFont : urduFont}>
                    {settings.language === 'en' ? ch.title_en : settings.language === 'ar' ? ch.title_ar : ch.title_ur}
                  </span>
                </div>
                <span className="text-xs text-white/40">{ch.hadeesCount}</span>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>

      {/* Available Hadees */}
      {bookHadees.length > 0 && (
        <div className="px-4 mt-5 space-y-4">
          <h2 className="text-sm font-bold text-white/80" style={settings.language !== 'en' ? urduFont : {}}>
            {t('hadees')}
          </h2>
          {bookHadees.map(h => <HadeesCard key={h.id} hadees={h} />)}
        </div>
      )}

      {bookHadees.length === 0 && (
        <GlowCard className="mx-4 mt-5 p-8 text-center" intensity="low">
          <p className="text-white/50 text-sm" style={settings.language !== 'en' ? urduFont : {}}>
            {settings.language === 'ur' ? 'مزید احادیث جلد دستیاب ہوں گی' : settings.language === 'ar' ? 'المزيد من الأحاديث قريباً' : 'More hadiths coming soon'}
          </p>
        </GlowCard>
      )}
    </div>
  );
};

const HadeesBooks = () => {
  const { bookId } = useParams<{ bookId: string }>();
  return bookId ? <BookDetail /> : <BooksList />;
};

export default HadeesBooks;
