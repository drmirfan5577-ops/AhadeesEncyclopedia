import { Link, useLocation } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import {
  Home, BookOpen, Search, Library, Settings, Info, Shield,
  Layers, BookMarked, Music, Image, Sun, Moon, ChevronLeft, ChevronRight
} from 'lucide-react';

const Navbar = () => {
  const { t, isRTL, settings, updateSettings } = useApp();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, key: 'home' },
    { path: '/books', icon: BookOpen, key: 'books' },
    { path: '/quran', icon: BookMarked, key: 'quran' },
    { path: '/search', icon: Search, key: 'search' },
    { path: '/media', icon: Music, key: 'media' },
    { path: '/gallery', icon: Image, key: 'gallery' },
    { path: '/library', icon: Library, key: 'library' },
    { path: '/settings', icon: Settings, key: 'settings' },
    { path: '/about', icon: Info, key: 'about' },
  ];

  const labelFont = settings.language !== 'en'
    ? { fontFamily: "'Noto Nastaliq Urdu', serif" }
    : { fontFamily: "'Orbitron', sans-serif" };

  const isLight = settings.theme === 'light';

  // Bottom nav items (mobile) - limit to 5
  const bottomItems = navItems.slice(0, 5);

  return (
    <>
      {/* Top Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 border-b ${isLight ? 'nav-glass-light border-red-400/20' : 'nav-glass border-red-500/30'}`}>
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.7)] border border-red-400/50">
              <span className="text-white text-lg font-bold">ح</span>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-sm font-bold text-red-300 leading-none glow-text-red" style={labelFont}>
                {t('appName')}
              </h1>
              <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-white/60'}`}>{t('appSubtitle')}</p>
            </div>
          </Link>
          <div className="flex items-center gap-1.5">
            {/* Theme Toggle */}
            <button
              onClick={() => updateSettings({ theme: isLight ? 'dark' : 'light' })}
              className={`p-2 rounded-lg transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center ${isLight ? 'bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-600' : 'bg-red-500/20 hover:bg-red-500/30 text-yellow-300'}`}
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <Link to="/integrations" className={`p-2 rounded-lg transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center ${isLight ? 'hover:bg-red-100 text-red-500' : 'hover:bg-red-500/20 text-red-300'}`}>
              <Layers size={16} />
            </Link>
            <Link to="/legal" className={`p-2 rounded-lg transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center ${isLight ? 'hover:bg-red-100 text-red-500' : 'hover:bg-red-500/20 text-red-300'}`}>
              <Shield size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Bottom Navigation (mobile) */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 border-t md:hidden ${isLight ? 'nav-glass-light border-red-400/20' : 'nav-glass border-red-500/30'}`}>
        <div className="flex items-center justify-around h-16 px-1">
          {bottomItems.map(({ path, icon: Icon, key }) => {
            const active = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all min-w-[56px] min-h-[52px] justify-center ${
                  active
                    ? 'text-red-400 bg-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                    : isLight ? 'text-gray-500 hover:text-red-500' : 'text-white/60 hover:text-red-300'
                }`}
              >
                <Icon size={19} />
                <span className="text-[9px] leading-none" style={labelFont}>{t(key)}</span>
              </Link>
            );
          })}
          {/* More dots navigation */}
          <Link
            to="/library"
            className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all min-w-[56px] min-h-[52px] justify-center ${
              location.pathname === '/library' ? 'text-red-400 bg-red-500/20' : isLight ? 'text-gray-500' : 'text-white/60'
            }`}
          >
            <Library size={19} />
            <span className="text-[9px] leading-none" style={labelFont}>{t('library')}</span>
          </Link>
        </div>
      </nav>

      {/* Side Navigation (desktop) */}
      <nav className={`hidden md:flex fixed left-0 top-16 bottom-0 w-56 border-r flex-col py-3 z-40 ${isLight ? 'nav-glass-light border-red-400/20' : 'nav-glass border-red-500/30'}`}>
        <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
          {navItems.map(({ path, icon: Icon, key }) => {
            const active = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 my-0.5 rounded-xl transition-all ${
                  active
                    ? 'text-red-300 bg-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.3)] border border-red-500/30'
                    : isLight
                    ? 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                    : 'text-white/70 hover:text-red-300 hover:bg-red-500/10'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium" style={{ ...labelFont, fontSize: settings.language !== 'en' ? '14px' : undefined }}>
                  {t(key)}
                </span>
              </Link>
            );
          })}
        </div>
        <div className={`border-t px-2 pt-2 pb-3 space-y-0.5 ${isLight ? 'border-red-400/20' : 'border-red-500/20'}`}>
          <Link to="/integrations" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isLight ? 'text-gray-500 hover:text-red-500 hover:bg-red-50' : 'text-white/60 hover:text-red-300 hover:bg-red-500/10'}`}>
            <Layers size={18} />
            <span className="text-sm" style={labelFont}>{t('integrations')}</span>
          </Link>
          <Link to="/legal" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isLight ? 'text-gray-500 hover:text-red-500 hover:bg-red-50' : 'text-white/60 hover:text-red-300 hover:bg-red-500/10'}`}>
            <Shield size={18} />
            <span className="text-sm" style={labelFont}>{t('legal')}</span>
          </Link>
          <Link to="/admin" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isLight ? 'text-red-500 hover:bg-red-50' : 'text-red-400/80 hover:text-red-300 hover:bg-red-500/10'}`}>
            <Shield size={18} className="text-red-400" />
            <span className="text-sm" style={labelFont}>{t('admin')}</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
