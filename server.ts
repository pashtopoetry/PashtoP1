import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import JSZip from "jszip";

const app = express();
const PORT = 3000;

app.use(express.json());

const ROOT_PROJECT_DIR = process.cwd();

// Helper function to recursively read directory files (excluding node_modules, dist, git)
function getFilesRecursively(dir: string, baseDir: string = dir): { path: string; relativePath: string }[] {
  let results: { path: string; relativePath: string }[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === "node_modules" || file === "dist" || file === ".git" || file === "bun.lock") continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath, baseDir));
    } else {
      const relativePath = path.relative(baseDir, filePath).replace(/\\/g, "/");
      results.push({ path: filePath, relativePath });
    }
  }
  return results;
}

// 1. API: Download Project as ZIP
app.get("/api/download-project", async (req, res) => {
  try {
    const zip = new JSZip();
    const files = getFilesRecursively(ROOT_PROJECT_DIR);

    for (const file of files) {
      const content = fs.readFileSync(file.path);
      zip.file(file.relativePath, content);
    }

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", 'attachment; filename="PashtoPoetryFeed_GitHub.zip"');
    res.send(zipBuffer);
  } catch (err: any) {
    console.error("Zip error:", err);
    res.status(500).json({ error: "Failed to generate ZIP archive" });
  }
});

// 2. API: Get Project Directory Tree & File Contents
app.get("/api/project-files", (req, res) => {
  try {
    const files = getFilesRecursively(ROOT_PROJECT_DIR);
    const fileTree = files.map((f) => ({
      path: f.relativePath,
      name: path.basename(f.relativePath),
      extension: path.extname(f.relativePath).replace(".", ""),
    }));

    res.json({ files: fileTree });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to read project files" });
  }
});

// 3. API: Get Single File Content
app.get("/api/project-file-content", (req, res) => {
  try {
    const relativePath = req.query.path as string;
    if (!relativePath) {
      return res.status(400).json({ error: "File path parameter required" });
    }

    const fullPath = path.join(ROOT_PROJECT_DIR, relativePath);
    if (!fullPath.startsWith(ROOT_PROJECT_DIR) || !fs.existsSync(fullPath)) {
      return res.status(404).json({ error: "File not found" });
    }

    const content = fs.readFileSync(fullPath, "utf-8");
    res.json({ path: relativePath, content });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to read file content" });
  }
});

// 4. API: Telegram Live Proxy (Fetch Channel Web Preview Posts)
app.get("/api/telegram/channel", async (req, res) => {
  try {
    const channelName = ((req.query.channel as string) || "testapp_pashto").replace("@", "").trim();
    const botToken = (req.query.botToken as string) || "8969166004:AAG7unVgAYsdw8IeapOH9R-BcDCtXZtzajQ";

    // If bot token provided, query Telegram Bot API getUpdates
    if (botToken) {
      const botApiUrl = `https://api.telegram.org/bot${botToken}/getUpdates`;
      const apiRes = await fetch(botApiUrl);
      if (apiRes.ok) {
        const data: any = await apiRes.json();
        if (data.ok && Array.isArray(data.result) && data.result.length > 0) {
          const posts = data.result
            .filter((item: any) => item.channel_post || item.message)
            .map((item: any) => {
              const msg = item.channel_post || item.message;
              return {
                id: msg.message_id,
                text: msg.text || msg.caption || "",
                timestamp: msg.date,
                authorName: msg.chat?.title || channelName,
                viewsCount: "Bot API",
                mediaType: msg.photo ? "PHOTO" : msg.video ? "VIDEO" : "NONE",
                photoUrl: msg.photo
                  ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
                  : null,
                videoUrl: msg.video
                  ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  : null,
              };
            });

          if (posts.length > 0) {
            return res.json({ ok: true, channel: channelName, posts });
          }
        }
      }
    }

    // Fallback: Fetch public channel HTML from t.me/s/channel
    const tUrl = `https://t.me/s/${channelName}`;
    const htmlRes = await fetch(tUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!htmlRes.ok) {
      return res.status(htmlRes.status).json({ error: `Channel @${channelName} not reachable` });
    }

    const htmlText = await htmlRes.text();

    // Parse simple posts regex from t.me/s HTML
    const messageBlocks = htmlText.split('class="tgme_widget_message ');
    const parsedPosts: any[] = [];

    // Channel metadata
    const titleMatch = htmlText.match(/<div class="tgme_channel_info_header_title"><span>([^<]+)<\/span>/);
    const avatarMatch = htmlText.match(/<img class="tgme_page_photo_image" src="([^"]+)"/);

    const channelTitle = titleMatch ? titleMatch[1] : `@${channelName}`;
    const channelAvatar = avatarMatch ? avatarMatch[1] : null;

    for (let i = 1; i < messageBlocks.length; i++) {
      const block = messageBlocks[i];

      // Extract text
      const textMatch = block.match(/<div class="tgme_widget_message_text[^">]*">([\s+S]*?)<\/div>/);
      let rawText = textMatch ? textMatch[1] : "";
      // Strip HTML tags for clean display
      const cleanText = rawText.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

      // Extract Photo
      const photoMatch = block.match(/url\('([^']+)'\)/);
      const photoUrl = photoMatch ? photoMatch[1] : null;

      // Extract Video
      const videoMatch = block.match(/<video[^>]+src="([^"]+)"/);
      const videoUrl = videoMatch ? videoMatch[1] : null;

      // Extract Views
      const viewsMatch = block.match(/<span class="tgme_widget_message_views">([^<]+)<\/span>/);
      const views = viewsMatch ? viewsMatch[1] : "1.2K";

      // Extract Time
      const timeMatch = block.match(/<time datetime="([^"]+)"/);
      const isoTime = timeMatch ? timeMatch[1] : new Date().toISOString();

      if (cleanText || photoUrl || videoUrl) {
        parsedPosts.push({
          id: i,
          text: cleanText || "Media post",
          timestamp: new Date(isoTime).getTime() / 1000,
          formattedDate: new Date(isoTime).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          authorName: channelTitle,
          authorAvatarUrl: channelAvatar,
          viewsCount: views,
          mediaType: videoUrl ? "VIDEO" : photoUrl ? "PHOTO" : "NONE",
          photoUrl: photoUrl,
          videoUrl: videoUrl || (photoUrl && photoUrl.includes(".mp4") ? photoUrl : null),
        });
      }
    }

    res.json({
      ok: true,
      channel: channelName,
      title: channelTitle,
      avatar: channelAvatar,
      posts: parsedPosts.reverse(),
    });
  } catch (err: any) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Failed to load channel feed" });
  }
});

// Start Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Android App Studio Server running on http://localhost:${PORT}`);
  });
}

startServer();
