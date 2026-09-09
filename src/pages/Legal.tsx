import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import GlowCard from '@/components/features/GlowCard';
import { Shield, AlertTriangle, Lock, Globe, ChevronDown, ChevronUp } from 'lucide-react';

const sections = [
  {
    id: 'disclaimer',
    icon: AlertTriangle,
    title_en: 'Disclaimer',
    title_ur: 'اعلامیہ',
    content_en: `The content provided in this Ahadees Encyclopedia application is for educational and religious reference purposes only. While we strive for accuracy, we do not guarantee the completeness or correctness of all hadith translations. Users should consult qualified Islamic scholars for religious rulings and fatwas. The application is not affiliated with any government, religious authority, or political organization. We are not responsible for misuse of the content provided.`,
    content_ur: `اس احادیث انسائیکلوپیڈیا ایپلیکیشن میں فراہم کردہ مواد صرف تعلیمی اور مذہبی حوالہ کے مقاصد کے لیے ہے۔ اگرچہ ہم درستگی کے لیے کوشاں رہتے ہیں، تاہم ہم تمام حدیث ترجمات کی مکمل یا درستگی کی ضمانت نہیں دیتے۔ مذہبی احکام اور فتاویٰ کے لیے صارفین کو اہل علماء سے رجوع کرنا چاہیے۔ یہ ایپلیکیشن کسی بھی حکومت، مذہبی اتھارٹی، یا سیاسی تنظیم سے وابستہ نہیں ہے۔ ہم فراہم کردہ مواد کے غلط استعمال کے ذمہ دار نہیں ہیں۔`
  },
  {
    id: 'privacy',
    icon: Lock,
    title_en: 'Privacy Policy',
    title_ur: 'رازداری کی پالیسی',
    content_en: `Your privacy is important to us. This application stores your preferences, bookmarks, and uploaded media locally on your device. We do not collect, transmit, or sell any personal data to third parties. The application may use local storage for settings persistence. Any media files you upload remain on your device and are not transmitted to any server. We do not track your reading habits or usage patterns. You have the right to delete all your data at any time through the settings menu.`,
    content_ur: `آپ کی رازداری ہمارے لیے اہم ہے۔ یہ ایپلیکیشن آپ کی ترجیحات، بُک مارکس اور اپلوڈ کردہ میڈیا کو آپ کے ڈیوائس پر مقامی طور پر محفوظ کرتی ہے۔ ہم کسی بھی ذاتی ڈیٹا کو تھرڈ پارٹیز کو جمع، منتقل یا فروخت نہیں کرتے۔ آپ نے جو بھی میڈیا فائلز اپلوڈ کی ہیں وہ آپ کے ڈیوائس پر رہتی ہیں اور کسی سرور کو منتقل نہیں ہوتیں۔ آپ کے تمام ڈیٹا کو کسی بھی وقت ترتیبات کے ذریعے حذف کرنے کا حق آپ کو حاصل ہے۔`
  },
  {
    id: 'terms',
    icon: Shield,
    title_en: 'Terms of Use',
    title_ur: 'استعمال کی شرائط',
    content_en: `By using this application, you agree to use the content for lawful, educational, and spiritual purposes only. You may not use this application to spread misinformation, defame any religion, or engage in illegal activities. The content must be shared with proper attribution. Commercial use of the content without permission is prohibited. We reserve the right to update these terms at any time. Continued use of the application constitutes acceptance of updated terms.`,
    content_ur: `اس ایپلیکیشن کا استعمال کرکے، آپ اس مواد کو صرف قانونی، تعلیمی اور روحانی مقاصد کے لیے استعمال کرنے پر متفق ہوتے ہیں۔ آپ اس ایپلیکیشن کو غلط معلومات پھیلانے، کسی بھی مذہب کی توہین کرنے، یا غیر قانونی سرگرمیوں میں ملوث ہونے کے لیے استعمال نہیں کر سکتے۔ مواد مناسب حوالے کے ساتھ شیئر کیا جائے۔ اجازت کے بغیر مواد کا تجارتی استعمال ممنوع ہے۔`
  },
  {
    id: 'social',
    icon: Globe,
    title_en: 'Social Media Rules & International Broadcasting Laws',
    title_ur: 'سوشل میڈیا قوانین اور بین الاقوامی نشریات',
    content_en: `When sharing content from this application on social media platforms, please adhere to the following: (1) Always provide proper attribution and source reference. (2) Do not alter or misrepresent the meaning of any hadith. (3) Respect copyright laws of each platform (Facebook, Instagram, Twitter/X, YouTube, TikTok, etc.). (4) Content must comply with international broadcasting standards and local regulations. (5) Religious content must be shared respectfully and must not incite hatred or division. (6) GDPR, CCPA and other regional privacy regulations must be observed. (7) Ensure compliance with the Digital Millennium Copyright Act (DMCA). (8) Do not use this content for political propaganda or commercial advertisements without explicit permission.`,
    content_ur: `اس ایپلیکیشن کے مواد کو سوشل میڈیا پر شیئر کرتے وقت درج ذیل باتوں کا خیال رکھیں: (۱) ہمیشہ مناسب حوالہ دیں۔ (۲) کسی بھی حدیث کے معنی کو تبدیل یا غلط بیان نہ کریں۔ (۳) ہر پلیٹ فارم کے کاپی رائٹ قوانین کا احترام کریں۔ (۴) مواد بین الاقوامی نشریاتی معیارات کے مطابق ہونا چاہیے۔ (۵) مذہبی مواد احترام کے ساتھ شیئر کریں اور نفرت یا تقسیم کو نہ بڑھاوا دیں۔ (۶) GDPR اور دیگر علاقائی رازداری کے ضوابط کی پابندی کریں۔ (۷) سیاسی پروپیگنڈے یا تجارتی اشتہارات کے لیے اجازت کے بغیر اس مواد کا استعمال نہ کریں۔`
  },
];

