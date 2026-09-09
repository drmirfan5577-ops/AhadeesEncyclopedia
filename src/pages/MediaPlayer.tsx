import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import GlowCard from '@/components/features/GlowCard';
import {
  Play, Pause, Square, Volume2, VolumeX, SkipBack, SkipForward,
  Shuffle, Repeat, Music, Video, Image as ImageIcon, ChevronUp,
  ChevronDown, Maximize2, Minimize2, X, List, Heart
} from 'lucide-react';

interface Track {
  id: string;
  type: 'audio' | 'video';
  title: string;
  subtitle: string;
  url: string;
  thumbnail?: string;
  duration?: string;
}

// Sample Islamic Audio Tracks (using public domain/CC quran.com style URLs)
const SAMPLE_TRACKS: Track[] = [
  {
    id: '1', type: 'audio',
    title: 'سورۃ الفاتحہ',
    subtitle: 'قاری عبد الرحمن السدیس',
    url: 'https://server8.mp3quran.net/afs/001.mp3',
    duration: '0:47'
  },
  {
    id: '2', type: 'audio',
    title: 'سورۃ البقرہ',
    subtitle: 'قاری مشاری العفاسی',
    url: 'https://server7.mp3quran.net/m_afs/002.mp3',
    duration: '2:22:00'
  },
  {
    id: '3', type: 'audio',
    title: 'سورۃ الاخلاص',
    subtitle: 'قاری سعد الغامدی',
    url: 'https://server7.mp3quran.net/s_gmd/112.mp3',
    duration: '0:20'
  },
  {
    id: '4', type: 'audio',
    title: 'سورۃ الکہف',
    subtitle: 'قاری ماہر المعیقلی',
    url: 'https://server12.mp3quran.net/maher/018.mp3',
    duration: '43:00'
  },
  {
    id: '5', type: 'audio',
    title: 'سورۃ یاسین',
    subtitle: 'قاری عبد الباسط',
    url: 'https://server8.mp3quran.net/basit/036.mp3',
    duration: '25:00'
  },
];

type PlayerSize = 'mini' | 'normal' | 'full';

