import React, { useState } from "react";
import {
  Feather,
  Send,
  PlusCircle,
  Trash2,
  Copy,
  Check,
  Search,
  Sparkles,
  Bot,
  RefreshCw,
  Image as ImageIcon,
  BookOpen,
  BarChart2,
  CheckCircle2,
  UserCheck,
  Layers,
  User,
  Plus,
  Tv,
  Ban,
  BadgeCheck,
  ShieldAlert,
} from "lucide-react";
import { Poet, PoetryPost, FeaturedSlide, TelegramAdmin } from "../types";

interface AdminPanelProps {
  channelUsername: string;
  setChannelUsername: (ch: string) => void;
  botToken: string;
  setBotToken: (token: string) => void;
  poets: Poet[];
  onAddPoet: (poet: Poet) => void;
  onDeletePoet: (id: string) => void;
  onTogglePoetVerified?: (id: string) => void;
  posts: PoetryPost[];
  onAddPost: (post: PoetryPost) => void;
  onDeletePost: (id: number) => void;
  slides: FeaturedSlide[];
  onAddSlide: (slide: FeaturedSlide) => void;
  onDeleteSlide: (id: number) => void;
  telegramAdmins?: TelegramAdmin[];
  onAddTelegramAdmin?: (admin: TelegramAdmin) => void;
  onDeleteTelegramAdmin?: (id: string) => void;
  onToggleAdminVerified?: (id: string) => void;
  onToggleAdminBlocked?: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  channelUsername,
  setChannelUsername,
  botToken,
  setBotToken,
  poets,
  onAddPoet,
  onDeletePoet,
  onTogglePoetVerified,
  posts,
  onAddPost,
  onDeletePost,
  slides,
  onAddSlide,
  onDeleteSlide,
  telegramAdmins = [],
  onAddTelegramAdmin,
  onDeleteTelegramAdmin,
  onToggleAdminVerified,
  onToggleAdminBlocked,
}) => {
  // Admin Active Sub-Tab State
  const [adminSubTab, setAdminSubTab] = useState<"post" | "reel" | "poet" | "story" | "telegram" | "settings">("post");

  // --- Form 1: Poetry Post Form ---
  const [poetryText, setPoetryText] = useState("");
  const [selectedPoetName, setSelectedPoetName] = useState(poets[1]?.name || "حمزه بابا");
  const [customPoetName, setCustomPoetName] = useState("");
  const [category, setCategory] = useState("غزل");
  const [imageUrl, setImageUrl] = useState("");
  const [postVideoUrl, setPostVideoUrl] = useState("");
  const [isDesignedPoster, setIsDesignedPoster] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // --- Form 6: Video Reel Form ---
  const [reelText, setReelText] = useState("");
  const [reelPoetName, setReelPoetName] = useState(poets[1]?.name || "حمزه بابا");
  const [reelCustomPoet, setReelCustomPoet] = useState("");
  const [reelCategory, setReelCategory] = useState("د غزل دکلمه");
  const [reelVideoUrl, setReelVideoUrl] = useState("https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-over-a-silent-lake-4309-large.mp4");
  const [reelThumbnailUrl, setReelThumbnailUrl] = useState("");
  const [reelPublishing, setReelPublishing] = useState(false);
  const [reelPublishSuccess, setReelPublishSuccess] = useState(false);

  // --- Form 5: Telegram Admin Handle Form ---
  const [tgName, setTgName] = useState("");
  const [tgUsername, setTgUsername] = useState("");
  const [tgRole, setTgRole] = useState<string>("اډمين");
  const [customTgRole, setCustomTgRole] = useState("");
  const [tgBio, setTgBio] = useState("");
  const [tgWhatsapp, setTgWhatsapp] = useState("");
  const [tgFacebook, setTgFacebook] = useState("");
  const [tgYoutube, setTgYoutube] = useState("");
  const [tgInstagram, setTgInstagram] = useState("");
  const [tgTiktok, setTgTiktok] = useState("");
  const [tgTwitterX, setTgTwitterX] = useState("");
  const [tgPhone, setTgPhone] = useState("");
  const [tgAddSuccess, setTgAddSuccess] = useState(false);

  // --- Form 2: New Poet Form ---
  const [newPoetName, setNewPoetName] = useState("");
  const [newPoetAvatar, setNewPoetAvatar] = useState("");
  const [newPoetBio, setNewPoetBio] = useState("");
  const [poetAddSuccess, setPoetAddSuccess] = useState(false);

  // --- Form 3: New Story / Slide Form ---
  const [storyPoet, setStoryPoet] = useState(poets[1]?.name || "حمزه بابا");
  const [storyCategory, setStoryCategory] = useState("غزل");
  const [storyVerse, setStoryVerse] = useState("");
  const [storyBgUrl, setStoryBgUrl] = useState("");
  const [storyAvatarUrl, setStoryAvatarUrl] = useState("");
  const [storyAddSuccess, setStoryAddSuccess] = useState(false);

  // --- Form 4: Settings State ---
  const [tempChannel, setTempChannel] = useState(channelUsername);
  const [tempBotToken, setTempBotToken] = useState(botToken);
  const [testBotResult, setTestBotResult] = useState<string | null>(null);
  const [testingBot, setTestingBot] = useState(false);

  // Categories preset
  const CATEGORIES = ["غزل", "نظم", "لاندۍ", "رباعي", "چاربيته", "قطعه", "پندونه", "حماسي نظم", "ډیزاین شوی عکس"];
  const REEL_CATEGORIES = ["د غزل دکلمه", "عاشقانه ریلز", "حماسي کلپونه", "مشاعره ویډیو", "طنز او ټوکې", "ډیزاین شوې ویډیو", "عمومي ریلز"];

  // Handle Publish Video Reel
  const handlePublishReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelText.trim() || !reelVideoUrl.trim()) return;

    setReelPublishing(true);
    const finalPoetName = reelCustomPoet.trim() || reelPoetName;

    // Optional Telegram API Broadcast
    if (botToken && channelUsername) {
      try {
        const fullMessage = `🎬 *ویډیو ریل: ${reelCategory}* | *${finalPoetName}*\n\n${reelText.trim()}\n\n🇦🇫 @${channelUsername.replace("@", "")}`;
        const cleanCh = channelUsername.startsWith("@") ? channelUsername : `@${channelUsername}`;
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: cleanCh, text: fullMessage, parse_mode: "Markdown" }),
        });
      } catch (err) {
        console.warn("Telegram broadcast skipped/failed:", err);
      }
    }

    const newReelPost: PoetryPost = {
      id: Date.now(),
      text: reelText.trim(),
      poetName: finalPoetName,
      category: reelCategory,
      photoUrl: reelThumbnailUrl.trim() || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
      videoUrl: reelVideoUrl.trim(),
      formattedDate: "همدا اوس",
      viewsCount: "1",
      mediaType: "VIDEO",
      authorName: "پښتو شاعری",
      timestamp: Date.now(),
    };

    onAddPost(newReelPost);
    setReelText("");
    setReelCustomPoet("");
    setReelThumbnailUrl("");
    setReelPublishing(false);
    setReelPublishSuccess(true);
    setTimeout(() => setReelPublishSuccess(false), 3000);
  };

  // Handle Publish New Poetry
  const handlePublishPoetry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!poetryText.trim()) return;

    setIsPublishing(true);
    const finalPoetName = customPoetName.trim() || selectedPoetName;

    // Optional Telegram API Broadcast
    if (botToken && channelUsername) {
      try {
        const fullMessage = `📜 *${category}* | *${finalPoetName}*\n\n${poetryText.trim()}\n\n🇦🇫 @${channelUsername.replace("@", "")}`;
        const cleanCh = channelUsername.startsWith("@") ? channelUsername : `@${channelUsername}`;
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: cleanCh, text: fullMessage, parse_mode: "Markdown" }),
        });
      } catch (err) {
        console.warn("Telegram broadcast skipped/failed:", err);
      }
    }

    const newPost: PoetryPost = {
      id: Date.now(),
      text: poetryText.trim(),
      poetName: finalPoetName,
      category: isDesignedPoster ? "ډیزاین شوی عکس" : category,
      photoUrl: imageUrl.trim() || undefined,
      formattedDate: "همدا اوس",
      viewsCount: "1",
      mediaType: isDesignedPoster ? "DESIGNED_POSTER" : imageUrl.trim() ? "PHOTO" : "NONE",
      isDesignedPoster: isDesignedPoster,
      authorName: "پښتو شاعری",
      timestamp: Date.now(),
    };

    onAddPost(newPost);
    setPoetryText("");
    setImageUrl("");
    setCustomPoetName("");
    setIsDesignedPoster(false);
    setIsPublishing(false);
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 3000);
  };

  // Handle Create Telegram Admin Handle
  const handleAddTgAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tgName.trim() || !tgUsername.trim()) return;

    const formattedUsername = tgUsername.trim().startsWith("@")
      ? tgUsername.trim()
      : `@${tgUsername.trim()}`;

    const finalRole = tgRole === "custom" ? customTgRole.trim() || "اډمين" : tgRole;

    const newAdmin: TelegramAdmin = {
      id: `tg_${Date.now()}`,
      name: tgName.trim(),
      username: formattedUsername,
      role: finalRole,
      avatar:
        finalRole === "تلګرام چينل"
          ? "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      followers: finalRole,
      bio: tgBio.trim() || undefined,
      whatsapp: tgWhatsapp.trim() || undefined,
      facebook: tgFacebook.trim() || undefined,
      youtube: tgYoutube.trim() || undefined,
      instagram: tgInstagram.trim() || undefined,
      tiktok: tgTiktok.trim() || undefined,
      twitterX: tgTwitterX.trim() || undefined,
      phone: tgPhone.trim() || undefined,
    };

    if (onAddTelegramAdmin) {
      onAddTelegramAdmin(newAdmin);
    }
    setTgName("");
    setTgUsername("");
    setCustomTgRole("");
    setTgBio("");
    setTgWhatsapp("");
    setTgFacebook("");
    setTgYoutube("");
    setTgInstagram("");
    setTgTiktok("");
    setTgTwitterX("");
    setTgPhone("");
    setTgAddSuccess(true);
    setTimeout(() => setTgAddSuccess(false), 3000);
  };

  // Handle Add New Poet
  const handleCreatePoet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPoetName.trim()) return;

    const newPoetObj: Poet = {
      id: `poet_${Date.now()}`,
      name: newPoetName.trim(),
      avatar:
        newPoetAvatar.trim() ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      bio: newPoetBio.trim() || "پښتو متعهد او دروند شاعر",
    };

    onAddPoet(newPoetObj);
    setNewPoetName("");
    setNewPoetAvatar("");
    setNewPoetBio("");
    setPoetAddSuccess(true);
    setTimeout(() => setPoetAddSuccess(false), 3000);
  };

  // Handle Create New Story / Slide
  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyVerse.trim()) return;

    const matchedPoet = poets.find((p) => p.name === storyPoet);

    const newSlideObj: FeaturedSlide = {
      id: Date.now(),
      poet: storyPoet,
      category: storyCategory,
      avatar:
        storyAvatarUrl.trim() ||
        matchedPoet?.avatar ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      verse: storyVerse.trim(),
      bgUrl:
        storyBgUrl.trim() ||
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    };

    onAddSlide(newSlideObj);
    setStoryVerse("");
    setStoryBgUrl("");
    setStoryAvatarUrl("");
    setStoryAddSuccess(true);
    setTimeout(() => setStoryAddSuccess(false), 3000);
  };

  // Handle Copy Post
  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle Save Settings
  const handleSaveSettings = () => {
    setChannelUsername(tempChannel.trim());
    setBotToken(tempBotToken.trim());
    alert("د چينل او بوټ ترتيبات په بریا سره خوندي شول!");
  };

  // Test Telegram Bot Token
  const handleTestBot = async () => {
    if (!tempBotToken) {
      setTestBotResult("مهرباني وکړئ د بوټ ټوکن داخل کړئ.");
      return;
    }
    setTestingBot(true);
    setTestBotResult(null);

    try {
      const res = await fetch(`https://api.telegram.org/bot${tempBotToken}/getMe`);
      const data = await res.json();
      if (data.ok) {
        setTestBotResult(`✅ د بوټ پیوستون بریالی و! بوټ: @${data.result.username}`);
      } else {
        setTestBotResult(`❌ د ټوکن تېروتنه: ${data.description}`);
      }
    } catch (err) {
      setTestBotResult("❌ د انټرنیټ یا تلګرام شبکې ستونزه.");
    } finally {
      setTestingBot(false);
    }
  };

  // Filtered Posts
  const filteredPosts = posts.filter(
    (p) =>
      p.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.poetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 py-2">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Feather className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{posts.length}</div>
            <div className="text-xs text-slate-400 font-medium">خپاره شوي شعرونه</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{poets.length - 1}</div>
            <div className="text-xs text-slate-400 font-medium">د ثبت شویو شاعرانو شمېر</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{slides.length}</div>
            <div className="text-xs text-slate-400 font-medium">سټوري / فیچر سلایډونه</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-white truncate max-w-[140px]">@{channelUsername}</div>
            <div className="text-xs text-emerald-400 flex items-center gap-1 font-medium mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>چينل بوټ وصل دی</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Operations Navigation Tabs */}
      <div className="bg-slate-900 border border-slate-800 p-2 rounded-2xl flex flex-wrap items-center justify-between gap-2 shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setAdminSubTab("post")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              adminSubTab === "post"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Send className="w-4 h-4" />
            <span>۱. شعر پوسټ کول (Post Poetry)</span>
          </button>

          <button
            onClick={() => setAdminSubTab("reel")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              adminSubTab === "reel"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Tv className="w-4 h-4 text-rose-300" />
            <span>۲. د ریل ویډیو اپلوډ (Video Reels)</span>
          </button>

          <button
            onClick={() => setAdminSubTab("poet")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              adminSubTab === "poet"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>۳. د شاعر اضافه کول (Add Poet)</span>
          </button>

          <button
            onClick={() => setAdminSubTab("story")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              adminSubTab === "story"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>۳. سټوري / فیچر پورته کول (Upload Story)</span>
          </button>

          <button
            onClick={() => setAdminSubTab("telegram")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              adminSubTab === "telegram"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Send className="w-4 h-4 text-sky-400" />
            <span>۴. تلګرام اډمينان او چينلونه (Telegram IDs)</span>
          </button>

          <button
            onClick={() => setAdminSubTab("settings")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              adminSubTab === "settings"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>۵. د بوټ تنظیمونه (Settings)</span>
          </button>
        </div>

        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
          اډمین واکمني (Admin Control)
        </span>
      </div>

      {/* SUB TAB 1: POST POETRY & MANAGE POSTS */}
      {adminSubTab === "post" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
          {/* Left: Publish Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">نوی شعر پوسټ کول</h2>
                  <p className="text-[11px] text-slate-400">نوی شعر سمدستي د اپلیشن او لیست اول سر ته زیاتېږي</p>
                </div>
              </div>
            </div>

            {publishSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 animate-in zoom-in-95">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>شعر په بریا سره خپور شو او د لیست د ټولو نویو په سر کې ځای پر ځای شو!</span>
              </div>
            )}

            <form onSubmit={handlePublishPoetry} className="space-y-4">
              {/* Select Poet */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex justify-between">
                  <span>د شاعر انتخاب</span>
                  <span className="text-[10px] text-slate-500">له لېست څخه يا نوی نوم</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedPoetName}
                    onChange={(e) => setSelectedPoetName(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 flex-1"
                  >
                    {poets
                      .filter((p) => p.id !== "all")
                      .map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                  <input
                    type="text"
                    placeholder="بل شاعر..."
                    value={customPoetName}
                    onChange={(e) => setCustomPoetName(e.target.value)}
                    className="w-28 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Category selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">د شعر ډول / کټګوري</label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1 text-xs rounded-xl transition-all font-semibold ${
                        category === cat
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                          : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Poetry Text Area */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">د شعر متن (پښتو)</label>
                  <span className="text-[10px] text-slate-500">توري: {poetryText.length}</span>
                </div>
                <textarea
                  dir="rtl"
                  required
                  rows={6}
                  value={poetryText}
                  onChange={(e) => setPoetryText(e.target.value)}
                  placeholder="دلته خپل ښکلی پښتو شعر یا بیتونه ولیکئ..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-serif leading-relaxed text-right resize-none shadow-inner"
                ></textarea>
              </div>

              {/* Optional Photo URL & Designed Poster Checkbox */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>د شعر عکس / ډیزاین شوی پوسټر لینک (اختیاري)</span>
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />

                {/* Designed Poster Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={isDesignedPoster}
                    onChange={(e) => setIsDesignedPoster(e.target.checked)}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-slate-900 border-slate-700"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-purple-300 block">دا يو ډیزاین شوی عکس (پوسټر) دی 🎨</span>
                    <span className="text-[10px] text-slate-400">په فلټر او د شعرونو په لیست کې به د خاص ډیزاین پوسټر بڼه وښیي</span>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={isPublishing || !poetryText.trim()}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isPublishing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>خپرېږي...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>شعر خپور کړئ (Publish Poetry)</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Manage Feed */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Feather className="w-5 h-5 text-emerald-400" />
                  <span>په اپلیکیشن کې خپاره شوي شعرونه ({filteredPosts.length})</span>
                </h2>
                <p className="text-xs text-slate-400">نوي شعرونه د لېست په اول سر کې دي</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="شعر يا د شاعر نوم وپالئ..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-right"
                />
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredPosts.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
                  <Feather className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                  <p className="text-sm font-semibold">هیڅ شعر ونه موندل شو</p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-lg transition-all relative group"
                  >
                    <div className="flex items-center justify-between text-xs mb-3 border-b border-slate-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-slate-200 font-bold text-xs">{post.poetName}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{post.formattedDate}</span>
                    </div>

                    <p
                      dir="rtl"
                      className="text-sm font-serif font-semibold text-slate-100 leading-relaxed text-right whitespace-pre-line py-2 pr-3 border-r-2 border-emerald-500 my-1 bg-slate-950/50 p-3 rounded-xl"
                    >
                      {post.text}
                    </p>

                    {post.photoUrl && (
                      <div className="mt-3 rounded-xl overflow-hidden h-36 bg-slate-950 border border-slate-800">
                        <img src={post.photoUrl} alt="Poetry Media" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => handleCopy(post.id, post.text)}
                        className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                          copiedId === post.id ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {copiedId === post.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === post.id ? "کاپي شو!" : "کاپي کړئ"}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm("ایا دا شعر حذف کول غواړئ؟")) onDeletePost(post.id);
                        }}
                        className="text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف کړئ (Delete)</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB FOR REEL VIDEO UPLOAD */}
      {adminSubTab === "reel" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
          {/* Left: Reel Upload Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">د ریل ویډیو اپلوډ (Upload Video Reel)</h2>
                  <p className="text-[11px] text-slate-400">نوی ویډیو ریل به سمدستي د ریلز ویډیو ګانو په برخه کې وښودل شي</p>
                </div>
              </div>
            </div>

            {reelPublishSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 animate-in zoom-in-95">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>ویډیو ریل په بریا سره پورته شو او د ریلز اکټیویټي لیست ته اضافه شو!</span>
              </div>
            )}

            <form onSubmit={handlePublishReel} className="space-y-4">
              {/* Select Poet */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex justify-between">
                  <span>د شاعر انتخات</span>
                  <span className="text-[10px] text-slate-500">لیست یا بل نوم</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={reelPoetName}
                    onChange={(e) => setReelPoetName(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 flex-1"
                  >
                    {poets
                      .filter((p) => p.id !== "all")
                      .map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                  <input
                    type="text"
                    placeholder="بل نوم..."
                    value={reelCustomPoet}
                    onChange={(e) => setReelCustomPoet(e.target.value)}
                    className="w-28 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Reel Category selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">د ریل ویډیو کټګوري (Category)</label>
                <div className="flex flex-wrap gap-1.5">
                  {REEL_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setReelCategory(cat)}
                      className={`px-3 py-1 text-xs rounded-xl transition-all font-semibold ${
                        reelCategory === cat
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                          : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Video URL Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 text-rose-400" />
                    <span>د ویډیو کلپ لینک (Video URL MP4/WebM)</span>
                  </span>
                  <span className="text-[10px] text-rose-400 font-bold">*لازمي</span>
                </label>
                <input
                  type="url"
                  required
                  value={reelVideoUrl}
                  onChange={(e) => setReelVideoUrl(e.target.value)}
                  placeholder="https://assets.mixkit.co/videos/preview/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-rose-500 font-mono"
                />

                {/* Preset Sample Videos */}
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-medium">نمونې ویډیوګانې:</span>
                  <button
                    type="button"
                    onClick={() => setReelVideoUrl("https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-over-a-silent-lake-4309-large.mp4")}
                    className="text-[10px] bg-slate-800 hover:bg-slate-700 text-rose-300 px-2 py-0.5 rounded-lg border border-slate-700"
                  >
                    نمونه ۱ (شپه‌او‌ستوري)
                  </button>
                  <button
                    type="button"
                    onClick={() => setReelVideoUrl("https://assets.mixkit.co/videos/preview/mixkit-sun-setting-over-the-mountains-4221-large.mp4")}
                    className="text-[10px] bg-slate-800 hover:bg-slate-700 text-rose-300 px-2 py-0.5 rounded-lg border border-slate-700"
                  >
                    نمونه ۲ (غرونه او لمر)
                  </button>
                  <button
                    type="button"
                    onClick={() => setReelVideoUrl("https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1188-large.mp4")}
                    className="text-[10px] bg-slate-800 hover:bg-slate-700 text-rose-300 px-2 py-0.5 rounded-lg border border-slate-700"
                  >
                    نمونه ۳ (سنگل باد)
                  </button>
                </div>
              </div>

              {/* Cover Photo / Thumbnail URL (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">د ویډیو عکس / کور سنګل (اختیاري Thumbnail)</label>
                <input
                  type="url"
                  value={reelThumbnailUrl}
                  onChange={(e) => setReelThumbnailUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Caption / Poem text */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">د ریل دکلمه / توضيح / شعر متن</label>
                </div>
                <textarea
                  dir="rtl"
                  required
                  rows={4}
                  value={reelText}
                  onChange={(e) => setReelText(e.target.value)}
                  placeholder="د دې ریل ویډیو لپاره متني شعر یا توضيح داخل کړئ..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-rose-500 font-serif leading-relaxed text-right resize-none shadow-inner"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={reelPublishing || !reelText.trim() || !reelVideoUrl.trim()}
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {reelPublishing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>خپرېږي...</span>
                  </>
                ) : (
                  <>
                    <Tv className="w-4 h-4" />
                    <span>د ویډیو ریل خپور کړئ (Publish Video Reel)</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Existing Reel Videos List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tv className="w-5 h-5 text-rose-400" />
                <h3 className="text-sm font-bold text-white">ټول پورته شوي ویډیو ریلونه</h3>
              </div>
              <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                {posts.filter((p) => p.mediaType === "VIDEO" || p.videoUrl).length} ویډیوګانې
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.filter((p) => p.mediaType === "VIDEO" || p.videoUrl).length === 0 ? (
                <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
                  <Tv className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                  <p className="text-sm font-semibold">تر اوسه هیڅ ویډیو ریل نه دی پورته شوی</p>
                </div>
              ) : (
                posts
                  .filter((p) => p.mediaType === "VIDEO" || p.videoUrl)
                  .map((post) => (
                    <div
                      key={post.id}
                      className="bg-slate-900 border border-slate-800 hover:border-rose-500/40 rounded-2xl p-4 shadow-lg transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                        <span className="bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-slate-300 font-bold text-xs">{post.poetName}</span>
                      </div>

                      {/* Video Player Preview */}
                      {post.videoUrl && (
                        <div className="rounded-xl overflow-hidden bg-black border border-slate-800 aspect-video relative group">
                          <video
                            src={post.videoUrl}
                            controls
                            className="w-full h-full object-cover"
                            poster={post.photoUrl}
                          />
                        </div>
                      )}

                      <p dir="rtl" className="text-xs font-serif text-slate-200 line-clamp-3 text-right">
                        {post.text}
                      </p>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">{post.formattedDate}</span>
                        <button
                          onClick={() => {
                            if (confirm("ایا دا ویډیو ریل حذف کول غواړئ؟")) onDeletePost(post.id);
                          }}
                          className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>حذف</span>
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
      {adminSubTab === "poet" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
          {/* Left: Add Poet Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-600/20 text-teal-400 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">نوی شاعر اضافه کول</h2>
                <p className="text-[11px] text-slate-400">د عکس او بیوګرافي سره نوی شاعر ثبت کړئ</p>
              </div>
            </div>

            {poetAddSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>نوی شاعر په بریا سره اضافه شو او انځوريز لېست ته وراضافه شو!</span>
              </div>
            )}

            <form onSubmit={handleCreatePoet} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">د شاعر بشپړ نوم *</label>
                <input
                  type="text"
                  required
                  value={newPoetName}
                  onChange={(e) => setNewPoetName(e.target.value)}
                  placeholder="مثلاً: اجمل خټک"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500 text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-teal-400" />
                  <span>د شاعر د انځور لینک (Photo URL)</span>
                </label>
                <input
                  type="url"
                  value={newPoetAvatar}
                  onChange={(e) => setNewPoetAvatar(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">لنډه سوانح / بیوګرافي</label>
                <textarea
                  rows={3}
                  value={newPoetBio}
                  onChange={(e) => setNewPoetBio(e.target.value)}
                  placeholder="د شاعر د سوانح او شخصیت په اړه واضح جملې..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500 text-right resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>شاعر ثبت کړئ (Save Poet)</span>
              </button>
            </form>
          </div>

          {/* Right: Existing Poets List */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-teal-400" />
                  <span>ثبت شوي شاعران ({poets.filter((p) => p.id !== "all").length})</span>
                </h2>
                <p className="text-xs text-slate-400">دا ټول شاعران د موبایل په لومړي سر کې ښودل کېږي</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
              {poets
                .filter((p) => p.id !== "all")
                .map((poet) => (
                  <div
                    key={poet.id}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between gap-2 hover:border-teal-500/40 transition-all"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="relative shrink-0">
                        <img src={poet.avatar} alt={poet.name} className="w-11 h-11 rounded-full object-cover border border-teal-500/30" />
                        {poet.isVerified && (
                          <div className="absolute -bottom-0.5 -right-0.5 bg-sky-500 text-white p-0.5 rounded-full ring-2 ring-slate-950">
                            <BadgeCheck className="w-3 h-3 fill-sky-500 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1">
                          <h4 className="font-bold text-xs text-white truncate">{poet.name}</h4>
                          {poet.isVerified && <BadgeCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{poet.bio || "پښتو شاعر"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {onTogglePoetVerified && (
                        <button
                          onClick={() => onTogglePoetVerified(poet.id)}
                          className={`p-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1 border transition-all ${
                            poet.isVerified
                              ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                              : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                          }`}
                          title="بلو ټیک ثبتول/اخیستل"
                        >
                          <BadgeCheck className={`w-3.5 h-3.5 ${poet.isVerified ? "text-sky-400" : ""}`} />
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (confirm(`ایا ${poet.name} حذف کول غواړئ؟`)) onDeletePoet(poet.id);
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 3: UPLOAD STORY / FEATURED SLIDE */}
      {adminSubTab === "story" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
          {/* Left: Create Story Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">سټوري / فیچر سلایډ پورته کول</h2>
                <p className="text-[11px] text-slate-400">دا شعر به د اپلیکیشن د لومړي سر په ViewPager2 کې وښودل شي</p>
              </div>
            </div>

            {storyAddSuccess && (
              <div className="bg-purple-500/10 border border-purple-500/30 text-purple-300 px-4 py-3 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>سټوري/سلایډ په بریا سره ViewPager2 ته زیا شو!</span>
              </div>
            )}

            <form onSubmit={handleCreateStory} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">شاعر انتخاب</label>
                  <select
                    value={storyPoet}
                    onChange={(e) => setStoryPoet(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {poets
                      .filter((p) => p.id !== "all")
                      .map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">کټګوري</label>
                  <select
                    value={storyCategory}
                    onChange={(e) => setStoryCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">د سټوري / فیچر شعر بیتونه *</label>
                <textarea
                  rows={3}
                  required
                  value={storyVerse}
                  onChange={(e) => setStoryVerse(e.target.value)}
                  placeholder="د سټوري لنډ او اغېزناک شعر وليکئ..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 text-right resize-none font-serif leading-relaxed"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>د سټوري د شالید (Background Cover) عکس لینک</span>
                </label>
                <input
                  type="url"
                  value={storyBgUrl}
                  onChange={(e) => setStoryBgUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>سټوري خپره کړئ (Publish Story)</span>
              </button>
            </form>
          </div>

          {/* Right: Active ViewPager Stories List */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  <span>فعاله سټوري / فیچر سلایډونه ({slides.length})</span>
                </h2>
                <p className="text-xs text-slate-400">دا سلایډونه د موبایل په لومړي سر ViewPager2 کې دورې وهي</p>
              </div>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="relative rounded-2xl overflow-hidden border border-slate-800 h-28 flex items-center p-4 justify-between group shadow-lg"
                >
                  <img src={slide.bgUrl} alt={slide.poet} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/80" />

                  <div className="relative z-10 flex items-center gap-3">
                    <img src={slide.avatar} alt={slide.poet} className="w-10 h-10 rounded-full object-cover border-2 border-purple-400 shadow-md" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{slide.poet}</span>
                        <span className="bg-purple-500/30 text-purple-300 text-[10px] font-bold px-2 py-0.2 rounded-full border border-purple-400/40">
                          {slide.category}
                        </span>
                      </div>
                      <p dir="rtl" className="text-xs font-serif text-slate-200 mt-1 line-clamp-1 max-w-[280px]">
                        {slide.verse}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm("ایا دا سټوري حذف کول غواړئ؟")) onDeleteSlide(slide.id);
                    }}
                    className="relative z-10 p-2 bg-slate-900/80 hover:bg-rose-600 text-white rounded-xl transition-all shadow-md"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 4: TELEGRAM ADMINS & CHANNEL HANDLES */}
      {adminSubTab === "telegram" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
          {/* Left: Add Telegram Handle Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">نوی چينل يا اډمين اضافه کړئ</h2>
                <p className="text-[11px] text-slate-400">په اپلیکیشن کې به د پروفایل او تلګرام لېست په توګه وښودل شي</p>
              </div>
            </div>

            {tgAddSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>تلګرام ایډي په بریا سره په لیست او د موبایل انټرفیس کې اضافه شوه!</span>
              </div>
            )}

            <form onSubmit={handleAddTgAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">نوم / لقب:</label>
                <input
                  type="text"
                  required
                  placeholder="مثلاً: د پښتو غزل رسمي چينل"
                  value={tgName}
                  onChange={(e) => setTgName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">تلګرام یوزرنیم / آیدي (@username):</label>
                <input
                  type="text"
                  required
                  placeholder="مثلاً: @testapp_pashto"
                  value={tgUsername}
                  onChange={(e) => setTgUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 dir-ltr text-left"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ډول / نقش (Role Badge):</label>
                <select
                  value={tgRole}
                  onChange={(e) => setTgRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="اډمين">اداري اډمين (Admin)</option>
                  <option value="همکار">همکار (Co-Admin / Assistant)</option>
                  <option value="يوزر">کاروونکی (User / Member)</option>
                  <option value="شاعر">شاعر / لیکوال (Poet)</option>
                  <option value="مدیر">عمومي مدیر (Moderator)</option>
                  <option value="تلګرام چينل">تلګرام چينل (Channel)</option>
                  <option value="خپرندوی">خپرندوی (Publisher)</option>
                  <option value="VIP">VIP غړی</option>
                  <option value="custom">✏️ په خپله اختیاري نقش ولیکئ...</option>
                </select>

                {tgRole === "custom" && (
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: بېټا ټسټر / ډیزاینر / ناظم"
                    value={customTgRole}
                    onChange={(e) => setCustomTgRole(e.target.value)}
                    className="w-full mt-2 bg-slate-950 border border-sky-500/50 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">توضیحات / بیو (Bio - اختیاري):</label>
                <textarea
                  rows={2}
                  placeholder="د دې اډمين یا چينل په اړه لنډ معلومات..."
                  value={tgBio}
                  onChange={(e) => setTgBio(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500 resize-none"
                ></textarea>
              </div>

              <div className="space-y-2 pt-1 border-t border-slate-800/80">
                <span className="block text-xs font-bold text-sky-400">سوشل میډیا او اړيکې (اختیاري):</span>
                
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="واټساپ (مثلاً: +93700000000)"
                    value={tgWhatsapp}
                    onChange={(e) => setTgWhatsapp(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white dir-ltr text-left focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    placeholder="فېسبوک لینک"
                    value={tgFacebook}
                    onChange={(e) => setTgFacebook(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white dir-ltr text-left focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="یوټیوب لینک"
                    value={tgYoutube}
                    onChange={(e) => setTgYoutube(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white dir-ltr text-left focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="text"
                    placeholder="انسټاګرام (Instagram)"
                    value={tgInstagram}
                    onChange={(e) => setTgInstagram(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white dir-ltr text-left focus:outline-none focus:border-pink-500"
                  />
                  <input
                    type="text"
                    placeholder="ټیک ټاک (TikTok)"
                    value={tgTiktok}
                    onChange={(e) => setTgTiktok(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white dir-ltr text-left focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="text"
                    placeholder="اېکس / ټویټر (X / Twitter)"
                    value={tgTwitterX}
                    onChange={(e) => setTgTwitterX(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white dir-ltr text-left focus:outline-none focus:border-sky-500"
                  />
                  <input
                    type="text"
                    placeholder="ټلیفون نمره"
                    value={tgPhone}
                    onChange={(e) => setTgPhone(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white dir-ltr text-left focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>تلګرام ایډي ثبت کړئ (Save Handle)</span>
              </button>
            </form>
          </div>

          {/* Right: Existing Telegram Handles List */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-sky-400" />
                  <span>د تلګرام ثبت شوي چينلونه او ایډيګانې ({telegramAdmins.length})</span>
                </h2>
                <p className="text-xs text-slate-400">دا اډمينان د شاعرانو لېست لاندې په پروفایل بڼه ښودل کېږي</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
              {telegramAdmins.map((admin) => (
                <div
                  key={admin.id}
                  className={`bg-slate-950 border rounded-2xl p-3.5 flex items-center justify-between gap-2 group transition-all ${
                    admin.isBlocked
                      ? "border-rose-900/60 bg-rose-950/20"
                      : "border-slate-800 hover:border-sky-500/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="relative shrink-0">
                      <img
                        src={
                          admin.avatar ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                        }
                        alt={admin.name}
                        className={`w-10 h-10 rounded-full object-cover border ${
                          admin.isBlocked ? "border-rose-500 opacity-60" : "border-sky-400"
                        }`}
                      />
                      {admin.isVerified && (
                        <div className="absolute -bottom-0.5 -right-0.5 bg-sky-500 text-white p-0.5 rounded-full ring-2 ring-slate-950">
                          <BadgeCheck className="w-3 h-3 fill-sky-500 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1">
                        <h4 className={`font-bold text-xs truncate ${admin.isBlocked ? "line-through text-slate-400" : "text-white"}`}>
                          {admin.name}
                        </h4>
                        {admin.isVerified && <BadgeCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                      </div>
                      <p className="text-[10px] text-sky-400 font-semibold dir-ltr text-right truncate">
                        {admin.username}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[9px] bg-sky-500/10 text-sky-300 border border-sky-500/20 px-2 py-0.2 rounded-full inline-block">
                          {admin.role}
                        </span>
                        {admin.isBlocked && (
                          <span className="text-[9px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.2 rounded-full font-bold">
                            بلاک شوی
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {/* Blue Tick Toggle */}
                    {onToggleAdminVerified && (
                      <button
                        onClick={() => onToggleAdminVerified(admin.id)}
                        className={`p-1.5 rounded-xl text-[10px] font-bold border transition-all ${
                          admin.isVerified
                            ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                            : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                        }`}
                        title="بلو ټیک (Verified)"
                      >
                        <BadgeCheck className={`w-3.5 h-3.5 ${admin.isVerified ? "text-sky-400" : ""}`} />
                      </button>
                    )}

                    {/* Block / Unblock Toggle */}
                    {onToggleAdminBlocked && (
                      <button
                        onClick={() => onToggleAdminBlocked(admin.id)}
                        className={`p-1.5 rounded-xl text-[10px] font-bold border transition-all ${
                          admin.isBlocked
                            ? "bg-rose-600 text-white border-rose-500"
                            : "bg-slate-800 text-slate-400 border-slate-700 hover:text-rose-400"
                        }`}
                        title={admin.isBlocked ? "ان‌بلاک کول" : "بلاک کول"}
                      >
                        <Ban className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Delete Admin */}
                    {onDeleteTelegramAdmin && (
                      <button
                        onClick={() => {
                          if (confirm(`ایا مطمئن یاست چې د ${admin.name} ایډي حذف کړئ؟`)) {
                            onDeleteTelegramAdmin(admin.id);
                          }
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-900 rounded-xl transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 5: SETTINGS & BOT CONFIG */}
      {adminSubTab === "settings" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 max-w-3xl mx-auto animate-in fade-in">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">د بوټ او چينل تنظیمونه (Telegram Bot API)</h3>
              <p className="text-xs text-slate-400">کله چې نوی شعر پوسټ کوئ، سمدستې تلګرام چينل ته هم استول کېږي</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">د تلګرام چينل نوم (Channel Username)</label>
              <input
                type="text"
                value={tempChannel}
                onChange={(e) => setTempChannel(e.target.value)}
                placeholder="testapp_pashto"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">د تلګرام بوټ ټوکن (Bot Token API)</label>
              <input
                type="password"
                value={tempBotToken}
                onChange={(e) => setTempBotToken(e.target.value)}
                placeholder="8969166004:AAG..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {testBotResult && (
            <div
              className={`p-3.5 rounded-xl text-xs font-semibold ${
                testBotResult.includes("✅")
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
              }`}
            >
              {testBotResult}
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={handleTestBot}
              disabled={testingBot}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 transition-all"
            >
              {testingBot ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-400" />}
              <span>د پیوستون ازموینه (Test Connection)</span>
            </button>

            <button
              type="button"
              onClick={handleSaveSettings}
              className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-sky-500/20 flex items-center gap-2 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>ترتیبونه خوندي کړئ (Save Settings)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