const Legal = () => {
  const { settings, isRTL } = useApp();
  const [expanded, setExpanded] = useState<string | null>('disclaimer');
  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const engFont = { fontFamily: "'Orbitron', sans-serif" };

  return (
    <div className={`pb-24 md:pb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <Shield size={18} className="text-red-400" />
          <h1 className="text-xl font-bold text-white glow-text-white" style={settings.language !== 'en' ? urduFont : engFont}>
            {settings.language === 'ur' ? 'قانونی معلومات' : settings.language === 'ar' ? 'معلومات قانونية' : 'Legal Information'}
          </h1>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-red-500 to-transparent rounded mt-2" />
      </div>

      <div className="px-4 space-y-3 mt-4">
        {sections.map(sec => (
          <GlowCard key={sec.id} intensity="low">
            <button
              className={`w-full p-4 flex items-center gap-3 text-left min-h-[56px] ${isRTL ? 'flex-row-reverse text-right' : ''}`}
              onClick={() => setExpanded(expanded === sec.id ? null : sec.id)}
            >
              <sec.icon size={18} className="text-red-400 shrink-0" />
              <span className="flex-1 font-semibold text-white text-sm" style={settings.language !== 'en' ? urduFont : {}}>
                {settings.language === 'ur' ? sec.title_ur : sec.title_en}
              </span>
              {expanded === sec.id ? <ChevronUp size={16} className="text-red-400 shrink-0" /> : <ChevronDown size={16} className="text-white/40 shrink-0" />}
            </button>
            {expanded === sec.id && (
              <div className="px-4 pb-4 border-t border-white/10">
                <p className="text-sm text-white/70 mt-3 leading-relaxed"
                  style={settings.language !== 'en' ? { ...urduFont, lineHeight: '2.2', direction: 'rtl', textAlign: 'right' } : { lineHeight: '1.8' }}>
                  {settings.language === 'ur' ? sec.content_ur : sec.content_en}
                </p>
              </div>
            )}
          </GlowCard>
        ))}

        {/* Warning Banner */}
        <GlowCard className="p-4 border-yellow-500/30 bg-yellow-900/10" intensity="low">
          <div className="flex gap-3 items-start">
            <AlertTriangle size={18} className="text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-300/80 leading-relaxed" style={settings.language !== 'en' ? { ...urduFont, lineHeight: '2' } : {}}>
              {settings.language === 'ur'
                ? 'تنبیہ: حدیث کی غلط تشریح یا سیاق و سباق سے ہٹ کر استعمال سے گریز کریں۔ ہمیشہ مستند علماء سے رہنمائی لیں۔'
                : 'Warning: Avoid misinterpreting or using hadith out of context. Always seek guidance from authenticated Islamic scholars.'}
            </p>
          </div>
        </GlowCard>

        <p className="text-center text-xs text-white/30 pb-2" style={settings.language !== 'en' ? urduFont : {}}>
          {settings.language === 'ur' ? '© ۲۰۲۶ احادیث انسائیکلوپیڈیا - EvEr SmArT-wOrLd' : '© 2026 Ahadees Encyclopedia - EvEr SmArT-wOrLd'}
        </p>
      </div>
    </div>
  );
};

export default Legal;
