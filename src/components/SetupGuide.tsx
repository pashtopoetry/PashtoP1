import React from "react";
import {
  BookOpen,
  CheckCircle2,
  Terminal,
  Key,
  Github,
  Layers,
  Smartphone,
  Download,
  ExternalLink,
} from "lucide-react";

export const SetupGuide: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-8 text-slate-300">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <span>پښتو شعرونه - Android Studio &amp; GitHub Actions Guide</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Complete instructions to build the Pashto Poetry app in Android Studio, connect your Telegram Poetry channel, and generate release APKs.
        </p>
      </div>

      {/* Grid Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Open in Android Studio */}
        <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <div className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">
              1
            </div>
            <span>Open in Android Studio</span>
          </div>
          <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
            <li>Download the project ZIP by clicking <strong>Download Project (.ZIP)</strong>.</li>
            <li>Extract the ZIP archive to your local environment.</li>
            <li>Launch <strong>Android Studio (Hedgehog | Iguana | Jellyfish or newer)</strong>.</li>
            <li>Click <strong>Open</strong> and choose the extracted folder.</li>
            <li>Wait for Gradle Sync to complete (`gradle-wrapper.properties` version `8.5`).</li>
          </ol>
        </div>

        {/* Step 2: Telegram Bot Token Setup */}
        <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">
              2
            </div>
            <span>Telegram Bot API Configuration</span>
          </div>
          <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
            <li>Search for <code className="bg-slate-800 px-1 py-0.5 rounded text-purple-300">@BotFather</code> on Telegram.</li>
            <li>Create a new bot via <code className="bg-slate-800 px-1 py-0.5 rounded text-purple-300">/newbot</code> command and copy your Token.</li>
            <li>Add your bot as an <strong>Administrator</strong> to your Telegram Channel.</li>
            <li>Preconfigured Bot Token: <code className="bg-slate-800 px-1 py-0.5 rounded text-purple-300">8969166004:AAG7...</code></li>
            <li>Preconfigured Channel: <code className="bg-slate-800 px-1 py-0.5 rounded text-purple-300">@testapp_pashto</code></li>
            <li>In the app settings dialog, you can update or switch these anytime.</li>
            <li><em>Note: Public web preview fallback works automatically without Bot Token!</em></li>
          </ol>
        </div>

        {/* Step 3: Run & Test on Device */}
        <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">
              3
            </div>
            <span>Run on Device / Emulator</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li>Supports <strong>Android 6.0 (API 23)</strong> and above.</li>
            <li>Target SDK: <strong>API 34 (Android 14)</strong>.</li>
            <li>Click <strong>Run 'app'</strong> (Shift + F10) in Android Studio.</li>
            <li>Tests 60s auto-refresh, full screen photo viewer, and ExoPlayer video player.</li>
          </ul>
        </div>

        {/* Step 4: GitHub Actions CI/CD */}
        <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs">
              4
            </div>
            <span>GitHub Actions Release APK Build</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li>Includes <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">.github/workflows/build-apk.yml</code>.</li>
            <li>Triggers automatically on <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">git push</code> to <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">main</code>.</li>
            <li>Sets up JDK 17, executes <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">./gradlew assembleRelease</code>.</li>
            <li>Uploads generated Release &amp; Debug APKs directly to GitHub Actions Artifacts!</li>
          </ul>
        </div>
      </div>

      {/* Technical Summary Box */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-white text-sm">Technical Specifications</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            100% Kotlin • XML Layouts • Retrofit • OkHttp • Glide • ExoPlayer (Media3) • No Jetpack Compose • No Firebase
          </p>
        </div>
        <a
          href="/api/download-project"
          className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center gap-2 shrink-0 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download Android Studio ZIP</span>
        </a>
      </div>
    </div>
  );
};
