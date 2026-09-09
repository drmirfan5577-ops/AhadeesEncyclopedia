import { useApp } from '@/contexts/AppContext';
import GlowCard from '@/components/features/GlowCard';
import { Mail, Globe, Star, Heart, Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const { settings, isRTL, isAdminAuthenticated } = useApp();
  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const engFont = { fontFamily: "'Orbitron', sans-serif" };
  const arabicFont = { fontFamily: "'Amiri', serif" };

  return (
    <div className={`pb-24 md:pb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <Star size={18} className="text-red-400" />
          <h1 className="text-xl font-bold text-white glow-text-white" style={settings.language !== 'en' ? urduFont : engFont}>
            {settings.language === 'ur' ? 'ہمارے بارے میں' : settings.language === 'ar' ? 'من نحن' : 'About Us'}
          </h1>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-red-500 to-transparent rounded mt-2" />
      </div>

      <div className="px-4 space-y-5 mt-4">
        {/* App Info */}
        <GlowCard className="p-6 text-center" intensity="high">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center text-4xl mx-auto mb-4 shadow-[0_0_30px_rgba(239,68,68,0.7)]">
            ح
          </div>
          <h2 className="text-2xl font-bold text-white glow-text-red mb-1"
            style={settings.language !== 'en' ? { ...urduFont, lineHeight: '1.8' } : engFont}>
            {settings.language === 'ur' ? 'احادیث انسائیکلوپیڈیا' : settings.language === 'ar' ? 'موسوعة الأحاديث' : 'Ahadees Encyclopedia'}
          </h2>
          <p className="text-sm text-white/60" style={settings.language !== 'en' ? urduFont : {}}>
            {settings.language === 'ur' ? 'مکمل حدیث حوالہ جات' : settings.language === 'ar' ? 'المرجع الكامل للحديث' : 'The Complete Hadith Reference'}
          </p>
          <div className="mt-3 flex justify-center gap-2 flex-wrap">
            {['v2.0', '10 Books', '62,000+ Hadees', '3 Languages'].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs">{tag}</span>
            ))}
          </div>
        </GlowCard>

        {/* Admin Panel Access Card */}
        <Link to={isAdminAuthenticated ? '/admin' : '/admin/login'}>
          <GlowCard className="p-4 hover:scale-[1.01] transition-transform" intensity="high">
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-rose-900 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.6)] shrink-0">
                <Shield size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white glow-text-red" style={settings.language !== 'en' ? urduFont : engFont}>
                  {settings.language === 'ur' ? 'ایڈمن پینل' : settings.language === 'ar' ? 'لوحة الإدارة' : 'Admin Panel'}
                </h3>
                <p className="text-xs text-white/60 mt-0.5" style={settings.language !== 'en' ? urduFont : {}}>
                  {settings.language === 'ur'
                    ? 'مکمل کمانڈ اینڈ کنٹرول - سورس کوڈ - بیک اپ - دستاویزات'
                    : 'Full Control · Source Code · Backup · Docs'}
                </p>
                <p className="text-xs text-red-400/70 mt-1 font-mono">
                  {isAdminAuthenticated ? '✅ Authenticated' : '🔒 Password Protected'}
                </p>
              </div>
              <ChevronRight size={18} className="text-red-400/60 shrink-0" />
            </div>
          </GlowCard>
        </Link>

        {/* Organization */}
        <GlowCard className="p-5" intensity="medium">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/40 mb-3">
              <Star size={14} className="text-red-400" />
              <span className="text-red-300 font-mono text-sm tracking-wider">EvEr SmArT-wOrLd</span>
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-white glow-text-white" style={engFont}>Dr M Irfan Qadir Thaheem</h3>
            <p className="text-sm text-red-300" style={settings.language !== 'en' ? urduFont : {}}>
              {settings.language === 'ur' ? 'دی ون مین آرمی' : 'The One Man Army'}
            </p>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-white/80 leading-relaxed text-center" style={settings.language !== 'en' ? { ...urduFont, lineHeight: '2.2' } : { lineHeight: '1.8' }}>
              {settings.language === 'ur'
                ? 'ہم اتحاد، سالمیت اور آفاقیت کے ساتھ زندگی کے ہر شعبے میں پوری دنیا کو بہتر بنانے کے لیے پرعزم ہیں۔ ان شاء اللہ عزوجل۔'
                : settings.language === 'ar'
                ? 'نحن ملتزمون بتعزيز العالم بأسره في كل مجال من مجالات الحياة في إطار الوحدة والنزاهة والعالمية. إن شاء الله عز وجل.'
                : "We're committed to enhancing the whole world in every field of life within Unity, Integrity and Universality. In-sha-Allah Azza wa-Jall."}
            </p>
          </div>
        </GlowCard>

        {/* Project */}
        <GlowCard className="p-5" intensity="low">
          <h3 className="font-bold text-white mb-2 text-center glow-text-red" style={settings.language !== 'en' ? urduFont : engFont}>
            {settings.language === 'ur' ? 'اسمارٹ ورلڈ آرڈر' : 'SMART WORLD ORDER'}
          </h3>
          <p className="text-sm text-white/70 text-center leading-relaxed" style={settings.language !== 'en' ? { ...urduFont, lineHeight: '2' } : {}}>
            {settings.language === 'ur' ? 'عالمی خاندانی پلیٹ فارم ویژن کا ایک منصوبہ' : 'A Global Family Platform Vision'}
          </p>
          <div className="mt-3 flex justify-center">
            <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600/30 to-rose-600/30 border border-red-500/40 text-red-300 text-xs font-mono">
              EvEr_SmArT_wOrLd
            </span>
          </div>
        </GlowCard>

        {/* Contact */}
        <GlowCard className="p-5" intensity="low">
          <div className="flex items-center gap-2 mb-4">
            <Mail size={16} className="text-red-400" />
            <h3 className="font-bold text-white" style={settings.language !== 'en' ? urduFont : {}}>
              {settings.language === 'ur' ? 'رابطہ کریں' : settings.language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
          </div>
          <a
            href="mailto:dr.mirfan5577@gmail.com"
            className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-all group min-h-[44px]"
          >
            <Mail size={18} className="text-red-400 shrink-0" />
            <span className="text-red-300 text-sm group-hover:text-red-200 transition-colors" style={engFont}>
              dr.mirfan5577@gmail.com
            </span>
          </a>
          <p className="text-xs text-white/40 mt-2 text-center" style={settings.language !== 'en' ? urduFont : {}}>
            {settings.language === 'ur' ? 'مزید سوالات اور تجاویز کے لیے' : 'For more queries and suggestions'}
          </p>
        </GlowCard>

        {/* Bismillah */}
        <GlowCard className="p-6 text-center" intensity="medium">
          <p className="text-2xl text-white/90" style={{ ...arabicFont, fontSize: '28px' }} dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <p className="text-sm text-white/50 mt-2" style={urduFont}>اللہ کے نام سے شروع جو بڑا مہربان نہایت رحم والا ہے</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Heart size={14} className="text-red-400" />
            <span className="text-xs text-white/40" style={settings.language !== 'en' ? urduFont : {}}>
              {settings.language === 'ur' ? 'اللہ کی رضا کے لیے' : 'For the sake of Allah'}
            </span>
            <Heart size={14} className="text-red-400" />
          </div>
        </GlowCard>
      </div>
    </div>
  );
};

export default About;
