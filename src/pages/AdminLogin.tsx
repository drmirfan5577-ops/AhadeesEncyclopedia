import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import GlowCard from '@/components/features/GlowCard';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const ADMIN_PASSWORD = 'Admin5577';

const AdminLogin = () => {
  const { t, isRTL, settings, setAdminAuthenticated } = useApp();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const engFont = { fontFamily: "'Orbitron', sans-serif" };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        setAdminAuthenticated(true);
        toast.success(t('welcomeAdmin'));
        navigate('/admin');
      } else {
        toast.error(t('wrongPassword'));
        setPassword('');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(239,68,68,0.7)] border-2 border-red-400/50">
            <Shield size={36} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white glow-text-red" style={settings.language !== 'en' ? urduFont : engFont}>
            {t('adminPanel')}
          </h1>
          <p className="text-white/50 text-sm mt-1" style={settings.language !== 'en' ? urduFont : {}}>
            {settings.language === 'ur' ? 'مکمل کمانڈ اینڈ کنٹرول' : 'Full Command & Control'}
          </p>
        </div>

        <GlowCard className="p-6" intensity="high">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-white/70 mb-2" style={settings.language !== 'en' ? urduFont : {}}>
                {t('password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-red-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/30 border border-red-500/30 rounded-xl pl-10 pr-10 py-3 text-white placeholder-white/30 focus:outline-none focus:border-red-400/70 focus:shadow-[0_0_12px_rgba(239,68,68,0.3)] transition-all"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-white/40 hover:text-red-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold text-base transition-all hover:from-red-500 hover:to-rose-600 shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-red-400/40 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
              style={settings.language !== 'en' ? urduFont : engFont}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  {t('loading')}
                </span>
              ) : t('login')}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-red-500/20 text-center">
            <p className="text-xs text-white/30" style={settings.language !== 'en' ? urduFont : {}}>
              {settings.language === 'ur' ? 'صرف مجاز ایڈمن ہی داخل ہو سکتے ہیں' : 'Authorized admin access only'}
            </p>
          </div>
        </GlowCard>
      </div>
    </div>
  );
};

export default AdminLogin;
