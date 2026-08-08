import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  Share2,
  X,
  Eye,
  Radio,
  Copy,
  Check,
  Feather,
  Menu,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  BookOpen,
  Send,
  User,
  Sun,
  Moon,
  Video,
  Tv,
  Heart,
  Grid,
  Search,
  Bookmark,
  PlayCircle,
  Image as ImageIcon,
  Palette,
  Plus,
  Shield,
  Trash2,
  Phone,
  MessageSquare,
  ExternalLink,
  Globe,
  CheckCircle2,
  BadgeCheck,
  ThumbsUp,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";
import pashtoIcon from "../assets/images/pashto_poetry_app_icon_1785357012134.jpg";
import { Poet, PoetryPost, FeaturedSlide, TelegramAdmin } from "../types";

const TikTokIcon: React.FC = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.04z"/>
  </svg>
);

const TwitterXIcon: React.FC = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface PhoneSimulatorProps {
  channelUsername: string;
  setChannelUsername: (ch: string) => void;
  botToken: string;
  setBotToken: (tok: string) => void;
  poets?: Poet[];
  onAddPoet?: (poet: Poet) => void;
  slides?: FeaturedSlide[];
  posts?: PoetryPost[];
  telegramAdmins?: TelegramAdmin[];
  onAddTelegramAdmin?: (admin: TelegramAdmin) => void;
  onDeleteTelegramAdmin?: (id: string) => void;
}

