import React, { useState } from "react";
import {
  Smartphone,
  FolderCode,
  BookOpen,
  Download,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { PhoneSimulator } from "./components/PhoneSimulator";
import { ProjectExplorer } from "./components/ProjectExplorer";
import { SetupGuide } from "./components/SetupGuide";
import { AdminPanel } from "./components/AdminPanel";
import { Poet, PoetryPost, FeaturedSlide, TelegramAdmin } from "./types";

import pashtoIcon from "./assets/images/pashto_poetry_app_icon_1785357012134.jpg";

const INITIAL_TELEGRAM_ADMINS: TelegramAdmin[] = [
  {
    id: "tg_1",
    name: "اصلي پښتو شعرونه چينل",
    username: "@testapp_pashto",
    role: "تلګرام چينل",
    avatar: pashtoIcon,
    followers: "45.2K غړي",
    bio: "د پښتو ژبې د شعر او ادب لومړنی او تر ټولو لوی ډیجیټل چينل. هره ورځ نوي ډیزاین شوي شعرونه، ویډیوګانې او غزلې.",
    whatsapp: "https://wa.me/93700000000",
    facebook: "https://facebook.com/pashtopoetrychannel",
    youtube: "https://youtube.com/@pashtopoetry",
    phone: "+93700000000",
    isVerified: true,
    isBlocked: false,
  },
  {
    id: "tg_2",
    name: "نورالرحمن (اداري اډمين)",
    username: "@admin_pashto_poetry",
    role: "اډمين",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    followers: "آنلاین اډمين",
    bio: "د پښتو شعرونو د پروګرام او تلګرام چينل د نشراتو مسؤل او خپرونکی.",
    whatsapp: "https://wa.me/93788888888",
    facebook: "https://facebook.com/noor.rahman.admin",
    instagram: "https://instagram.com/noor_admin",
    phone: "+93788888888",
    isVerified: true,
    isBlocked: false,
  },
  {
    id: "tg_3",
    name: "پښتو غزل ټولنه",
    username: "@pashto_ghazal_official",
    role: "تلګرام چينل",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    followers: "12.8K غړي",
    bio: "د کلاسیک او معاصر پښتو غزل المارۍ. د خوشحال بابا، رحمان بابا او حمزه بابا د اشعارو سرچینه.",
    whatsapp: "https://wa.me/93799999999",
    facebook: "https://facebook.com/pashtoghazal",
    isVerified: true,
    isBlocked: false,
  },
];

const INITIAL_POETS: Poet[] = [
  {
    id: "all",
    name: "ټول شاعران",
    avatar: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80",
    bio: "د ټولو شاعرانو انځورونه او شعرونه",
  },
  {
    id: "hamza",
    name: "حمزه بابا",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "امير الحمزه خان شينواری - د پښتو غزل بابا",
    isVerified: true,
  },
  {
    id: "ghani",
    name: "غني خان",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    bio: "خان عبدالغني خان - فيلسوف او ليونی شاعر",
    isVerified: true,
  },
  {
    id: "rahman",
    name: "رحمان بابا",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    bio: "عبدالرحمان بابا - د پښتو د عرفان او تصوف سرخېل",
    isVerified: true,
  },
  {
    id: "khushal",
    name: "خوشحال خټک",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    bio: "خوشحال خان خټک - ملي اتل، توره او قلم خاوند",
    isVerified: true,
  },
  {
    id: "matiullah",
    name: "مطیع الله تراب",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    bio: "مطیع الله تراب - د حماسي او ولسي شعر زړه سواندی استازی",
    isVerified: true,
  },
  {
    id: "karwan",
    name: "پیر محمد کاروان",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    bio: "پیر محمد کاروان - د احساس او عاطفې نازک خيال شاعر",
    isVerified: true,
  },
];

const INITIAL_SLIDES: FeaturedSlide[] = [
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
  {
    id: 3,
    poet: "رحمان بابا",
    category: "رباعي",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    verse: "که دې د حسن جلوه وينم په جهان کې\nراشه لیدل دې زما زړه ته خوشحالي ده",
    bgUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    poet: "مطیع الله تراب",
    category: "حماسی نظم",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    verse: "د وطن مينه مو زړونو کې ودان ده تل\nد حماسو اواز به اورو تر قيام پورې",
    bgUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
  },
];

const INITIAL_POSTS: PoetryPost[] = [
  {
    id: 6,
    text: `د پیر محمد کاروان خاصه دکلمه ویډیو 🎬\n\nراشه د پیالی غوندې غېږه راته واز کړه\nد بېلتون لمبې مې په وجود لګېدلې دي`,
    poetName: "پیر محمد کاروان",
    category: "د غزل دکلمه",
    photoUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-over-a-silent-lake-4309-large.mp4",
    formattedDate: "همدا اوس",
    viewsCount: "25.4K",
    mediaType: "VIDEO",
    authorName: "پښتو شاعری",
    timestamp: 1700000000006,
  },
  {
    id: 5,
    text: `حماسي پښتو ریل ویډیو 🇦🇫\n\nد وطن مينه مو زړونو کې ودان ده تل\nد حماسو اواز به اورو تر قيام پورې`,
    poetName: "مطیع الله تراب",
    category: "حماسي کلپونه",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-sun-setting-over-the-mountains-4221-large.mp4",
    formattedDate: "10 دقیقې مخکې",
    viewsCount: "31.8K",
    mediaType: "VIDEO",
    authorName: "پښتو شاعری",
    timestamp: 1700000000005,
  },
  {
    id: 4,
    text: `دیزاین شوی پښتو شعر پوسټر 🎨\n\nزړه مې له دردونو نه ډک شوی دی جانانه\nستا د ياد لمبو کې راته هره شپه ژړا شوه`,
    poetName: "حمزه بابا",
    category: "ډیزاین شوی عکس",
    photoUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    formattedDate: "همدا اوس",
    viewsCount: "18.5K",
    mediaType: "DESIGNED_POSTER",
    isDesignedPoster: true,
    authorName: "پښتو شاعری",
    timestamp: 1700000000004,
  },
  {
    id: 3,
    text: `زړه مې له دردونو نه ډک شوی دی جانانه\nستا د ياد لمبو کې راته هره شپه ژړا شوه\n\nستا د ښایست جلوې چې خپرې په نړۍ شوې\nګلانو پاڼې پاڼې کړې شينلی شو روان`,
    poetName: "حمزه بابا",
    category: "غزل",
    photoUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    formattedDate: "همدا اوس",
    viewsCount: "14.2K",
    mediaType: "PHOTO",
    authorName: "پښتو شاعری",
    timestamp: 1700000000003,
  },
  {
    id: 2,
    text: `راشه چې ملګري د احساس د لارې شو\nزړونه به نږدې کړو او اشنا د يو بل شو\n\nد ميني هره کلمه به نظم کړو په خپلو\nد پښتو شعرونو کې به يو ځای په صدا شو`,
    poetName: "غني خان",
    category: "نظم",
    photoUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    formattedDate: "30 دقیقې مخکې",
    viewsCount: "9.8K",
    mediaType: "PHOTO",
    authorName: "پښتو شاعری",
    timestamp: 1700000000002,
  },
  {
    id: 1,
    text: `که دې د حسن جلوه وينم په جهان کې\nراشه لیدل دې زما زړه ته خوشحالي ده\n\nد وطن غېږه کې پراته يو ناخبره\nستا یاد زموږ روح ته آرام او هوښياري ده`,
    poetName: "رحمان بابا",
    category: "رباعي",
    formattedDate: "1 ساعت مخکې",
    viewsCount: "22.1K",
    mediaType: "NONE",
    authorName: "پښتو شاعری",
    timestamp: 1700000000001,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"simulator" | "admin" | "explorer" | "guide">("simulator");
  const [channelUsername, setChannelUsername] = useState<string>("testapp_pashto");
  const [botToken, setBotToken] = useState<string>("8969166004:AAG7unVgAYsdw8IeapOH9R-BcDCtXZtzajQ");

  // Shared Global App State
  const [poets, setPoets] = useState<Poet[]>(INITIAL_POETS);
  const [slides, setSlides] = useState<FeaturedSlide[]>(INITIAL_SLIDES);
  const [posts, setPosts] = useState<PoetryPost[]>(INITIAL_POSTS);
  const [telegramAdmins, setTelegramAdmins] = useState<TelegramAdmin[]>(INITIAL_TELEGRAM_ADMINS);

  // Handlers for Telegram Admins
  const handleAddTelegramAdmin = (newAdmin: TelegramAdmin) => {
    setTelegramAdmins((prev) => [...prev, newAdmin]);
  };

  const handleDeleteTelegramAdmin = (id: string) => {
    setTelegramAdmins((prev) => prev.filter((admin) => admin.id !== id));
  };

  const handleToggleAdminVerified = (id: string) => {
    setTelegramAdmins((prev) =>
      prev.map((admin) => (admin.id === id ? { ...admin, isVerified: !admin.isVerified } : admin))
    );
  };

  const handleToggleAdminBlocked = (id: string) => {
    setTelegramAdmins((prev) =>
      prev.map((admin) => (admin.id === id ? { ...admin, isBlocked: !admin.isBlocked } : admin))
    );
  };

  // Handlers for Poet operations
  const handleAddPoet = (newPoet: Poet) => {
    setPoets((prev) => [...prev, newPoet]);
  };

  const handleDeletePoet = (id: string) => {
    setPoets((prev) => prev.filter((p) => p.id !== id));
  };

  const handleTogglePoetVerified = (id: string) => {
    setPoets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isVerified: !p.isVerified } : p))
    );
  };

  const handleAddSlide = (newSlide: FeaturedSlide) => {
    setSlides((prev) => [newSlide, ...prev]);
  };

  const handleDeleteSlide = (id: number) => {
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddPost = (newPost: PoetryPost) => {
    // Unshift to place new post directly at the top
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleDeletePost = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Main Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 shadow-lg shadow-emerald-500/20 shrink-0 overflow-hidden">
              <img src={pashtoIcon} alt="پښتو شعرونه" className="w-full h-full object-cover rounded-[10px]" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>پښتو شعرونه</span>
                  <span className="text-slate-400 font-normal text-xs">(Pashto Poetry App)</span>
                </h1>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Kotlin + XML
                </span>
              </div>
              <p className="text-xs text-slate-400">
                پښتو شاعری • ViewPager2 • Poets List • Admin Panel • GitHub Actions APK Builder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href="/api/download-project"
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Android Studio Project (.ZIP)</span>
            </a>
          </div>
        </div>
      </header>

      {/* Feature Highlights Ribbon */}
      <div className="bg-slate-900/50 border-b border-slate-800/80 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between text-[11px] text-slate-400 flex-wrap gap-x-6 gap-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>شاعران انځوريز لېست</span>
          </div>
          <div className="flex items-center gap-1.5 text-sky-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ViewPager2 فیچر سلایډونه</span>
          </div>
          <div className="flex items-center gap-1.5 text-purple-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>کامل اډمین پینل (Admin Control)</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>نوي خپاره شوي په اول سر کې</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center sm:justify-start gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 max-w-fit mx-auto sm:mx-0">
          <button
            onClick={() => setActiveTab("simulator")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "simulator"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>پښتو اپلیکیشن (App Simulator)</span>
          </button>

          <button
            onClick={() => setActiveTab("admin")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "admin"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>د اډمین پینل (Admin Panel)</span>
          </button>

          <button
            onClick={() => setActiveTab("explorer")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "explorer"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <FolderCode className="w-4 h-4" />
            <span>Android Studio Project Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab("guide")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "guide"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Setup &amp; GitHub Actions</span>
          </button>
        </div>

        {/* Tab Content Panes */}
        {activeTab === "simulator" && (
          <PhoneSimulator
            channelUsername={channelUsername}
            setChannelUsername={setChannelUsername}
            botToken={botToken}
            setBotToken={setBotToken}
            poets={poets}
            onAddPoet={handleAddPoet}
            slides={slides}
            posts={posts}
            telegramAdmins={telegramAdmins}
            onAddTelegramAdmin={handleAddTelegramAdmin}
            onDeleteTelegramAdmin={handleDeleteTelegramAdmin}
          />
        )}

        {activeTab === "admin" && (
          <AdminPanel
            channelUsername={channelUsername}
            setChannelUsername={setChannelUsername}
            botToken={botToken}
            setBotToken={setBotToken}
            poets={poets}
            onAddPoet={handleAddPoet}
            onDeletePoet={handleDeletePoet}
            onTogglePoetVerified={handleTogglePoetVerified}
            posts={posts}
            onAddPost={handleAddPost}
            onDeletePost={handleDeletePost}
            slides={slides}
            onAddSlide={handleAddSlide}
            onDeleteSlide={handleDeleteSlide}
            telegramAdmins={telegramAdmins}
            onAddTelegramAdmin={handleAddTelegramAdmin}
            onDeleteTelegramAdmin={handleDeleteTelegramAdmin}
            onToggleAdminVerified={handleToggleAdminVerified}
            onToggleAdminBlocked={handleToggleAdminBlocked}
          />
        )}

        {activeTab === "explorer" && <ProjectExplorer />}

        {activeTab === "guide" && <SetupGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-4 text-center text-xs text-slate-500">
        <p>
          Native Android Kotlin Application • Complete Project with Gradle Wrapper &amp; GitHub Actions
        </p>
      </footer>
    </div>
  );
}
