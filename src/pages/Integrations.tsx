import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import GlowCard from '@/components/features/GlowCard';
import { Layers, Plus, Trash2, Eye, EyeOff, ExternalLink, Code, Puzzle } from 'lucide-react';
import { toast } from 'sonner';

interface Integration {
  id: string;
  name: string;
  description: string;
  url: string;
  enabled: boolean;
  icon: string;
}

const DEFAULT_INTEGRATIONS: Integration[] = [
  { id: 'qurancom', name: 'Quran.com API', description: 'Quran verses and translations', url: 'https://quran.com', enabled: false, icon: '📖' },
  { id: 'hadithapi', name: 'HadithAPI', description: 'Public Hadith Database', url: 'https://hadithapi.com', enabled: false, icon: '📚' },
  { id: 'islamicfinder', name: 'IslamicFinder', description: 'Prayer times & Qibla direction', url: 'https://www.islamicfinder.org', enabled: false, icon: '🕌' },
  { id: 'islamhouse', name: 'IslamHouse', description: 'Islamic books library', url: 'https://islamhouse.com', enabled: false, icon: '🏠' },
];

const Integrations = () => {
  const { settings, isRTL } = useApp();
  const [integrations, setIntegrations] = useState<Integration[]>(() => {
    const saved = localStorage.getItem('ahadees_integrations');
    return saved ? JSON.parse(saved) : DEFAULT_INTEGRATIONS;
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', description: '', url: '', icon: '🔌' });

  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const engFont = { fontFamily: "'Orbitron', sans-serif" };

  const save = (items: Integration[]) => {
    setIntegrations(items);
    localStorage.setItem('ahadees_integrations', JSON.stringify(items));
  };

  const toggle = (id: string) => save(integrations.map(i => i.id === id ? { ...i, enabled: !i.enabled } : i));
  const remove = (id: string) => { save(integrations.filter(i => i.id !== id)); toast.success('Removed!'); };

  const addIntegration = () => {
    if (!newItem.name || !newItem.url) { toast.error('Name and URL required'); return; }
    const item: Integration = { ...newItem, id: Date.now().toString(), enabled: true };
    save([...integrations, item]);
    setNewItem({ name: '', description: '', url: '', icon: '🔌' });
    setShowAddForm(false);
    toast.success('Integration added!');
  };

  return (
    <div className={`pb-24 md:pb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <Layers size={18} className="text-red-400" />
          <h1 className="text-xl font-bold text-white glow-text-white" style={settings.language !== 'en' ? urduFont : engFont}>
            {settings.language === 'ur' ? 'انضمام' : settings.language === 'ar' ? 'التكاملات' : 'Integrations'}
          </h1>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-red-500 to-transparent rounded mt-2" />
      </div>

      <div className="px-4 space-y-4 mt-4">
        {/* Info */}
        <GlowCard className="p-4" intensity="low">
          <div className="flex gap-3 items-start">
            <Puzzle size={18} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/70 leading-relaxed" style={settings.language !== 'en' ? { ...urduFont, lineHeight: '2' } : {}}>
              {settings.language === 'ur'
                ? 'آپ یہاں کوئی بھی ایپ یا فیچر انٹیگریٹ کر سکتے ہیں۔ ہر انضمام کو فعال یا غیر فعال کریں اور اپنی ضرورت کے مطابق منظم کریں۔'
                : 'Install and manage any app or feature integration here. Enable, disable, and organize integrations as needed.'}
            </p>
          </div>
        </GlowCard>

        {/* Add Button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-600/30 border border-red-500/50 text-red-300 hover:bg-red-500/40 transition-all text-sm min-h-[48px]"
        >
          <Plus size={16} />
          <span style={settings.language !== 'en' ? urduFont : {}}>
            {settings.language === 'ur' ? 'نیا انضمام شامل کریں' : 'Add New Integration'}
          </span>
        </button>

        {/* Add Form */}
        {showAddForm && (
          <GlowCard className="p-4 space-y-3" intensity="medium">
            <h3 className="text-sm font-bold text-white mb-2" style={settings.language !== 'en' ? urduFont : {}}>
              {settings.language === 'ur' ? 'نئی انٹیگریشن' : 'New Integration'}
            </h3>
            {[
              { key: 'icon', placeholder: 'Icon (emoji)', type: 'text' },
              { key: 'name', placeholder: 'App/Feature Name', type: 'text' },
              { key: 'url', placeholder: 'URL (https://...)', type: 'url' },
              { key: 'description', placeholder: 'Description (optional)', type: 'text' },
            ].map(field => (
              <input
                key={field.key}
                type={field.type}
                placeholder={field.placeholder}
                value={(newItem as any)[field.key]}
                onChange={e => setNewItem(prev => ({ ...prev, [field.key]: e.target.value }))}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-red-500/60 min-h-[44px]"
              />
            ))}
            <div className="flex gap-2">
              <button onClick={addIntegration} className="flex-1 py-2.5 rounded-lg bg-red-600/50 text-white text-sm hover:bg-red-500/60 transition-all min-h-[44px]">
                {settings.language === 'ur' ? 'شامل کریں' : 'Add'}
              </button>
              <button onClick={() => setShowAddForm(false)} className="flex-1 py-2.5 rounded-lg bg-white/10 text-white/70 text-sm hover:bg-white/20 transition-all min-h-[44px]">
                {settings.language === 'ur' ? 'منسوخ' : 'Cancel'}
              </button>
            </div>
          </GlowCard>
        )}

        {/* Integrations List */}
        <div className="space-y-3">
          {integrations.map(item => (
            <GlowCard key={item.id} className={`p-4 ${!item.enabled ? 'opacity-60' : ''}`} intensity="low">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{item.name}</h3>
                    {item.enabled && <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />}
                  </div>
                  <p className="text-xs text-white/50 mt-0.5">{item.description}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-red-300/70 hover:text-red-300 mt-1 transition-colors">
                    <ExternalLink size={10} />
                    <span className="truncate">{item.url}</span>
                  </a>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => toggle(item.id)} className="p-2 hover:bg-white/10 rounded-lg transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center">
                    {item.enabled ? <Eye size={15} className="text-green-400" /> : <EyeOff size={15} className="text-white/40" />}
                  </button>
                  <button onClick={() => remove(item.id)} className="p-2 hover:bg-red-900/30 rounded-lg transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center">
                    <Trash2 size={15} className="text-red-500/70" />
                  </button>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Developer Note */}
        <GlowCard className="p-4" intensity="low">
          <div className="flex gap-3 items-start">
            <Code size={16} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-white/50 leading-relaxed" style={settings.language !== 'en' ? { ...urduFont, lineHeight: '2' } : {}}>
              {settings.language === 'ur'
                ? 'ڈویلپر نوٹ: بیک اینڈ فعال ہونے کے بعد مکمل API انٹیگریشن، خودکار اپڈیٹس اور پلگ ان سسٹم دستیاب ہوگا۔'
                : 'Developer Note: Full API integrations, auto-updates, and plugin system will be available once backend is enabled.'}
            </p>
          </div>
        </GlowCard>
      </div>
    </div>
  );
};

export default Integrations;
