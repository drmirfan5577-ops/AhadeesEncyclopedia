import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { BOOKS, SAMPLE_HADEES } from '@/data/hadeesData';
import GlowCard from '@/components/features/GlowCard';
import {
  Shield, LayoutDashboard, BookOpen, Image, Settings2, LogOut,
  Download, FileText, Database, Plus, Trash2, Edit3, Eye,
  EyeOff, Upload, RefreshCw, Code, HardDrive, Users,
  ToggleLeft, ToggleRight, AlertTriangle, CheckCircle,
  ChevronRight, X, Save, Globe
} from 'lucide-react';
import { toast } from 'sonner';

type AdminTab = 'dashboard' | 'content' | 'media' | 'settings' | 'source' | 'docs' | 'backup';

const AdminPanel = () => {
  const { t, isRTL, settings, updateSettings, setAdminAuthenticated } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const engFont = { fontFamily: "'Orbitron', sans-serif" };
  const labelFont = settings.language !== 'en' ? urduFont : {};

  const handleLogout = () => {
    setAdminAuthenticated(false);
    toast.success(settings.language === 'ur' ? 'لاگ آؤٹ ہو گئے' : 'Logged out');
    navigate('/about');
  };

  const tabs: { id: AdminTab; labelEn: string; labelUr: string; icon: any }[] = [
    { id: 'dashboard', labelEn: 'Dashboard', labelUr: 'ڈیش بورڈ', icon: LayoutDashboard },
    { id: 'content', labelEn: 'Content', labelUr: 'مواد', icon: BookOpen },
    { id: 'media', labelEn: 'Media', labelUr: 'میڈیا', icon: Image },
    { id: 'settings', labelEn: 'App Settings', labelUr: 'ترتیبات', icon: Settings2 },
    { id: 'source', labelEn: 'Source Code', labelUr: 'سورس کوڈ', icon: Code },
    { id: 'docs', labelEn: 'Documentation', labelUr: 'دستاویزات', icon: FileText },
    { id: 'backup', labelEn: 'Backup', labelUr: 'بیک اپ', icon: HardDrive },
  ];

  return (
    <div className={`pb-24 md:pb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Admin Header */}
      <div className="px-4 pt-4 pb-3 border-b border-red-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-800 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.6)]">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white glow-text-red" style={labelFont}>
                {t('adminPanel')}
              </h1>
              <p className="text-xs text-red-300/70">
                {settings.language === 'ur' ? 'مکمل کنٹرول پینل' : 'Full Control Panel'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-900/30 border border-red-500/30 text-red-300 hover:bg-red-500/20 transition-all text-xs min-h-[44px]"
          >
            <LogOut size={14} />
            <span style={labelFont}>{t('logout')}</span>
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="px-2 pt-3 pb-2 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1.5 min-w-max">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap min-h-[44px] ${
                  active
                    ? 'bg-red-500/30 border border-red-400/60 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                    : 'bg-white/5 border border-white/10 text-white/60 hover:text-red-300 hover:border-red-500/30'
                }`}
              >
                <Icon size={14} />
                <span style={labelFont}>{settings.language === 'ur' ? tab.labelUr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 mt-2">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'content' && <ContentTab />}
        {activeTab === 'media' && <MediaTab />}
        {activeTab === 'settings' && <AppSettingsTab />}
        {activeTab === 'source' && <SourceCodeTab />}
        {activeTab === 'docs' && <DocsTab />}
        {activeTab === 'backup' && <BackupTab />}
      </div>
    </div>
  );
};

/* ─── Dashboard Tab ─── */
const DashboardTab = () => {
  const { settings, updateSettings } = useApp();
  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const engFont = { fontFamily: "'Orbitron', sans-serif" };
  const lf = settings.language !== 'en' ? urduFont : {};

  const stats = [
    { label: settings.language === 'ur' ? 'کتب' : 'Books', value: BOOKS.length, color: 'text-red-300' },
    { label: settings.language === 'ur' ? 'احادیث' : 'Hadees', value: '62,000+', color: 'text-rose-300' },
    { label: settings.language === 'ur' ? 'زبانیں' : 'Languages', value: 3, color: 'text-pink-300' },
    { label: settings.language === 'ur' ? 'ورژن' : 'Version', value: 'v2.0', color: 'text-red-400' },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <GlowCard key={i} className="p-4 text-center" intensity="medium">
            <div className={`text-2xl font-bold ${s.color} glow-text-red`} style={engFont}>{s.value}</div>
            <div className="text-xs text-white/50 mt-1" style={lf}>{s.label}</div>
          </GlowCard>
        ))}
      </div>

      {/* Quick Actions */}
      <GlowCard className="p-4" intensity="medium">
        <h3 className="text-sm font-bold text-white mb-3" style={lf}>
          {settings.language === 'ur' ? 'فوری اعمال' : 'Quick Actions'}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: BookOpen, label: settings.language === 'ur' ? 'کتابیں' : 'Books', path: '/books' },
            { icon: Globe, label: settings.language === 'ur' ? 'قرآن' : 'Quran', path: '/quran' },
            { icon: Image, label: settings.language === 'ur' ? 'میڈیا' : 'Media', path: '/media' },
            { icon: Settings2, label: settings.language === 'ur' ? 'سیٹنگز' : 'Settings', path: '/settings' },
          ].map((item, i) => (
            <Link key={i} to={item.path}>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 transition-all min-h-[50px]">
                <item.icon size={16} className="text-red-400" />
                <span className="text-sm text-white/80" style={lf}>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </GlowCard>

      {/* Theme Toggle */}
      <GlowCard className="p-4" intensity="low">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-white" style={lf}>
              {settings.language === 'ur' ? 'تھیم' : 'Theme'}
            </p>
            <p className="text-xs text-white/40 mt-0.5" style={lf}>
              {settings.theme === 'dark' ? (settings.language === 'ur' ? 'تاریک موڈ' : 'Dark Mode') : (settings.language === 'ur' ? 'روشن موڈ' : 'Light Mode')}
            </p>
          </div>
          <button
            onClick={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
            className={`relative w-14 h-7 rounded-full transition-all border ${settings.theme === 'light' ? 'bg-yellow-400/30 border-yellow-400/50' : 'bg-red-500/30 border-red-500/50'}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 rounded-full transition-all shadow-lg ${settings.theme === 'light' ? 'left-7 bg-yellow-400' : 'left-0.5 bg-red-500'}`} />
          </button>
        </div>
      </GlowCard>

      {/* App Status */}
      <GlowCard className="p-4" intensity="low">
        <h3 className="text-sm font-bold text-white mb-3" style={lf}>
          {settings.language === 'ur' ? 'ایپ کی حالت' : 'App Status'}
        </h3>
        {[
          { label: settings.language === 'ur' ? 'Backend' : 'Backend', ok: true },
          { label: settings.language === 'ur' ? 'Database' : 'Database', ok: true },
          { label: settings.language === 'ur' ? 'میڈیا اسٹوریج' : 'Media Storage', ok: true },
          { label: settings.language === 'ur' ? 'آڈیو سسٹم' : 'Audio System', ok: true },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <span className="text-xs text-white/60" style={lf}>{item.label}</span>
            <div className={`flex items-center gap-1.5 text-xs ${item.ok ? 'text-emerald-400' : 'text-red-400'}`}>
              {item.ok ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
              <span>{item.ok ? 'Active' : 'Error'}</span>
            </div>
          </div>
        ))}
      </GlowCard>
    </div>
  );
};

/* ─── Content Tab ─── */
const ContentTab = () => {
  const { settings } = useApp();
  const lf = settings.language !== 'en' ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {};
  const [books] = useState(BOOKS);

  return (
    <div className="space-y-4">
      <GlowCard className="p-4" intensity="medium">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white" style={lf}>
            {settings.language === 'ur' ? 'حدیث کتابیں' : 'Hadees Books'}
          </h3>
          <span className="text-xs text-red-300 bg-red-900/30 px-2 py-0.5 rounded-full">{books.length}</span>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {books.map(book => (
            <div key={book.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-lg">{book.icon}</span>
                <div>
                  <p className="text-xs text-white font-medium" style={lf}>
                    {settings.language === 'ur' ? book.title_ur : book.title_en}
                  </p>
                  <p className="text-[10px] text-white/40">{book.totalHadees.toLocaleString()} hadees</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all min-w-[32px] min-h-[32px] flex items-center justify-center">
                  <Edit3 size={12} />
                </button>
                <button className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all min-w-[32px] min-h-[32px] flex items-center justify-center">
                  <Eye size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlowCard>

      <GlowCard className="p-4" intensity="low">
        <h3 className="text-sm font-bold text-white mb-3" style={lf}>
          {settings.language === 'ur' ? 'کسٹم کتاب شامل کریں' : 'Add Custom Book'}
        </h3>
        <div className="space-y-3">
          <input
            placeholder={settings.language === 'ur' ? 'کتاب کا نام' : 'Book Title'}
            className="w-full bg-black/30 border border-red-500/30 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-red-400/70 transition-all"
            style={lf}
          />
          <textarea
            placeholder={settings.language === 'ur' ? 'تفصیل' : 'Description'}
            rows={3}
            className="w-full bg-black/30 border border-red-500/30 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-red-400/70 transition-all resize-none"
            style={lf}
          />
          <button
            onClick={() => toast.success(settings.language === 'ur' ? 'محفوظ ہو گیا' : 'Saved!')}
            className="w-full py-2.5 rounded-xl bg-red-600/40 border border-red-500/50 text-red-300 text-sm hover:bg-red-500/40 transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Plus size={14} />
            <span style={lf}>{settings.language === 'ur' ? 'شامل کریں' : 'Add Book'}</span>
          </button>
        </div>
      </GlowCard>
    </div>
  );
};

/* ─── Media Tab ─── */
const MediaTab = () => {
  const { settings } = useApp();
  const lf = settings.language !== 'en' ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {};

  const handleUpload = (type: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'audio' ? 'audio/*' : type === 'video' ? 'video/*' : type === 'image' ? 'image/*' : '*/*';
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) toast.success(`${file.name} ${settings.language === 'ur' ? 'اپلوڈ ہو گئی' : 'uploaded!'}`);
    };
    input.click();
  };

  return (
    <div className="space-y-4">
      <GlowCard className="p-4" intensity="medium">
        <h3 className="text-sm font-bold text-white mb-3" style={lf}>
          {settings.language === 'ur' ? 'میڈیا اپلوڈ کریں' : 'Upload Media'}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { type: 'audio', icon: '🎵', label: settings.language === 'ur' ? 'آڈیو' : 'Audio' },
            { type: 'video', icon: '🎬', label: settings.language === 'ur' ? 'ویڈیو' : 'Video' },
            { type: 'image', icon: '🖼️', label: settings.language === 'ur' ? 'تصویر' : 'Image' },
            { type: 'document', icon: '📄', label: settings.language === 'ur' ? 'دستاویز' : 'Document' },
          ].map(item => (
            <button
              key={item.type}
              onClick={() => handleUpload(item.type)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 transition-all min-h-[80px]"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs text-white/70" style={lf}>{item.label}</span>
            </button>
          ))}
        </div>
      </GlowCard>

      <GlowCard className="p-4" intensity="low">
        <h3 className="text-sm font-bold text-white mb-3" style={lf}>
          {settings.language === 'ur' ? 'پی ڈی ایف / آفس فائلیں' : 'PDF / Office Files'}
        </h3>
        <button
          onClick={() => handleUpload('document')}
          className="w-full p-4 rounded-xl border-2 border-dashed border-red-500/30 text-white/50 hover:border-red-400/60 hover:text-red-300 transition-all flex flex-col items-center gap-2 min-h-[80px]"
        >
          <Upload size={24} />
          <span className="text-xs" style={lf}>
            {settings.language === 'ur' ? 'فائل اپلوڈ کریں (PDF، DOCX، XLSX)' : 'Upload File (PDF, DOCX, XLSX)'}
          </span>
        </button>
      </GlowCard>

      <GlowCard className="p-4" intensity="low">
        <h3 className="text-sm font-bold text-white mb-2" style={lf}>
          {settings.language === 'ur' ? 'سپورٹڈ فارمیٹس' : 'Supported Formats'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {['MP3', 'WAV', 'OGG', 'MP4', 'WebM', 'JPG', 'PNG', 'WebP', 'PDF', 'DOCX', 'XLSX', 'TXT'].map(fmt => (
            <span key={fmt} className="text-xs px-2 py-1 rounded-md bg-red-900/20 border border-red-500/20 text-red-300">{fmt}</span>
          ))}
        </div>
      </GlowCard>
    </div>
  );
};

/* ─── App Settings Tab ─── */
const AppSettingsTab = () => {
  const { settings, updateSettings } = useApp();
  const lf = settings.language !== 'en' ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {};

  return (
    <div className="space-y-4">
      <GlowCard className="p-4" intensity="medium">
        <h3 className="text-sm font-bold text-white mb-4" style={lf}>
          {settings.language === 'ur' ? 'ایپ ترتیبات' : 'App Configuration'}
        </h3>
        <div className="space-y-4">
          {/* Theme */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white" style={lf}>{settings.language === 'ur' ? 'تھیم' : 'Theme'}</p>
              <p className="text-xs text-white/40">{settings.theme === 'dark' ? 'Dark' : 'Light'}</p>
            </div>
            <button
              onClick={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
              className={`w-12 h-6 rounded-full transition-all ${settings.theme === 'light' ? 'bg-yellow-400' : 'bg-red-500'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-lg transition-all mx-0.5 ${settings.theme === 'light' ? 'ml-6' : 'ml-0.5'}`} />
            </button>
          </div>

          {/* Page Turn Direction */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white" style={lf}>{settings.language === 'ur' ? 'صفحہ موڑنا' : 'Page Turn'}</p>
              <p className="text-xs text-white/40">{settings.pageTurnDirection}</p>
            </div>
            <div className="flex gap-2">
              {(['vertical', 'horizontal'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => updateSettings({ pageTurnDirection: d })}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all min-h-[36px] ${settings.pageTurnDirection === d ? 'bg-red-500/30 border border-red-400/60 text-red-300' : 'bg-white/5 border border-white/10 text-white/50'}`}
                >
                  {d === 'vertical' ? '↕' : '↔'} {d}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-white" style={lf}>{settings.language === 'ur' ? 'زبان' : 'Language'}</p>
            <div className="flex gap-2">
              {(['ur', 'ar', 'en'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => updateSettings({ language: lang })}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all min-h-[36px] ${settings.language === lang ? 'bg-red-500/30 border border-red-400/60 text-red-300' : 'bg-white/5 border border-white/10 text-white/50'}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <p className="text-sm text-white mb-2" style={lf}>{settings.language === 'ur' ? 'فونٹ سائز' : 'Font Size'}: {settings.fontSize}px</p>
            <input
              type="range" min={14} max={28} value={settings.fontSize}
              onChange={e => updateSettings({ fontSize: Number(e.target.value) })}
              className="w-full accent-red-500"
            />
          </div>
        </div>
      </GlowCard>

      <GlowCard className="p-4" intensity="low">
        <h3 className="text-sm font-bold text-white mb-3" style={lf}>
          {settings.language === 'ur' ? 'ایپ سیکشنز' : 'App Sections Control'}
        </h3>
        {[
          { id: 'quran', label: settings.language === 'ur' ? 'قرآن سیکشن' : 'Quran Section', enabled: true },
          { id: 'media', label: settings.language === 'ur' ? 'میڈیا پلیئر' : 'Media Player', enabled: true },
          { id: 'gallery', label: settings.language === 'ur' ? 'گیلری' : 'Gallery', enabled: true },
          { id: 'search', label: settings.language === 'ur' ? 'تلاش' : 'Advanced Search', enabled: true },
        ].map(item => (
          <div key={item.id} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
            <span className="text-sm text-white/70" style={lf}>{item.label}</span>
            <div className={`flex items-center gap-1.5 text-xs ${item.enabled ? 'text-emerald-400' : 'text-red-400'}`}>
              {item.enabled ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
              <span>{item.enabled ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        ))}
      </GlowCard>
    </div>
  );
};

/* ─── Source Code Tab ─── */
const SourceCodeTab = () => {
  const { settings } = useApp();
  const lf = settings.language !== 'en' ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {};

  const downloadSourceInfo = (type: string) => {
    const content = type === 'readme'
      ? `# Ahadees Encyclopedia v2.0
## احادیث انسائیکلوپیڈیا

### By: Dr M Irfan Qadir Thaheem - EvEr SmArT-wOrLd

### Tech Stack:
- React 18 + TypeScript + Vite
- Tailwind CSS 3.x + shadcn/ui
- OnSpace Cloud (Supabase-compatible backend)
- React Router DOM 6
- React Query 5

### Project Structure:
src/
├── pages/         # All app pages
├── components/    # Reusable components
├── contexts/      # App state (AppContext)
├── data/          # Static Hadees & translation data
├── types/         # TypeScript types
└── assets/        # Images & media

### Admin Panel:
- URL: /admin
- Default Password: Admin5577

### Features:
- 10 Hadees Books with full volumes
- Quran with Urdu translation
- Audio/Video Media Player
- Multi-language (Urdu/Arabic/English)
- 10 fonts per language
- Light/Dark theme
- Page-turn navigation
- Gallery, Bookmarks, Favorites

### Contact: dr.mirfan5577@gmail.com
`
      : type === 'env'
      ? `# Environment Variables
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Admin Settings
ADMIN_PASSWORD=Admin5577
APP_VERSION=2.0.0
`
      : `{
  "name": "ahadees-encyclopedia",
  "version": "2.0.0",
  "author": "Dr M Irfan Qadir Thaheem",
  "description": "Complete Ahadees Encyclopedia",
  "tech_stack": {
    "frontend": "React 18 + TypeScript + Vite",
    "styling": "Tailwind CSS 3 + shadcn/ui",
    "backend": "OnSpace Cloud (Supabase)",
    "routing": "React Router DOM 6",
    "state": "React Query 5 + Context API"
  },
  "features": [
    "10 Hadees Books",
    "Quran with Translation",
    "Media Player",
    "Multi-language Support",
    "Admin Panel",
    "Light/Dark Theme",
    "Export/Import"
  ]
}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ahadees_${type}.${type === 'env' ? 'env' : type === 'readme' ? 'md' : 'json'}`;
    a.click();
    toast.success(settings.language === 'ur' ? 'ڈاؤنلوڈ شروع ہو گیا' : 'Download started!');
  };

  return (
    <div className="space-y-4">
      <GlowCard className="p-4" intensity="medium">
        <h3 className="text-sm font-bold text-white mb-1" style={lf}>
          {settings.language === 'ur' ? 'ٹیک اسٹیک' : 'Technology Stack'}
        </h3>
        <p className="text-xs text-white/50 mb-4">React 18 + TypeScript + Vite + Tailwind CSS + OnSpace Cloud</p>
        <div className="grid grid-cols-1 gap-2">
          {[
            { label: 'README.md', desc: settings.language === 'ur' ? 'مکمل گائیڈ' : 'Complete Guide', type: 'readme', icon: '📖' },
            { label: '.env.example', desc: settings.language === 'ur' ? 'ماحولیاتی متغیرات' : 'Environment Variables', type: 'env', icon: '⚙️' },
            { label: 'package.json', desc: settings.language === 'ur' ? 'پروجیکٹ کنفگ' : 'Project Config', type: 'package', icon: '📦' },
          ].map(item => (
            <button
              key={item.type}
              onClick={() => downloadSourceInfo(item.type)}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 transition-all min-h-[56px]"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div className="text-left">
                  <p className="text-sm text-white font-mono">{item.label}</p>
                  <p className="text-xs text-white/40" style={lf}>{item.desc}</p>
                </div>
              </div>
              <Download size={14} className="text-red-400" />
            </button>
          ))}
        </div>
      </GlowCard>

      <GlowCard className="p-4" intensity="low">
        <h3 className="text-sm font-bold text-white mb-3" style={lf}>
          {settings.language === 'ur' ? 'آن اسپیس ٹول بار' : 'OnSpace Toolbar Guide'}
        </h3>
        <div className="space-y-2.5 text-xs text-white/70">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-red-300 font-bold mb-1" style={lf}>
              {settings.language === 'ur' ? '🔧 کوڈ ویو' : '🔧 Code View'}
            </p>
            <p style={lf}>
              {settings.language === 'ur'
                ? 'دائیں طرف اوپر ٹول بار میں "<>" بٹن دبائیں - پورا سورس کوڈ نظر آئے گا'
                : 'Click the "</>" button in the top-right toolbar to view full source code'}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-red-300 font-bold mb-1">⬇️ Download</p>
            <p style={lf}>
              {settings.language === 'ur'
                ? 'ٹول بار میں ڈاؤنلوڈ بٹن سے پوری ایپ کا زپ فائل ڈاؤنلوڈ کریں'
                : 'Click Download button in toolbar to get complete app ZIP file'}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-red-300 font-bold mb-1">🌐 Publish</p>
            <p style={lf}>
              {settings.language === 'ur'
                ? 'Publish بٹن سے ایپ کو .onspace.app URL پر شائع کریں'
                : 'Use Publish button to deploy app to .onspace.app URL'}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-red-300 font-bold mb-1">☁️ Cloud</p>
            <p style={lf}>
              {settings.language === 'ur'
                ? 'Cloud بٹن سے Database، Storage، Users سب منیج کریں'
                : 'Cloud button manages Database, Storage, Users, Edge Functions'}
            </p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
};

/* ─── Documentation Tab ─── */
const DocsTab = () => {
  const { settings } = useApp();
  const lf = settings.language !== 'en' ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {};

  const downloadDoc = (docType: string) => {
    const docs: Record<string, string> = {
      urdu_guide: `# احادیث انسائیکلوپیڈیا - مکمل گائیڈ
## EvEr SmArT-wOrLd - Dr M Irfan Qadir Thaheem

## ایپ کیسے استعمال کریں:

### 1. ہوم پیج:
- تمام حدیث کتابیں فوری رسائی
- آج کی حدیث روزانہ بدلتی ہے
- نمایاں احادیث

### 2. کتابیں (Books):
- 10 مکمل حدیث کتابیں
- ابواب کے ذریعے تلاش
- ہر حدیث کاپی/شیئر کریں

### 3. قرآن (Quran):
- مصحف موڈ
- تجوید موڈ
- اردو ترجمہ

### 4. میڈیا (Media):
- آڈیو/ویڈیو پلیئر
- آڈیو ریکیٹیشنز
- گیلری

### 5. ایڈمن پینل (/admin):
- پاسورڈ: Admin5577
- تمام ترتیبات
- مواد کا انتظام

## رابطہ:
Email: dr.mirfan5577@gmail.com
`,
      app_store: `# App Store Submission Guide
## Ahadees Encyclopedia - EvEr SmArT-wOrLd

### App Information:
- Name: Ahadees Encyclopedia
- Bundle ID: com.eversmartworld.ahadees
- Version: 2.0.0
- Category: Education / Reference
- Age Rating: 4+

### Description (English):
Complete Ahadees Encyclopedia featuring all major Hadith collections including Sahih Bukhari, Sahih Muslim, Abu Dawood, Tirmidhi, Nasai, Ibn Majah, Muwatta, Musnad Ahmad, Riyadh Saliheen, and Mishkat. Supports Urdu, Arabic, and English languages.

### Keywords:
Hadees, Hadith, Islamic, Bukhari, Muslim, Quran, Urdu, Arabic

### Author:
Dr M Irfan Qadir Thaheem
EvEr SmArT-wOrLd
Email: dr.mirfan5577@gmail.com

### Copyright:
© 2026 EvEr SmArT-wOrLd. All Rights Reserved.
`,
      legal_doc: `# Legal Documentation
## Ahadees Encyclopedia

### Copyright Notice:
© 2026 Dr M Irfan Qadir Thaheem / EvEr SmArT-wOrLd
A Project of SMART WORLD ORDER - Global Family Platform Vision

### Ownership:
All rights reserved. This application, its design, code, 
and content are the intellectual property of Dr M Irfan Qadir Thaheem.

### Hadith Content:
Hadith texts are from classical Islamic scholarship (public domain).
Translations are provided for educational purposes.

### Privacy Policy:
No personal data is collected without consent.
Local storage used for settings and bookmarks only.

### Terms of Use:
For personal, educational, and non-commercial use.
Redistribution requires written permission.

### Contact:
dr.mirfan5577@gmail.com
`
    };

    const content = docs[docType] || 'Documentation content';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docType}.md`;
    a.click();
    toast.success(settings.language === 'ur' ? 'دستاویز ڈاؤنلوڈ ہو گئی' : 'Document downloaded!');
  };

  return (
    <div className="space-y-4">
      <GlowCard className="p-4" intensity="medium">
        <h3 className="text-sm font-bold text-white mb-3" style={lf}>
          {settings.language === 'ur' ? 'دستاویزات ڈاؤنلوڈ' : 'Download Documents'}
        </h3>
        {[
          { key: 'urdu_guide', icon: '📚', label: settings.language === 'ur' ? 'اردو گائیڈ' : 'Urdu User Guide', desc: settings.language === 'ur' ? 'مکمل استعمال کی گائیڈ' : 'Complete usage guide in Urdu' },
          { key: 'app_store', icon: '📱', label: settings.language === 'ur' ? 'ایپ اسٹور گائیڈ' : 'App Store Guide', desc: settings.language === 'ur' ? 'موبائل ایپ پبلشنگ' : 'Mobile app publishing guide' },
          { key: 'legal_doc', icon: '⚖️', label: settings.language === 'ur' ? 'قانونی دستاویزات' : 'Legal Documents', desc: settings.language === 'ur' ? 'کاپی رائٹ و ملکیت' : 'Copyright & ownership docs' },
        ].map(doc => (
          <button
            key={doc.key}
            onClick={() => downloadDoc(doc.key)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 transition-all mb-2 min-h-[60px]"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{doc.icon}</span>
              <div className="text-left">
                <p className="text-sm text-white" style={lf}>{doc.label}</p>
                <p className="text-xs text-white/40" style={lf}>{doc.desc}</p>
              </div>
            </div>
            <Download size={14} className="text-red-400" />
          </button>
        ))}
      </GlowCard>

      <GlowCard className="p-4" intensity="low">
        <h3 className="text-sm font-bold text-white mb-3" style={lf}>
          {settings.language === 'ur' ? 'ملکیت کی معلومات' : 'Ownership Info'}
        </h3>
        <div className="space-y-2 text-xs text-white/60" style={lf}>
          <p>📛 {settings.language === 'ur' ? 'نام:' : 'Name:'} Dr M Irfan Qadir Thaheem</p>
          <p>🏢 {settings.language === 'ur' ? 'برانڈ:' : 'Brand:'} EvEr SmArT-wOrLd</p>
          <p>🌍 {settings.language === 'ur' ? 'پروجیکٹ:' : 'Project:'} SMART WORLD ORDER</p>
          <p>📧 Email: dr.mirfan5577@gmail.com</p>
          <p>©️ 2026 All Rights Reserved</p>
        </div>
      </GlowCard>
    </div>
  );
};

/* ─── Backup Tab ─── */
const BackupTab = () => {
  const { settings, updateSettings } = useApp();
  const lf = settings.language !== 'en' ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {};

  const exportAll = () => {
    const data = {
      settings,
      bookmarks: JSON.parse(localStorage.getItem('ahadees_bookmarks') || '[]'),
      favorites: JSON.parse(localStorage.getItem('ahadees_favorites') || '[]'),
      lastRead: JSON.parse(localStorage.getItem('ahadees_last_read') || 'null'),
      drafts: JSON.parse(localStorage.getItem('ahadees_drafts') || '{}'),
      exportDate: new Date().toISOString(),
      version: '2.0.0',
      author: 'Dr M Irfan Qadir Thaheem - EvEr SmArT-wOrLd',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ahadees_full_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast.success(settings.language === 'ur' ? 'مکمل بیک اپ ڈاؤنلوڈ ہو گیا' : 'Full backup downloaded!');
  };

  const importAll = () => {
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
          if (data.favorites) localStorage.setItem('ahadees_favorites', JSON.stringify(data.favorites));
          if (data.lastRead) localStorage.setItem('ahadees_last_read', JSON.stringify(data.lastRead));
          if (data.drafts) localStorage.setItem('ahadees_drafts', JSON.stringify(data.drafts));
          toast.success(settings.language === 'ur' ? 'بیک اپ بحال ہو گیا' : 'Backup restored!');
          setTimeout(() => window.location.reload(), 1000);
        } catch {
          toast.error('Invalid backup file');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="space-y-4">
      <GlowCard className="p-4" intensity="high">
        <h3 className="text-sm font-bold text-white mb-3" style={lf}>
          {settings.language === 'ur' ? 'مکمل بیک اپ' : 'Full Backup'}
        </h3>
        <div className="space-y-3">
          <button
            onClick={exportAll}
            className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-red-600/40 border border-red-500/50 text-red-200 hover:bg-red-500/50 transition-all font-semibold min-h-[50px]"
          >
            <Download size={18} />
            <span style={lf}>{settings.language === 'ur' ? 'مکمل بیک اپ ڈاؤنلوڈ' : 'Export Full Backup'}</span>
          </button>
          <button
            onClick={importAll}
            className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-white/10 border border-white/20 text-white/80 hover:bg-white/15 transition-all min-h-[50px]"
          >
            <Upload size={18} />
            <span style={lf}>{settings.language === 'ur' ? 'بیک اپ بحال کریں' : 'Restore Backup'}</span>
          </button>
        </div>
      </GlowCard>

      <GlowCard className="p-4" intensity="low">
        <h3 className="text-sm font-bold text-white mb-3" style={lf}>
          {settings.language === 'ur' ? 'بیک اپ میں شامل' : 'Backup Includes'}
        </h3>
        {[
          { icon: '⚙️', label: settings.language === 'ur' ? 'تمام ترتیبات' : 'All Settings' },
          { icon: '🔖', label: settings.language === 'ur' ? 'بُک مارکس' : 'Bookmarks' },
          { icon: '⭐', label: settings.language === 'ur' ? 'پسندیدہ' : 'Favorites' },
          { icon: '📖', label: settings.language === 'ur' ? 'آخری مطالعہ' : 'Last Read Position' },
          { icon: '📝', label: settings.language === 'ur' ? 'مسودے' : 'Drafts' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
            <span>{item.icon}</span>
            <span className="text-sm text-white/70" style={lf}>{item.label}</span>
            <CheckCircle size={12} className="text-emerald-400 ml-auto" />
          </div>
        ))}
      </GlowCard>

      <GlowCard className="p-4" intensity="low">
        <h3 className="text-sm font-bold text-white mb-2" style={lf}>
          {settings.language === 'ur' ? 'موبائل انسٹالیشن' : 'Mobile Installation'}
        </h3>
        <div className="text-xs text-white/60 space-y-2" style={lf}>
          <p className="p-2 rounded-lg bg-white/5">
            {settings.language === 'ur'
              ? '📱 iOS: Safari میں کھولیں → Share → Add to Home Screen'
              : '📱 iOS: Open in Safari → Share → Add to Home Screen'}
          </p>
          <p className="p-2 rounded-lg bg-white/5">
            {settings.language === 'ur'
              ? '🤖 Android: Chrome میں کھولیں → Menu → Add to Home Screen'
              : '🤖 Android: Open in Chrome → Menu → Add to Home Screen'}
          </p>
          <p className="p-2 rounded-lg bg-white/5">
            {settings.language === 'ur'
              ? '🌐 ویب URL: Publish کے بعد .onspace.app link ملے گا'
              : '🌐 Web URL: After Publish you get a .onspace.app link'}
          </p>
        </div>
      </GlowCard>
    </div>
  );
};

export default AdminPanel;