const DEFAULT_SLIDES: FeaturedSlide[] = [
  {
    id: 1,
    poet: "حمزه بابا",
    category: "غزل",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verse: "زړه مې له دردونو نه ډک شوی دی جانانه\nستا د ياد لمبو کې راته هره شپه ژړا شوه",
    bgUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    poet: "غني خان",
    category: "نظم",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    verse: "راشه چې ملګري د احساس د لارې شو\nزړونه به نږدې کړو او اشنا د يو بل شو",
    bgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
  },
];

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  channelUsername,
  setChannelUsername,
  botToken,
  setBotToken,
  poets = [],
  slides = DEFAULT_SLIDES,
  posts: propPosts,
  telegramAdmins = [],
  onAddTelegramAdmin,
  onDeleteTelegramAdmin,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Selected Telegram Admin profile detail modal
  const [selectedAdminProfile, setSelectedAdminProfile] = useState<TelegramAdmin | null>(null);
  const [copiedTgUser, setCopiedTgUser] = useState(false);

  // Selected Poet profile detail modal
  const [selectedPoetProfile, setSelectedPoetProfile] = useState<Poet | null>(null);

  const handleOpenPoetProfile = (poetOrName: Poet | string) => {
    if (typeof poetOrName === "string") {
      if (poetOrName === "ټول شاعران" || poetOrName === "all") return;
      const found = poets.find(
        (p) => p.name === poetOrName || p.id === poetOrName || p.name.includes(poetOrName)
      );
      if (found) {
        setSelectedPoetProfile(found);
      } else {
        setSelectedPoetProfile({
          id: `poet_${Date.now()}`,
          name: poetOrName,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
          bio: `د ${poetOrName} خپاره شوي شعرونه، غزلې او ځانګړي کلامونه`,
        });
      }
    } else {
      if (poetOrName.id === "all" || poetOrName.name === "ټول شاعران") return;
      setSelectedPoetProfile(poetOrName);
    }
  };

  // Post Likes state
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [postLikesCount, setPostLikesCount] = useState<Record<number, number>>({});

  const toggleLikePost = (postId: number) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[postId];
      setPostLikesCount((cntMap) => ({
        ...cntMap,
        [postId]: (cntMap[postId] || 15) + (isLiked ? 1 : -1),
      }));
      return { ...prev, [postId]: isLiked };
    });
  };

  // Post Favorites state
  const [favoritedPosts, setFavoritedPosts] = useState<Record<number, boolean>>({});
  const [showFavoritesActivity, setShowFavoritesActivity] = useState(false);

  // Video Reels Activity state
  const [showReelsActivity, setShowReelsActivity] = useState(false);
  const [activeReelCategory, setActiveReelCategory] = useState<string>("ټول ریلز");

  const toggleFavoritePost = (postId: number) => {
    setFavoritedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Theme state (Dark Mode vs Light Mode)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Filter state by poet name
  const [selectedPoetName, setSelectedPoetName] = useState<string>("all");

  // Selected quick action category state
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Active posts list
  const activePostsList = propPosts || [];

  // ViewPager Slide state
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto advance slides every 4.5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, [slides.length]);

  // Handle Copy
  const handleCopyText = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Build list of unique poet names for option chips
  const DEFAULT_POET_NAMES = ["ټول شاعران", "حمزه بابا", "غني خان", "رحمان بابا", "خوشحال خټک", "پیر محمد کاکړ"];
  const dynamicPoetNames = Array.from(
    new Set([
      "ټول شاعران",
      ...poets.map((p) => p.name).filter(Boolean),
      ...activePostsList.map((post) => post.poetName).filter(Boolean),
      ...DEFAULT_POET_NAMES,
    ])
  );

  // SORT POSTS DESCENDING BY TIMESTAMP SO EVERY NEW POST ALWAYS COMES TO THE VERY TOP (#1)
  const sortedPosts = [...activePostsList].sort((a, b) => {
    const idA = typeof a.id === "number" ? a.id : Number(a.id) || 0;
    const idB = typeof b.id === "number" ? b.id : Number(b.id) || 0;
    const timeA = a.timestamp || idA;
    const timeB = b.timestamp || idB;
    return timeB - timeA;
  });

  // Filter posts based on selected poet name & active category
  const filteredPosts = sortedPosts.filter((post) => {
    // Category filter
    if (activeCategory === "video" && !post.videoUrl && post.mediaType !== "VIDEO") return false;
    if (
      activeCategory === "designed" &&
      !post.isDesignedPoster &&
      post.mediaType !== "DESIGNED_POSTER" &&
      post.category !== "ډیزاین شوی عکس"
    )
      return false;
    if (activeCategory === "fav" && !favoritedPosts[post.id]) return false;

    // Poet filter
    if (selectedPoetName === "all" || selectedPoetName === "ټول شاعران") return true;
    return post.poetName === selectedPoetName || post.text?.includes(selectedPoetName);
  });

  return (
    <div className="w-full flex flex-col items-center justify-center py-2">
      {/* Device Frame */}
      <div className="relative w-full max-w-[380px] h-[780px] bg-slate-900 rounded-[50px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700/50 flex flex-col overflow-hidden">
        {/* Notch / Camera Bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-slate-950 rounded-b-2xl z-40 flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800"></div>
          <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
        </div>

        {/* Android Screen Container with Light/Dark Mode */}
        <div
          className={`w-full h-full rounded-[40px] overflow-hidden flex flex-col relative font-sans shadow-inner transition-colors duration-300 ${
            isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-800"
          }`}
        >
          {/* Status Bar */}
          <div
            className={`text-white text-[11px] px-6 pt-2 pb-1 flex items-center justify-between z-30 font-medium shrink-0 transition-colors ${
              isDarkMode ? "bg-slate-900 border-b border-slate-800" : "bg-[#008069]"
            }`}
          >
            <span>12:45</span>
            <div className="flex items-center gap-1.5 text-white/90">
              <Radio className="w-3 h-3" />
              <span>5G</span>
              <div className="w-4 h-2.5 border border-white rounded-xs p-0.5 flex items-center">
                <div className="w-full h-full bg-white"></div>
              </div>
            </div>
          </div>

          {/* MAIN APP HOME SCREEN */}
          <div
            className={`flex-1 flex flex-col overflow-hidden relative transition-colors ${
              isDarkMode ? "bg-slate-950" : "bg-slate-100"
            }`}
          >
            {/* Material App Toolbar: Menu Button moved to the RIGHT side as requested */}
            <div
              className={`text-white px-3.5 py-2.5 flex items-center justify-between shadow-md z-20 shrink-0 transition-colors ${
                isDarkMode ? "bg-emerald-900/90 border-b border-emerald-800/50" : "bg-[#00A884]"
              }`}
            >
              {/* Left Side: App Icon, Title, Channel Username */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg overflow-hidden border border-white/30 shrink-0">
                  <img src={pashtoIcon} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-tight leading-none">پښتو شعرونه</h2>
                  <span className="text-[10px] text-emerald-100/90 font-medium block mt-0.5">پښتو خواږه کلامونه</span>
                </div>
              </div>

              {/* Right Side: Theme Switcher & Menu Drawer Button on the Right */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all flex items-center gap-1"
                  title={isDarkMode ? "لایټ موډ (Light Mode)" : "ډارک موډ (Dark Mode)"}
                >
                  {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-100" />}
                </button>

                <button
                  onClick={() => setShowMenuDrawer(true)}
                  className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 active:scale-95 text-white transition-all flex items-center gap-1 font-bold shadow-xs"
                  title="مینو (Menu)"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* MAIN SCROLLABLE AREA - FEATURING SLIDER + 4 ACTION BUTTONS + POET CHIPS + POSTS FEED ALL SCROLL TOGETHER */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
              {/* 1. FEATURED VIEWPAGER SLIDER */}
              {slides && slides.length > 0 && (
                <div
                  className={`p-2.5 rounded-2xl shadow-md border transition-colors ${
                    isDarkMode ? "bg-slate-900 text-white border-slate-800" : "bg-slate-900 text-white border-slate-800"
                  }`}
                >
                  <div className="relative h-32 rounded-xl overflow-hidden shadow-lg border border-slate-700/80 group">
                    <img
                      src={slides[activeSlide]?.bgUrl || slides[0]?.bgUrl}
                      alt="Featured Slide"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-500 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />

                    <div className="relative z-10 h-full flex flex-col justify-between p-3">
                      <div className="flex items-center justify-between">
                        <div
                          onClick={() => handleOpenPoetProfile(slides[activeSlide]?.poet || slides[0]?.poet)}
                          className="flex items-center gap-2 cursor-pointer group/slidePoet"
                          title="د دې شاعر پوره پروفایل او کلامونه ګورئ"
                        >
                          <img
                            src={slides[activeSlide]?.avatar || slides[0]?.avatar}
                            alt={slides[activeSlide]?.poet || slides[0]?.poet}
                            className="w-6 h-6 rounded-full object-cover border-2 border-emerald-400 shadow-md group-hover/slidePoet:scale-110 transition-transform"
                          />
                          <span className="font-bold text-xs text-white drop-shadow-xs group-hover/slidePoet:text-emerald-300 transition-colors">
                            {slides[activeSlide]?.poet || slides[0]?.poet}
                          </span>
                        </div>
                        <span className="bg-emerald-500 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                          {slides[activeSlide]?.category || "شعر"}
                        </span>
                      </div>

                      <p
                        dir="rtl"
                        className="text-xs font-serif font-bold text-emerald-100 leading-relaxed text-right line-clamp-2 px-1 drop-shadow-xs"
                      >
                        {slides[activeSlide]?.verse || slides[0]?.verse}
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-white/10">
                        <div className="flex items-center gap-1">
                          {slides.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveSlide(idx)}
                              className={`h-1.5 rounded-full transition-all ${
                                activeSlide === idx ? "w-4 bg-emerald-400" : "w-1.5 bg-white/40"
                              }`}
                            />
                          ))}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                            className="w-5 h-5 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white flex items-center justify-center transition-all shadow-xs"
                            title="پخوانی سلایډ"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
                            className="w-5 h-5 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white flex items-center justify-center transition-all shadow-xs"
                            title="بل سلایډ"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. FEATURE BUTTONS DIRECTLY UNDER THE SLIDER (شارټ ویډیو، ډیزاین عکسونه او نور) */}
              <div className="grid grid-cols-5 gap-1">
                <button
                  onClick={() => setShowReelsActivity(true)}
                  className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-xl transition-all shadow-xs border text-[9px] font-bold ${
                    showReelsActivity || activeCategory === "video"
                      ? "bg-rose-600 text-white border-rose-600 ring-2 ring-rose-400/50"
                      : isDarkMode
                      ? "bg-slate-900 text-rose-300 border-slate-800 hover:bg-slate-800"
                      : "bg-white text-rose-700 border-slate-200/80 hover:bg-rose-50"
                  }`}
                  title="د ویډیو ریلز اکټیویټي (Reels Activity)"
                >
                  <Tv className="w-3.5 h-3.5 mb-1 text-rose-500 fill-rose-500/20" />
                  <span>ویډیو ریلز</span>
                </button>

                <button
                  onClick={() => setActiveCategory(activeCategory === "designed" ? "all" : "designed")}
                  className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-xl transition-all shadow-xs border text-[9px] font-bold ${
                    activeCategory === "designed"
                      ? "bg-purple-600 text-white border-purple-600 ring-2 ring-purple-400/50"
                      : isDarkMode
                      ? "bg-slate-900 text-purple-300 border-slate-800 hover:bg-slate-800"
                      : "bg-white text-purple-700 border-slate-200/80 hover:bg-purple-50"
                  }`}
                >
                  <Palette className="w-3.5 h-3.5 mb-1 text-purple-500" />
                  <span>ډیزاین عکسونه</span>
                </button>

                <button
                  onClick={() => setActiveCategory(activeCategory === "best" ? "all" : "best")}
                  className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-xl transition-all shadow-xs border text-[9px] font-bold ${
                    activeCategory === "best"
                      ? "bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-400/50"
                      : isDarkMode
                      ? "bg-slate-900 text-emerald-300 border-slate-800 hover:bg-slate-800"
                      : "bg-white text-emerald-700 border-slate-200/80 hover:bg-emerald-50"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 mb-1 text-emerald-500" />
                  <span>غوره غزلې</span>
                </button>

                <button
                  onClick={() => setShowFavoritesActivity(true)}
                  className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-xl transition-all shadow-xs border text-[9px] font-bold ${
                    showFavoritesActivity || activeCategory === "fav"
                      ? "bg-amber-600 text-white border-amber-600 ring-2 ring-amber-400/50"
                      : isDarkMode
                      ? "bg-slate-900 text-amber-300 border-slate-800 hover:bg-slate-800"
                      : "bg-white text-amber-700 border-slate-200/80 hover:bg-amber-50"
                  }`}
                  title="فیورېټ شعرونه (Favorites Activity)"
                >
                  <Bookmark className="w-3.5 h-3.5 mb-1 text-amber-500 fill-amber-500/20" />
                  <span>فیورېټ</span>
                </button>

                <button
                  onClick={() => setActiveCategory(activeCategory === "cats" ? "all" : "cats")}
                  className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-xl transition-all shadow-xs border text-[9px] font-bold ${
                    activeCategory === "cats"
                      ? "bg-sky-600 text-white border-sky-600 ring-2 ring-sky-400/50"
                      : isDarkMode
                      ? "bg-slate-900 text-sky-300 border-slate-800 hover:bg-slate-800"
                      : "bg-white text-sky-700 border-slate-200/80 hover:bg-sky-50"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5 mb-1 text-sky-500" />
                  <span>کټګورۍ</span>
                </button>
              </div>

              {/* 3. POET NAME OPTION CHIPS */}
              <div
                className={`rounded-2xl p-2 shadow-sm border transition-colors ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-800 text-slate-100"
                    : "bg-white border-slate-200/80 text-slate-800"
                }`}
              >
                {/* Horizontal Scrollable Poet Name Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
                  {dynamicPoetNames.map((poetName) => {
                    const isSelected =
                      selectedPoetName === poetName ||
                      (selectedPoetName === "all" && poetName === "ټول شاعران");
                    const foundPoet = poets.find((p) => p.name === poetName);

                    return (
                      <div key={poetName} className="flex items-center shrink-0">
                        <button
                          onClick={() => {
                            if (poetName === "ټول شاعران") {
                              setSelectedPoetName("all");
                            } else {
                              setSelectedPoetName(poetName);
                              handleOpenPoetProfile(foundPoet || poetName);
                            }
                          }}
                          className={`shrink-0 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-[#00A884] text-white border-[#00A884] shadow-sm scale-102"
                              : isDarkMode
                              ? "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200"
                          }`}
                        >
                          {foundPoet && poetName !== "ټول شاعران" && (
                            <img
                              src={foundPoet.avatar}
                              alt={foundPoet.name}
                              className="w-4 h-4 rounded-full object-cover border border-white/50 shrink-0"
                            />
                          )}
                          <span>{poetName}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3.5 TELEGRAM ADMIN & USER PROFILE CARDS */}
              {telegramAdmins.length > 0 && (
                <div
                  className={`rounded-2xl p-2 shadow-sm border transition-colors ${
                    isDarkMode
                      ? "bg-slate-900 border-slate-800 text-slate-100"
                      : "bg-white border-slate-200/80 text-slate-800"
                  }`}
                >
                  {/* Horizontal Scrollable Telegram Admin Profiles */}
                  <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-thin">
                    {telegramAdmins.map((admin) => (
                      <div
                        key={admin.id}
                        onClick={() => setSelectedAdminProfile(admin)}
                        className={`shrink-0 min-w-[125px] p-2 rounded-xl border flex items-center gap-2 transition-all relative group cursor-pointer hover:shadow-md ${
                          isDarkMode
                            ? "bg-slate-800/80 border-slate-700 text-slate-100 hover:border-sky-500"
                            : "bg-slate-50 border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50/50"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-sky-400 shrink-0 relative">
                          <img
                            src={
                              admin.avatar ||
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                            }
                            alt={admin.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="overflow-hidden pr-0.5">
                          <span className="font-bold text-[11px] truncate block leading-tight">
                            {admin.name}
                          </span>
                          <span className="text-[9px] bg-sky-500/10 text-sky-600 border border-sky-500/20 px-1.5 py-0.2 rounded-full inline-block mt-0.5 font-medium">
                            {admin.role}
                          </span>
                        </div>

                        {onDeleteTelegramAdmin && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteTelegramAdmin(admin.id);
                            }}
                            className="absolute -top-1 -left-1 w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                            title="حذفول"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. POSTS RECYCLERVIEW FEED */}
              {filteredPosts.length === 0 ? (
                <div
                  className={`text-center py-12 px-4 rounded-2xl border transition-colors ${
                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  }`}
                >
                  <Feather className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="font-bold text-xs">کوم شعر ونه موندل شو</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    د دې برخې يا شاعر لپاره فی الحال هیڅ شعر موجود نه دی.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedPoetName("all");
                      setActiveCategory("all");
                    }}
                    className="mt-2.5 text-xs bg-emerald-600 text-white font-bold px-3.5 py-1.5 rounded-xl"
                  >
                    د ټولو شاعرانو شعرونه وګورئ
                  </button>
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const matchedPoet = poets.find((p) => post.text?.includes(p.name) || post.poetName === p.name);
                  const poetAvatar =
                    matchedPoet?.avatar ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80";
                  const poetNameDisplay = post.poetName || matchedPoet?.name || "پښتو شاعر";

                  return (
                    <div
                      key={post.id}
                      className={`rounded-2xl p-4 shadow-sm border transition-all hover:shadow-md relative ${
                        isDarkMode
                          ? "bg-slate-900 border-slate-800/80 text-slate-100"
                          : "bg-white border-emerald-100/80 text-slate-800"
                      }`}
                    >
                      {/* Poet Header Info */}
                      <div
                        className={`flex items-center justify-between mb-2.5 pb-2 border-b ${
                          isDarkMode ? "border-slate-800" : "border-slate-100"
                        }`}
                      >
                        <div
                          onClick={() => handleOpenPoetProfile(matchedPoet || poetNameDisplay)}
                          className="flex items-center gap-2 cursor-pointer group/postPoet"
                          title={`${poetNameDisplay} اختصاصي پروفایل ګورئ`}
                        >
                          <img
                            src={poetAvatar}
                            alt={poetNameDisplay}
                            className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500/40 shadow-xs group-hover/postPoet:border-emerald-400 group-hover/postPoet:scale-110 transition-all"
                          />
                          <div>
                            <span
                              className={`font-bold text-xs block group-hover/postPoet:text-emerald-500 transition-colors ${
                                isDarkMode ? "text-slate-100" : "text-slate-800"
                              }`}
                            >
                              {poetNameDisplay}
                            </span>
                            <span className="text-[10px] text-emerald-500 font-medium">پښتو شاعری</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                              isDarkMode
                                ? "bg-emerald-950/60 text-emerald-300 border-emerald-800/60"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                            }`}
                          >
                            {post.category || "شعر"}
                          </span>
                          {post.viewsCount && (
                            <div
                              className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${
                                isDarkMode ? "bg-slate-800 text-slate-400" : "bg-slate-50 text-slate-400"
                              }`}
                            >
                              <Eye className="w-3 h-3" />
                              <span>{post.viewsCount}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Poetry Main Text - Pashto RTL */}
                      {post.text && (
                        <p
                          dir="rtl"
                          className={`text-sm font-semibold leading-relaxed py-2 px-1 text-right font-serif whitespace-pre-line border-r-2 border-emerald-500 pr-3 my-1 ${
                            isDarkMode ? "text-slate-100" : "text-slate-800"
                          }`}
                        >
                          {post.text}
                        </p>
                      )}

                      {/* Photo Attachment (Normal & Designed Photos) */}
                      {post.photoUrl && !post.videoUrl && post.mediaType !== "VIDEO" && (
                        <div
                          onClick={() => setSelectedPhoto(post.photoUrl!)}
                          className={`mt-2 rounded-xl overflow-hidden cursor-pointer border hover:opacity-95 transition-opacity relative group ${
                            post.isDesignedPoster || post.category === "ډیزاین شوی عکس" || post.mediaType === "DESIGNED_POSTER"
                              ? "ring-2 ring-purple-500/50 shadow-md max-h-60"
                              : "max-h-48"
                          } ${
                            isDarkMode ? "border-slate-800" : "border-slate-200"
                          }`}
                        >
                          <img src={post.photoUrl} alt="Poetry Media" className="w-full h-full object-cover" />
                          {(post.isDesignedPoster || post.category === "ډیزاین شوی عکس" || post.mediaType === "DESIGNED_POSTER") && (
                            <div className="absolute top-2 right-2 bg-purple-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs shadow-md">
                              <Palette className="w-3 h-3" />
                              <span>ډیزاین شوی پوستر 🎨</span>
                            </div>
                          )}
                          <div className="absolute bottom-2 left-2 bg-slate-900/70 text-white text-[9px] font-medium px-2 py-0.5 rounded-full backdrop-blur-xs">
                            د بشپړ لیدلو لپاره کلیک وکړئ
                          </div>
                        </div>
                      )}

                      {/* Video Attachment for Reels Video Posts */}
                      {(post.videoUrl || post.mediaType === "VIDEO") && (
                        <div
                          className="mt-2 rounded-2xl overflow-hidden bg-black border border-rose-500/30 relative shadow-md"
                        >
                          <video
                            src={post.videoUrl}
                            controls
                            className="w-full max-h-56 object-cover"
                            poster={post.photoUrl}
                          />
                          <div
                            onClick={() => setShowReelsActivity(true)}
                            className="p-2 bg-slate-950/90 text-rose-300 text-[10px] font-bold flex items-center justify-between cursor-pointer hover:bg-slate-900 border-t border-slate-800"
                          >
                            <span className="flex items-center gap-1">
                              <Tv className="w-3.5 h-3.5 text-rose-400" />
                              <span>د ټول وېډيو ريلونو د اکټيويټي په بڼه پرانيستل</span>
                            </span>
                            <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30">
                              ریلز Activity ➔
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Actions Footer */}
                      <div
                        className={`pt-2.5 mt-2 border-t flex items-center justify-between gap-1 flex-wrap ${
                          isDarkMode ? "border-slate-800" : "border-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {/* Like Button */}
                          <button
                            onClick={() => toggleLikePost(post.id)}
                            className={`text-[11px] font-bold flex items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
                              likedPosts[post.id]
                                ? "bg-rose-500/20 text-rose-500 border border-rose-500/30"
                                : isDarkMode
                                ? "bg-slate-800 text-slate-300 hover:text-rose-400"
                                : "bg-slate-100 text-slate-600 hover:text-rose-500"
                            }`}
                            title="لایک"
                          >
                            <Heart className={`w-3.5 h-3.5 ${likedPosts[post.id] ? "fill-rose-500 text-rose-500" : ""}`} />
                            <span>{postLikesCount[post.id] || 18}</span>
                          </button>

                          {/* Favorite (Bookmark) Button */}
                          <button
                            onClick={() => toggleFavoritePost(post.id)}
                            className={`text-[11px] font-bold flex items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
                              favoritedPosts[post.id]
                                ? "bg-amber-500/20 text-amber-500 border border-amber-500/30"
                                : isDarkMode
                                ? "bg-slate-800 text-slate-300 hover:text-amber-400"
                                : "bg-slate-100 text-slate-600 hover:text-amber-500"
                            }`}
                            title="فیورېټ / خوندي کول"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${favoritedPosts[post.id] ? "fill-amber-500 text-amber-500" : ""}`} />
                            <span>{favoritedPosts[post.id] ? "خوندي شو" : "فیورېټ"}</span>
                          </button>

                          {/* WhatsApp Share Button */}
                          <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                              `*${poetNameDisplay}*\n\n${post.text}\n\n_د پښتو شعرونو ايپ له لارې_`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-bold flex items-center gap-1 py-1 px-2.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all"
                            title="په واټساپ کي شریکول"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-500" />
                            <span>واټساپ</span>
                          </a>
                        </div>

                        <div className="flex items-center gap-1">
                          {/* Copy Text Button */}
                          <button
                            onClick={() => handleCopyText(post.id, post.text || "")}
                            className={`text-[11px] font-semibold flex items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
                              copiedId === post.id
                                ? "bg-emerald-600 text-white shadow-xs"
                                : isDarkMode
                                ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {copiedId === post.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-white" />
                                <span>کاپي شو!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>کاپي</span>
                              </>
                            )}
                          </button>

                          {/* Share Button */}
                          <button
                            onClick={() => {
                              if (navigator.share) {
                                navigator.share({
                                  title: poetNameDisplay,
                                  text: post.text,
                                }).catch(() => {});
                              } else {
                                handleCopyText(post.id, post.text || "");
                              }
                            }}
                            className={`text-[11px] font-semibold p-1.5 rounded-xl transition-colors ${
                              isDarkMode
                                ? "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
                                : "text-slate-600 hover:text-emerald-600 hover:bg-slate-100"
                            }`}
                            title="شريکول"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* FULL SCREEN PHOTO VIEWER MODAL */}
            {selectedPhoto && (
              <div className="absolute inset-0 bg-black z-50 flex flex-col justify-between p-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-white py-2">
                  <span className="text-xs font-semibold">Full Screen Photo</span>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center p-2">
                  <img src={selectedPhoto} alt="Preview" className="max-w-full max-h-full object-contain rounded-xl" />
                </div>
              </div>
            )}

            {/* APP SIDE MENU DRAWER */}
            {showMenuDrawer && (
              <div className="absolute inset-0 bg-slate-950/70 z-50 flex justify-end backdrop-blur-xs animate-in fade-in duration-200">
                <div className="w-64 bg-slate-900 text-white h-full p-4 flex flex-col justify-between shadow-2xl border-l border-slate-800 animate-in slide-in-from-right duration-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/40">
                          <img src={pashtoIcon} alt="Icon" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xs text-white">پښتو شعرونه</h3>
                          <span className="text-[10px] text-emerald-400">اپلیکیشن مینو</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowMenuDrawer(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2 py-2 text-xs">
                      <button
                        onClick={() => setShowMenuDrawer(false)}
                        className="w-full px-3 py-2.5 rounded-xl bg-emerald-600/20 text-emerald-300 font-bold flex items-center gap-2 text-right border border-emerald-500/30"
                      >
                        <Feather className="w-4 h-4 text-emerald-400" />
                        <span>اصلي پاڼه او شعرونه</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowMenuDrawer(false);
                          setShowFavoritesActivity(true);
                        }}
                        className="w-full px-3 py-2.5 rounded-xl text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 font-semibold flex items-center justify-between text-right transition-colors border border-amber-500/30"
                      >
                        <div className="flex items-center gap-2">
                          <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                          <span>فیورېټ شعرونه (Favorites)</span>
                        </div>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                          {Object.values(favoritedPosts).filter(Boolean).length}
                        </span>
                      </button>

                      {/* Theme Toggle Button inside Menu */}
                      <button
                        onClick={() => {
                          setIsDarkMode(!isDarkMode);
                        }}
                        className="w-full px-3 py-2.5 rounded-xl text-slate-200 bg-slate-800/80 hover:bg-slate-800 font-semibold flex items-center justify-between text-right transition-colors border border-slate-700/60"
                      >
                        <div className="flex items-center gap-2">
                          {isDarkMode ? (
                            <Sun className="w-4 h-4 text-amber-300" />
                          ) : (
                            <Moon className="w-4 h-4 text-emerald-400" />
                          )}
                          <span>حالت (Theme)</span>
                        </div>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {isDarkMode ? "ډارک (Dark)" : "لایټ (Light)"}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setShowMenuDrawer(false);
                          setShowReelsActivity(true);
                        }}
                        className="w-full px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 font-semibold flex items-center justify-between text-right transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Tv className="w-4 h-4 text-rose-400" />
                          <span>ویډیو ریلز اکټیویټي (Reels)</span>
                        </div>
                        <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-full border border-rose-500/30">
                          {activePostsList.filter((p) => p.mediaType === "VIDEO" || p.videoUrl).length}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setShowMenuDrawer(false);
                          setShowFavoritesActivity(true);
                        }}
                        className="w-full px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 font-semibold flex items-center justify-between text-right transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Bookmark className="w-4 h-4 text-amber-400" />
                          <span>فیورېټ شعرونه (Favorites)</span>
                        </div>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                          {Object.values(favoritedPosts).filter(Boolean).length}
                        </span>
                      </button>

                      <button
                        onClick={() => setShowMenuDrawer(false)}
                        className="w-full px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 font-semibold flex items-center gap-2 text-right transition-colors"
                      >
                        <Layers className="w-4 h-4 text-purple-400" />
                        <span>سټوري سلایډونه ({slides.length})</span>
                      </button>

                      <button
                        onClick={() => setShowMenuDrawer(false)}
                        className="w-full px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 font-semibold flex items-center gap-2 text-right transition-colors"
                      >
                        <Send className="w-4 h-4 text-sky-400" />
                        <span>تلګرام چينل: @{channelUsername}</span>
                      </button>

                      <button
                        onClick={() => setShowMenuDrawer(false)}
                        className="w-full px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 font-semibold flex items-center gap-2 text-right transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-amber-400" />
                        <span>د پښتو شعرونو کتنه</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-center text-[10px] text-slate-500">
                    <p>پښتو شاعری اپلیکیشن v2.4</p>
                    <p className="mt-0.5 text-emerald-400 font-medium">Native Kotlin + XML App</p>
                  </div>
                </div>
              </div>
            )}

            {/* ADMIN PROFILE & SOCIAL DETAIL MODAL - FULL SCREEN ACTIVITY */}
            {selectedAdminProfile && (
              <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col p-0 animate-in fade-in duration-200">
                <div
                  className={`w-full h-full flex flex-col overflow-hidden shadow-2xl transition-all ${
                    isDarkMode
                      ? "bg-slate-950 text-slate-100"
                      : "bg-slate-900 text-slate-100"
                  }`}
                >
                  {/* Top Cover Banner & Close Bar */}
                  <div className="relative h-28 bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-700 shrink-0 flex items-start justify-between p-3">
                    <button
                      onClick={() => setSelectedAdminProfile(null)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md text-xs font-bold transition-transform active:scale-95 shadow-md"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>بیرته (Back)</span>
                    </button>

                    <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                      <Shield className="w-3 h-3 text-sky-300" />
                      <span>د اډمين رسمي پروفایل</span>
                    </div>
                  </div>

                  {/* Profile Header Info - Centered Avatar & Text */}
                  <div className="px-4 relative z-10 shrink-0 pb-3 border-b border-slate-200 dark:border-slate-800 text-center">
                    {/* Centered Avatar Image */}
                    <div className="flex flex-col items-center justify-center -mt-10 mb-2">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full border-4 border-slate-900 overflow-hidden shadow-2xl bg-slate-800 mx-auto">
                          <img
                            src={
                              selectedAdminProfile.avatar ||
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                            }
                            alt={selectedAdminProfile.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div
                          className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-white"
                          title="فعال او تایید شوی"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 justify-center">
                        <h2 className="text-base font-extrabold">{selectedAdminProfile.name}</h2>
                        <span className="bg-sky-500/10 text-sky-500 border border-sky-500/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {selectedAdminProfile.role}
                        </span>
                      </div>

                      {/* Bio Description */}
                      <p className={`text-xs mt-1.5 leading-relaxed max-w-xs mx-auto ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                        {selectedAdminProfile.bio ||
                          "د پښتو شعرونو د پروګرام او تلګرام چينل رسمي اډمين. ټول شعرونه او غزلې په منظمه توګه دلته خپرېږي."}
                      </p>
                    </div>

                    {/* Social Media & Contact Buttons - Compact Icon Only Row */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
                      <span className="text-[10px] font-bold text-slate-400 block mb-2">
                        سوشل میډیا او اړيکې (Social Icon Links):
                      </span>

                      <div className="flex items-center justify-center flex-wrap gap-2 my-1">
                        {/* Telegram */}
                        {selectedAdminProfile.username && (
                          <a
                            href={`https://t.me/${selectedAdminProfile.username.replace("@", "")}`}
                            target="_blank"
                            rel="noreferrer"
                            title="تلګرام چينل"
                            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-400 text-white flex items-center justify-center shadow-xs shadow-sky-500/20 hover:scale-110 active:scale-95 transition-all"
                          >
                            <Send className="w-4 h-4" />
                          </a>
                        )}

                        {/* WhatsApp */}
                        {selectedAdminProfile.whatsapp && (
                          <a
                            href={selectedAdminProfile.whatsapp}
                            target="_blank"
                            rel="noreferrer"
                            title="واټساپ (WhatsApp)"
                            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-xs shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-all"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                        )}

                        {/* Facebook */}
                        {selectedAdminProfile.facebook && (
                          <a
                            href={selectedAdminProfile.facebook}
                            target="_blank"
                            rel="noreferrer"
                            title="فېسبوک (Facebook)"
                            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center shadow-xs shadow-blue-500/20 hover:scale-110 active:scale-95 transition-all"
                          >
                            <Facebook className="w-4 h-4" />
                          </a>
                        )}

                        {/* Instagram */}
                        {selectedAdminProfile.instagram && (
                          <a
                            href={selectedAdminProfile.instagram}
                            target="_blank"
                            rel="noreferrer"
                            title="انسټاګرام (Instagram)"
                            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-500 text-white flex items-center justify-center shadow-xs shadow-pink-500/20 hover:scale-110 active:scale-95 transition-all"
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}

                        {/* TikTok */}
                        {selectedAdminProfile.tiktok && (
                          <a
                            href={selectedAdminProfile.tiktok}
                            target="_blank"
                            rel="noreferrer"
                            title="ټیک ټاک (TikTok)"
                            className="w-8 h-8 rounded-xl bg-slate-950 dark:bg-slate-800 text-cyan-400 border border-slate-700 flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-all"
                          >
                            <TikTokIcon />
                          </a>
                        )}

                        {/* X / Twitter */}
                        {selectedAdminProfile.twitterX && (
                          <a
                            href={selectedAdminProfile.twitterX}
                            target="_blank"
                            rel="noreferrer"
                            title="اېکس / ټویټر (X / Twitter)"
                            className="w-8 h-8 rounded-xl bg-black text-white border border-slate-700 flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-all"
                          >
                            <TwitterXIcon />
                          </a>
                        )}

                        {/* YouTube */}
                        {selectedAdminProfile.youtube && (
                          <a
                            href={selectedAdminProfile.youtube}
                            target="_blank"
                            rel="noreferrer"
                            title="یوټیوب (YouTube)"
                            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center shadow-xs shadow-red-500/20 hover:scale-110 active:scale-95 transition-all"
                          >
                            <Youtube className="w-4 h-4" />
                          </a>
                        )}

                        {/* Phone */}
                        {selectedAdminProfile.phone && (
                          <a
                            href={`tel:${selectedAdminProfile.phone}`}
                            title="ټلیفون شمیره"
                            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-xs shadow-amber-500/20 hover:scale-110 active:scale-95 transition-all"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        )}

                        {/* Website */}
                        {selectedAdminProfile.website && (
                          <a
                            href={selectedAdminProfile.website}
                            target="_blank"
                            rel="noreferrer"
                            title="ویبپاڼه"
                            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-xs shadow-indigo-500/20 hover:scale-110 active:scale-95 transition-all"
                          >
                            <Globe className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Admin Published Poems / Posts List */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold flex items-center gap-1.5">
                        <Feather className="w-3.5 h-3.5 text-emerald-500" />
                        <span>د دې اډمين خپاره شوي شعرونه ({activePostsList.length})</span>
                      </h3>
                      <span className="text-[10px] text-slate-400 font-medium">
                        د شعرونو لیست او لایکونه
                      </span>
                    </div>

                    {activePostsList.length === 0 ? (
                      <div className="text-center py-6 text-slate-400 text-xs">
                        تر اوسه کوم شعر ندی خپور شوی.
                      </div>
                    ) : (
                      activePostsList.map((post) => {
                        const isLiked = !!likedPosts[post.id];
                        const likesCount = postLikesCount[post.id] || 15;

                        return (
                          <div
                            key={post.id}
                            className={`p-3 rounded-2xl border transition-all space-y-2 ${
                              isDarkMode ? "bg-slate-800/80 border-slate-700" : "bg-slate-50 border-slate-200"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.2 rounded-full font-bold">
                                {post.category}
                              </span>
                              <span className="text-[10px] text-slate-400 dir-ltr">
                                {post.formattedDate}
                              </span>
                            </div>

                            <p className="text-xs font-semibold leading-relaxed whitespace-pre-line text-right font-pashto">
                              {post.text}
                            </p>

                            {post.photoUrl && (
                              <div className="rounded-xl overflow-hidden max-h-36 border border-slate-700/50">
                                <img src={post.photoUrl} alt="Post" className="w-full h-full object-cover" />
                              </div>
                            )}

                            {/* Post Actions (Likes, Views, Copy) */}
                            <div className="flex items-center justify-between pt-1.5 border-t border-slate-700/30 text-xs">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => toggleLikePost(post.id)}
                                  className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                                    isLiked
                                      ? "bg-rose-500/20 text-rose-500 border border-rose-500/30"
                                      : "bg-slate-700/30 text-slate-400 hover:text-rose-400"
                                  }`}
                                >
                                  <Heart className={`w-3 h-3 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                                  <span>{likesCount}</span>
                                </button>

                                <span className="flex items-center gap-1 text-[10px] text-slate-400">
                                  <Eye className="w-3 h-3 text-slate-400" />
                                  <span>{post.viewsCount || "120"}</span>
                                </span>
                              </div>

                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(post.text);
                                  setCopiedId(post.id);
                                  setTimeout(() => setCopiedId(null), 2000);
                                }}
                                className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-emerald-400"
                              >
                                {copiedId === post.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span>کاپي شو!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>متن کاپي</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* POET DEDICATED PROFILE MODAL - FULL SCREEN ACTIVITY */}
            {selectedPoetProfile && (
              <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col p-0 animate-in fade-in duration-200">
                <div
                  className={`w-full h-full flex flex-col overflow-hidden shadow-2xl transition-all ${
                    isDarkMode
                      ? "bg-slate-950 text-slate-100"
                      : "bg-slate-900 text-slate-100"
                  }`}
                >
                  {/* Top Cover Banner & Close Bar */}
                  <div className="relative h-28 bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 shrink-0 flex items-start justify-between p-3">
                    <button
                      onClick={() => setSelectedPoetProfile(null)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md text-xs font-bold transition-transform active:scale-95 shadow-md"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>بیرته (Back)</span>
                    </button>

                    <div className="flex items-center gap-1.5 bg-emerald-500/30 backdrop-blur-md text-emerald-200 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-400/30">
                      <Feather className="w-3 h-3 text-emerald-300" />
                      <span>د شاعر اختصاصي پروفایل</span>
                    </div>
                  </div>

                  {/* Centered Poet Header */}
                  <div className="px-4 -mt-12 relative z-10 shrink-0 text-center pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="relative inline-block mb-1.5">
                      <div className="w-20 h-20 rounded-full border-4 border-slate-900 overflow-hidden shadow-2xl bg-slate-800 mx-auto">
                        <img
                          src={
                            selectedPoetProfile.avatar ||
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                          }
                          alt={selectedPoetProfile.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-amber-500 border-2 border-slate-900 flex items-center justify-center text-slate-950 font-bold"
                        title="د درانه شاعر مستند پروفایل"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h2 className="text-base font-extrabold text-slate-900 dark:text-white font-pashto">
                      {selectedPoetProfile.name}
                    </h2>
                    <span className="inline-block bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-3 py-0.5 rounded-full mt-1">
                      پښتو دروند شاعر او ليکوال
                    </span>

                    {selectedPoetProfile.bio && (
                      <p
                        className={`text-xs mt-2 leading-relaxed max-w-xs mx-auto font-pashto ${
                          isDarkMode ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {selectedPoetProfile.bio}
                      </p>
                    )}

                    {/* Poet Stats Bar */}
                    {(() => {
                      const poetPosts = activePostsList.filter(
                        (p) =>
                          p.poetName === selectedPoetProfile.name ||
                          p.text?.includes(selectedPoetProfile.name)
                      );
                      const totalViews = poetPosts.reduce(
                        (acc, curr) => acc + (parseInt(curr.viewsCount) || 120),
                        0
                      );

                      return (
                        <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80">
                          <div className="bg-emerald-500/5 dark:bg-slate-800/60 p-1.5 rounded-xl border border-emerald-500/10">
                            <span className="text-[10px] text-slate-400 block">ټول شعرونه</span>
                            <span className="text-xs font-black text-emerald-500">
                              {poetPosts.length} کلامه
                            </span>
                          </div>
                          <div className="bg-sky-500/5 dark:bg-slate-800/60 p-1.5 rounded-xl border border-sky-500/10">
                            <span className="text-[10px] text-slate-400 block">کتنې (Views)</span>
                            <span className="text-xs font-black text-sky-500">
                              {totalViews}+
                            </span>
                          </div>
                          <div className="bg-rose-500/5 dark:bg-slate-800/60 p-1.5 rounded-xl border border-rose-500/10">
                            <span className="text-[10px] text-slate-400 block">مینه وال</span>
                            <span className="text-xs font-black text-rose-500">14.2K+</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Poet's Published Poems Feed */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
                    <div className="flex items-center justify-between pb-1">
                      <h3 className="text-xs font-bold flex items-center gap-1.5">
                        <Feather className="w-3.5 h-3.5 text-emerald-500" />
                        <span>د {selectedPoetProfile.name} خپاره شوي کلامونه</span>
                      </h3>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded-full">
                        مستند ذخیره
                      </span>
                    </div>

                    {(() => {
                      const poetPosts = activePostsList.filter(
                        (p) =>
                          p.poetName === selectedPoetProfile.name ||
                          p.text?.includes(selectedPoetProfile.name)
                      );

                      if (poetPosts.length === 0) {
                        return (
                          <div className="text-center py-10 text-slate-400 text-xs bg-slate-800/30 rounded-2xl p-4 border border-slate-700/50">
                            <Feather className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
                            د دې شاعر لپاره فی الحال اختصاصي شعرونه نه دي ذخیره شوي.
                          </div>
                        );
                      }

                      return poetPosts.map((post) => {
                        const isLiked = !!likedPosts[post.id];
                        const likesCount = postLikesCount[post.id] || 18;

                        return (
                          <div
                            key={post.id}
                            className={`p-3.5 rounded-2xl border transition-all space-y-2.5 shadow-xs ${
                              isDarkMode
                                ? "bg-slate-800/90 border-slate-700"
                                : "bg-slate-50 border-slate-200"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
                                {post.category || "غزل"}
                              </span>
                              <span className="text-[10px] text-slate-400 dir-ltr">
                                {post.formattedDate}
                              </span>
                            </div>

                            <p className="text-xs font-bold leading-relaxed whitespace-pre-line text-right font-pashto py-1 border-r-2 border-emerald-500 pr-2.5">
                              {post.text}
                            </p>

                            {post.photoUrl && (
                              <div
                                onClick={() => setSelectedPhoto(post.photoUrl!)}
                                className="rounded-xl overflow-hidden max-h-40 border border-slate-700/50 cursor-pointer hover:opacity-95"
                              >
                                <img
                                  src={post.photoUrl}
                                  alt="Poem attachment"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-2 border-t border-slate-700/30 text-xs flex-wrap gap-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {/* Like */}
                                <button
                                  onClick={() => toggleLikePost(post.id)}
                                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                    isLiked
                                      ? "bg-rose-500/20 text-rose-500 border border-rose-500/30"
                                      : "bg-slate-700/30 text-slate-400 hover:text-rose-400"
                                  }`}
                                >
                                  <Heart
                                    className={`w-3.5 h-3.5 ${
                                      isLiked ? "fill-rose-500 text-rose-500" : ""
                                    }`}
                                  />
                                  <span>{likesCount}</span>
                                </button>

                                {/* Favorite */}
                                <button
                                  onClick={() => toggleFavoritePost(post.id)}
                                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                    favoritedPosts[post.id]
                                      ? "bg-amber-500/20 text-amber-500 border border-amber-500/30"
                                      : "bg-slate-700/30 text-slate-400 hover:text-amber-400"
                                  }`}
                                  title="فیورېټ"
                                >
                                  <Bookmark
                                    className={`w-3.5 h-3.5 ${
                                      favoritedPosts[post.id] ? "fill-amber-500 text-amber-500" : ""
                                    }`}
                                  />
                                  <span>{favoritedPosts[post.id] ? "خوندي" : "فیورېټ"}</span>
                                </button>

                                {/* WhatsApp Share */}
                                <a
                                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                                    `*${selectedPoetProfile.name}*\n\n${post.text}\n\n_د پښتو شعرونو ايپ له لارې_`
                                  )}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all"
                                  title="په واټساپ کي شریکول"
                                >
                                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>واټساپ</span>
                                </a>
                              </div>

                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(post.text);
                                  setCopiedId(post.id);
                                  setTimeout(() => setCopiedId(null), 2000);
                                }}
                                className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-emerald-400"
                              >
                                {copiedId === post.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>کاپي شو!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>کاپي</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* DEDICATED FAVORITES ACTIVITY SCREEN MODAL */}
            {showFavoritesActivity && (
              <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xs z-50 flex flex-col animate-in fade-in duration-200">
                <div
                  className={`w-full h-full flex flex-col overflow-hidden shadow-2xl transition-all ${
                    isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {/* Activity Toolbar Header */}
                  <div
                    className={`px-3.5 py-3 flex items-center justify-between shadow-md shrink-0 transition-colors ${
                      isDarkMode
                        ? "bg-amber-950/90 border-b border-amber-900/50 text-amber-200"
                        : "bg-gradient-to-r from-amber-600 to-amber-500 text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowFavoritesActivity(false)}
                        className="p-1 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all active:scale-95 flex items-center gap-1 font-bold text-xs"
                        title="بیرته (Back)"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        <span>بیرته</span>
                      </button>
                      <div className="flex items-center gap-1.5 mr-1">
                        <Bookmark className="w-4 h-4 fill-amber-200 text-amber-200 shrink-0" />
                        <div>
                          <h2 className="text-sm font-bold tracking-tight leading-none">فیورېټ شعرونه</h2>
                          <span className="text-[10px] text-amber-100/90 font-medium block mt-0.5">
                            Favorites Activity
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="bg-black/25 text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                      {Object.values(favoritedPosts).filter(Boolean).length} خوندي کلامونه
                    </span>
                  </div>

                  {/* Favorites List Feed */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
                    {(() => {
                      const favoritedList = sortedPosts.filter((post) => favoritedPosts[post.id]);

                      if (favoritedList.length === 0) {
                        return (
                          <div
                            className={`text-center py-14 px-4 rounded-2xl border transition-colors my-auto ${
                              isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                            }`}
                          >
                            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-3">
                              <Bookmark className="w-7 h-7 text-amber-500 fill-amber-500/20" />
                            </div>
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                              تر اوسه هیڅ شعر فیورېټ شوی نه دی
                            </h3>
                            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed max-w-xs mx-auto">
                              د خوښو شویو شعرونو او غزلو د فیورېټ او ذخیره کولو لپاره د شعر لاندې د (فیورېټ) آیکن ټک وهئ.
                            </p>
                            <button
                              onClick={() => setShowFavoritesActivity(false)}
                              className="mt-4 text-xs bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-xl shadow-md transition-all active:scale-95"
                            >
                              د ټولو شعرونو لیدل
                            </button>
                          </div>
                        );
                      }

                      return favoritedList.map((post) => {
                        const matchedPoet = poets.find(
                          (p) => post.text?.includes(p.name) || post.poetName === p.name
                        );
                        const poetAvatar =
                          matchedPoet?.avatar ||
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80";
                        const poetNameDisplay = post.poetName || matchedPoet?.name || "پښتو شاعر";
                        const isLiked = !!likedPosts[post.id];
                        const likesCount = postLikesCount[post.id] || 18;

                        return (
                          <div
                            key={post.id}
                            className={`rounded-2xl p-4 shadow-sm border transition-all hover:shadow-md relative ${
                              isDarkMode
                                ? "bg-slate-900 border-slate-800/80 text-slate-100"
                                : "bg-white border-amber-100/80 text-slate-800"
                            }`}
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                              <div
                                onClick={() => {
                                  setShowFavoritesActivity(false);
                                  handleOpenPoetProfile(matchedPoet || poetNameDisplay);
                                }}
                                className="flex items-center gap-2 cursor-pointer group/favPoet"
                              >
                                <img
                                  src={poetAvatar}
                                  alt={poetNameDisplay}
                                  className="w-7 h-7 rounded-full object-cover border border-amber-400/60"
                                />
                                <div>
                                  <span className="font-bold text-xs block group-hover/favPoet:text-amber-500 transition-colors">
                                    {poetNameDisplay}
                                  </span>
                                  <span className="text-[10px] text-amber-500 font-medium">فیورېټ کلام</span>
                                </div>
                              </div>

                              <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
                                {post.category || "شعر"}
                              </span>
                            </div>

                            {/* Poem Text */}
                            <p
                              dir="rtl"
                              className="text-xs font-semibold leading-relaxed py-2 px-1 text-right font-serif whitespace-pre-line border-r-2 border-amber-500 pr-2.5 my-1"
                            >
                              {post.text}
                            </p>

                            {/* Photo Attachment */}
                            {post.photoUrl && (
                              <div
                                onClick={() => setSelectedPhoto(post.photoUrl!)}
                                className="mt-2 rounded-xl overflow-hidden max-h-40 border border-slate-700/50 cursor-pointer hover:opacity-95"
                              >
                                <img src={post.photoUrl} alt="Fav attachment" className="w-full h-full object-cover" />
                              </div>
                            )}

                            {/* Actions */}
                            <div className="pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1 flex-wrap text-xs">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {/* Like */}
                                <button
                                  onClick={() => toggleLikePost(post.id)}
                                  className={`text-[10px] font-bold flex items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
                                    isLiked
                                      ? "bg-rose-500/20 text-rose-500 border border-rose-500/30"
                                      : isDarkMode
                                      ? "bg-slate-800 text-slate-300"
                                      : "bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                                  <span>{likesCount}</span>
                                </button>

                                {/* Remove from Favorites */}
                                <button
                                  onClick={() => toggleFavoritePost(post.id)}
                                  className="text-[10px] font-bold flex items-center gap-1 py-1 px-2.5 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/30 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 transition-all"
                                  title="له فیورېټ څخه ایستل"
                                >
                                  <Bookmark className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                  <span>خوندي (ایستل)</span>
                                </button>

                                {/* WhatsApp Share */}
                                <a
                                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                                    `*${poetNameDisplay}*\n\n${post.text}\n\n_د پښتو شعرونو ايپ له لارې_`
                                  )}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[10px] font-bold flex items-center gap-1 py-1 px-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                >
                                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>واټساپ</span>
                                </a>
                              </div>

                              {/* Copy */}
                              <button
                                onClick={() => handleCopyText(post.id, post.text || "")}
                                className="text-[10px] font-semibold flex items-center gap-1 py-1 px-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                              >
                                {copiedId === post.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400">کاپي شو!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>کاپي</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* VIDEO REELS DEDICATED ACTIVITY SCREEN - FULL SCREEN */}
            {showReelsActivity && (
              <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col p-0 animate-in fade-in duration-200">
                <div
                  className={`w-full h-full flex flex-col overflow-hidden shadow-2xl transition-all ${
                    isDarkMode
                      ? "bg-slate-950 text-slate-100"
                      : "bg-slate-900 text-slate-100"
                  }`}
                >
                  {/* Activity Top Bar */}
                  <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 p-3 shrink-0 flex items-center justify-between border-b border-rose-900/40 shadow-lg">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowReelsActivity(false)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs border border-rose-500/30 active:scale-95 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>بیرته</span>
                      </button>
                      <div className="flex items-center gap-1.5">
                        <Tv className="w-4 h-4 text-rose-400" />
                        <span className="font-extrabold text-sm text-white font-pashto">
                          د پښتو شعرونو ویډیو ریلز
                        </span>
                      </div>
                    </div>

                    <span className="bg-rose-500/20 text-rose-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-rose-500/30">
                      {activePostsList.filter((p) => p.mediaType === "VIDEO" || p.videoUrl).length} ریلونه
                    </span>
                  </div>

                  {/* Reel Categories Horizontal Filter Bar */}
                  <div className="bg-slate-900/90 border-b border-slate-800 p-2 overflow-x-auto flex items-center gap-1.5 no-scrollbar shrink-0">
                    {[
                      "ټول ریلز",
                      "د غزل دکلمه",
                      "عاشقانه ریلز",
                      "حماسي کلپونه",
                      "مشاعره ویډیو",
                      "طنز او ټوکې",
                      "ډیزاین شوې ویډیو"
                    ].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveReelCategory(cat)}
                        className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                          activeReelCategory === cat || (activeReelCategory === "all" && cat === "ټول ریلز")
                            ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                            : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Reels Feed Container - TikTok-style snap scrolling */}
                  <div className="flex-1 overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar">
                    {(() => {
                      const reelsList = activePostsList.filter((post) => {
                        const isVideo = post.mediaType === "VIDEO" || !!post.videoUrl;
                        if (!isVideo) return false;
                        if (activeReelCategory === "all" || activeReelCategory === "ټول ریلز") return true;
                        return post.category === activeReelCategory;
                      });

                      if (reelsList.length === 0) {
                        return (
                          <div className="text-center py-20 px-4 bg-slate-900 border border-slate-800 rounded-3xl m-4">
                            <Tv className="w-12 h-12 text-rose-500/40 mx-auto mb-3 animate-pulse" />
                            <h3 className="font-bold text-sm text-white">په دې کټګورۍ کې هیڅ ويډيو ريل نه دی خپور شوی</h3>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-xs mx-auto">
                              تاسو کولای شئ د اډمین فینل (Admin Panel) له لارې د هرې کټګورۍ لپاره نوي ویډیو ریلونه پورته کړئ.
                            </p>
                            <button
                              onClick={() => setActiveReelCategory("ټول ریلز")}
                              className="mt-4 text-xs bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg transition-all"
                            >
                              د ټولو ریلونو لیدل
                            </button>
                          </div>
                        );
                      }

                      return reelsList.map((post) => {
                        const matchedPoet = poets.find((p) => p.name === post.poetName);
                        const poetAvatar = matchedPoet?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80";
                        const isLiked = !!likedPosts[post.id];
                        const isFav = !!favoritedPosts[post.id];
                        const likesCount = postLikesCount[post.id] || 34;

                        return (
                          <div
                            key={post.id}
                            className="snap-start h-full min-h-[500px] w-full relative bg-black flex flex-col justify-between overflow-hidden border-b border-slate-900"
                          >
                            {/* Full-Screen TikTok Video Player */}
                            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-950">
                              <video
                                src={post.videoUrl}
                                controls
                                loop
                                playsInline
                                autoPlay
                                muted={false}
                                poster={post.photoUrl}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Top Category Badge */}
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1 z-20">
                              <Sparkles className="w-3 h-3 text-rose-400" />
                              <span>{post.category || "ویډیو ریل"}</span>
                            </div>

                            {/* Right Side Vertical Interactive Buttons Bar (TikTok Style) */}
                            <div className="absolute right-3 bottom-16 z-20 flex flex-col items-center gap-4">
                              {/* Poet Avatar Badge */}
                              <div
                                onClick={() => {
                                  setShowReelsActivity(false);
                                  handleOpenPoetProfile(matchedPoet || post.poetName);
                                }}
                                className="relative cursor-pointer group"
                              >
                                <div className="w-11 h-11 rounded-full border-2 border-rose-500 p-0.5 shadow-xl bg-slate-900 overflow-hidden">
                                  <img src={poetAvatar} alt={post.poetName} className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-rose-600 text-white p-0.5 rounded-full shadow">
                                  <Plus className="w-3 h-3" />
                                </div>
                              </div>

                              {/* Like Heart Button */}
                              <button
                                onClick={() => toggleLikePost(post.id)}
                                className="flex flex-col items-center gap-1 group active:scale-90 transition-transform"
                              >
                                <div className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center border shadow-lg ${
                                  isLiked
                                    ? "bg-rose-500/80 border-rose-400 text-white"
                                    : "bg-black/50 border-white/20 text-white hover:bg-black/70"
                                }`}>
                                  <Heart className={`w-6 h-6 ${isLiked ? "fill-white text-white" : ""}`} />
                                </div>
                                <span className="text-[10px] font-bold text-white drop-shadow-md">{likesCount}</span>
                              </button>

                              {/* Favorite Bookmark Button */}
                              <button
                                onClick={() => toggleFavoritePost(post.id)}
                                className="flex flex-col items-center gap-1 group active:scale-90 transition-transform"
                              >
                                <div className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center border shadow-lg ${
                                  isFav
                                    ? "bg-amber-500/80 border-amber-400 text-white"
                                    : "bg-black/50 border-white/20 text-white hover:bg-black/70"
                                }`}>
                                  <Bookmark className={`w-6 h-6 ${isFav ? "fill-white text-white" : ""}`} />
                                </div>
                                <span className="text-[10px] font-bold text-white drop-shadow-md">
                                  {isFav ? "خوندي" : "فیورېټ"}
                                </span>
                              </button>

                              {/* WhatsApp Share Button */}
                              <a
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                                  `*د ${post.poetName} ويډيو ريل:*\n\n${post.text}\n\n🎬 لينک: ${post.videoUrl}\n\n_د پښتو شعرونو ايپ له لارې_`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                              >
                                <div className="w-11 h-11 rounded-full bg-emerald-600/80 border border-emerald-400 text-white backdrop-blur-md flex items-center justify-center shadow-lg">
                                  <WhatsAppIcon className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-[10px] font-bold text-white drop-shadow-md">شیر</span>
                              </a>

                              {/* Copy Caption Button */}
                              <button
                                onClick={() => handleCopyText(post.id, post.text)}
                                className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                              >
                                <div className="w-11 h-11 rounded-full bg-black/50 border border-white/20 text-white backdrop-blur-md flex items-center justify-center shadow-lg">
                                  {copiedId === post.id ? (
                                    <Check className="w-5 h-5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-5 h-5 text-white" />
                                  )}
                                </div>
                                <span className="text-[10px] font-bold text-white drop-shadow-md">
                                  {copiedId === post.id ? "کاپي شو" : "کاپي"}
                                </span>
                              </button>
                            </div>

                            {/* Bottom Overlay Info (TikTok Overlay Style) */}
                            <div className="absolute bottom-0 left-0 right-16 z-10 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent space-y-2 pointer-events-none">
                              <div className="flex items-center gap-2 pointer-events-auto">
                                <span className="font-extrabold text-sm text-white font-pashto drop-shadow-md">
                                  {post.poetName}
                                </span>
                                <BadgeCheck className="w-4 h-4 text-sky-400 fill-sky-500/20" />
                                <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
                                  {post.formattedDate}
                                </span>
                              </div>

                              <p dir="rtl" className="text-xs text-slate-100 font-serif leading-relaxed line-clamp-3 drop-shadow-md pointer-events-auto whitespace-pre-line">
                                {post.text}
                              </p>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Android Bottom Navigation Pill */}
          <div className="bg-slate-900 py-2.5 px-6 flex items-center justify-between text-slate-400 text-[11px] z-30 font-medium border-t border-slate-800 shrink-0">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>پښتو شاعری • 2026</span>
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-slate-500">v2.4 Native</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
