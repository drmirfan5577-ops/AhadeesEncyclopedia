import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";
import Navbar from "@/components/layout/Navbar";
import Index from "./pages/Index";
import HadeesBooks from "./pages/HadeesBooks";
import SearchPage from "./pages/SearchPage";
import Settings from "./pages/Settings";
import Library from "./pages/Library";
import About from "./pages/About";
import Legal from "./pages/Legal";
import Integrations from "./pages/Integrations";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import MediaPlayer from "./pages/MediaPlayer";
import Gallery from "./pages/Gallery";
import QuranSection from "./pages/QuranSection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Admin Route
const ProtectedAdmin = () => {
  const { isAdminAuthenticated } = useApp();
  return isAdminAuthenticated ? <AdminPanel /> : <Navigate to="/admin/login" replace />;
};

const AppLayout = () => {
  const { settings } = useApp();
  const isLight = settings.theme === 'light';

  return (
    <div className={`min-h-screen ${isLight ? 'app-bg-light' : 'app-bg'}`}>
      {/* Animated LED Background (dark only) */}
      {!isLight && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="led-orb led-orb-1" />
          <div className="led-orb led-orb-2" />
          <div className="led-orb led-orb-3" />
          <div className="grid-overlay" />
        </div>
      )}
      {/* Light theme decorative elements */}
      {isLight && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="light-orb light-orb-1" />
          <div className="light-orb light-orb-2" />
        </div>
      )}
      <Navbar />
      <main className="pt-16 md:pl-56">
        <div className="max-w-3xl mx-auto">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/books" element={<HadeesBooks />} />
            <Route path="/books/:bookId" element={<HadeesBooks />} />
            <Route path="/quran" element={<QuranSection />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/library" element={<Library />} />
            <Route path="/media" element={<MediaPlayer />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedAdmin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
