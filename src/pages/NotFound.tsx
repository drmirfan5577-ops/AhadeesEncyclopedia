import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useApp } from "@/contexts/AppContext";

const NotFound = () => {
  const location = useLocation();
  const { settings } = useApp();
  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const engFont = { fontFamily: "'Orbitron', sans-serif" };

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold glow-text-red mb-4" style={engFont}>404</div>
        <h1 className="text-2xl font-bold text-white mb-2 glow-text-white" style={settings.language !== 'en' ? urduFont : engFont}>
          {settings.language === 'ur' ? 'صفحہ نہیں ملا' : 'Page Not Found'}
        </h1>
        <p className="text-white/60 mb-6" style={settings.language !== 'en' ? urduFont : {}}>
          {settings.language === 'ur' ? 'یہ صفحہ موجود نہیں ہے' : 'This page does not exist'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-all shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-red-400/50 min-h-[44px]"
          style={settings.language !== 'en' ? urduFont : engFont}
        >
          {settings.language === 'ur' ? 'ہوم پر واپس' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