const MediaPlayer = () => {
  const { settings, isRTL } = useApp();
  const [tracks] = useState<Track[]>(SAMPLE_TRACKS);
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [playerSize, setPlayerSize] = useState<PlayerSize>('normal');
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [favorites, setFavs] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };
  const lf = settings.language !== 'en' ? urduFont : {};

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setCurrentTime(formatTime(audio.currentTime));
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onLoaded = () => setDuration(formatTime(audio.duration || 0));
    const onEnded = () => {
      if (repeat) { audio.currentTime = 0; audio.play(); }
      else handleNext();
    };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, [repeat, currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { audio.play().catch(() => {}); setIsPlaying(true); }
  };

  const handleNext = () => {
    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    const next = shuffle
      ? tracks[Math.floor(Math.random() * tracks.length)]
      : tracks[(idx + 1) % tracks.length];
    setCurrentTrack(next);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play().catch(() => {}), 100);
  };

  const handlePrev = () => {
    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    const prev = tracks[(idx - 1 + tracks.length) % tracks.length];
    setCurrentTrack(prev);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play().catch(() => {}), 100);
  };

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const val = Number(e.target.value);
    audio.currentTime = (val / 100) * (audio.duration || 0);
    setProgress(val);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val / 100;
  };

  const toggleFav = (id: string) => setFavs(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const selectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play().catch(() => {}), 100);
  };

  return (
    <div className={`pb-24 md:pb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        muted={muted}
      />

      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-white glow-text-white" style={lf}>
            {settings.language === 'ur' ? 'میڈیا پلیئر' : 'Media Player'}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setPlayerSize(s => s === 'full' ? 'normal' : 'full')}
              className="p-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              {playerSize === 'full' ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="p-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <List size={14} />
            </button>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-red-500 to-transparent rounded mt-2" />
      </div>

      <div className="px-4 space-y-4 mt-2">
        {/* Main Player */}
        <GlowCard className="p-5" intensity="high">
          {/* Album Art / Visualizer */}
          <div className="relative flex items-center justify-center mb-5">
            <div className={`w-40 h-40 rounded-full bg-gradient-to-br from-red-600 to-rose-900 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.5)] border-4 border-red-500/30 transition-all ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`}>
              <Music size={56} className="text-white/70" />
            </div>
            {isPlaying && (
              <div className="absolute inset-0 rounded-full">
                <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping" />
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-white glow-text-white" style={urduFont}>{currentTrack.title}</h2>
            <p className="text-sm text-red-300/70 mt-1" style={urduFont}>{currentTrack.subtitle}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <input
              type="range" min={0} max={100} value={progress}
              onChange={handleProgress}
              className="w-full accent-red-500 h-1"
            />
            <div className="flex justify-between text-xs text-white/40 mt-1 font-mono">
              <span>{currentTime}</span>
              <span>{currentTrack.duration || duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={`p-2 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center ${shuffle ? 'text-red-400 bg-red-500/20' : 'text-white/40 hover:text-white/70'}`}
            >
              <Shuffle size={18} />
            </button>
            <button
              onClick={handlePrev}
              className="p-2 rounded-full text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <SkipBack size={22} />
            </button>
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.6)] border-2 border-red-400/50 hover:from-red-400 hover:to-rose-600 transition-all"
            >
              {isPlaying ? <Pause size={26} className="text-white" /> : <Play size={26} className="text-white ml-1" />}
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <SkipForward size={22} />
            </button>
            <button
              onClick={() => setRepeat(!repeat)}
              className={`p-2 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center ${repeat ? 'text-red-400 bg-red-500/20' : 'text-white/40 hover:text-white/70'}`}
            >
              <Repeat size={18} />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 mt-4">
            <button onClick={() => setMuted(!muted)} className="text-white/60 hover:text-red-300 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center">
              {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range" min={0} max={100} value={muted ? 0 : volume}
              onChange={handleVolume}
              className="flex-1 accent-red-500 h-1"
            />
            <span className="text-xs text-white/40 font-mono w-8">{muted ? 0 : volume}%</span>
          </div>
        </GlowCard>

        {/* Playlist */}
        {showPlaylist && (
          <GlowCard className="p-4" intensity="medium">
            <h3 className="text-sm font-bold text-white mb-3" style={lf}>
              {settings.language === 'ur' ? 'پلے لسٹ' : 'Playlist'}
            </h3>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {tracks.map(track => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(track)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all min-h-[50px] ${currentTrack.id === track.id ? 'bg-red-500/20 border border-red-400/50' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentTrack.id === track.id && isPlaying ? 'bg-red-500 animate-pulse' : 'bg-white/10'}`}>
                    {currentTrack.id === track.id && isPlaying
                      ? <div className="flex gap-0.5 items-end h-4"><div className="w-1 bg-white rounded animate-bounce" style={{ height: '60%' }} /><div className="w-1 bg-white rounded animate-bounce" style={{ height: '100%', animationDelay: '0.1s' }} /><div className="w-1 bg-white rounded animate-bounce" style={{ height: '80%', animationDelay: '0.2s' }} /></div>
                      : <Music size={14} className="text-white/50" />
                    }
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-white font-medium" style={urduFont}>{track.title}</p>
                    <p className="text-[10px] text-white/40" style={urduFont}>{track.subtitle}</p>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); toggleFav(track.id); }}
                    className="text-white/40 hover:text-red-300 transition-colors"
                  >
                    <Heart size={12} className={favorites.includes(track.id) ? 'fill-red-400 text-red-400' : ''} />
                  </button>
                  <span className="text-[10px] text-white/30 font-mono">{track.duration}</span>
                </button>
              ))}
            </div>
          </GlowCard>
        )}

        {/* Upload Custom Media */}
        <GlowCard className="p-4" intensity="low">
          <h3 className="text-sm font-bold text-white mb-3" style={lf}>
            {settings.language === 'ur' ? 'اپنا میڈیا شامل کریں' : 'Add Your Media'}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: '🎵', label: settings.language === 'ur' ? 'آڈیو' : 'Audio', accept: 'audio/*' },
              { icon: '🎬', label: settings.language === 'ur' ? 'ویڈیو' : 'Video', accept: 'video/*' },
              { icon: '🖼️', label: settings.language === 'ur' ? 'تصویر' : 'Image', accept: 'image/*' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => {
                  const inp = document.createElement('input');
                  inp.type = 'file'; inp.accept = item.accept;
                  inp.onchange = () => { if (inp.files?.[0]) alert(`${inp.files[0].name} selected`); };
                  inp.click();
                }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 transition-all min-h-[60px]"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs text-white/60" style={lf}>{item.label}</span>
              </button>
            ))}
          </div>
        </GlowCard>
      </div>
    </div>
  );
};

export default MediaPlayer;
