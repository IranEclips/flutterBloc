export const config = { runtime: "edge" };

export default async function handler(req) {
  const url = new URL(req.url);
  const accept = req.headers.get("accept") || "";
  const isBrowser = accept.includes("text/html");

  if (url.pathname === "/" && isBrowser) {
    return new Response(
      `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IranEclips | Official Hub</title>
    <style>
        :root { --neon: #00d4ff; --purple: #8b5cf6; }
        body { background: #050a18; color: #fff; font-family: 'Tahoma', sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; overflow: hidden; }
        .container { position: relative; padding: 3rem; background: rgba(10, 15, 30, 0.8); border-radius: 2rem; border: 1px solid rgba(0, 212, 255, 0.2); text-align: center; box-shadow: 0 0 40px rgba(0,0,0,0.8); backdrop-filter: blur(10px); width: 85%; max-width: 450px; }
        .container::before { content: ''; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; background: linear-gradient(45deg, var(--neon), var(--purple)); z-index: -1; border-radius: 2rem; opacity: 0.3; }
        .logo-box { width: 90px; height: 90px; background: linear-gradient(135deg, var(--neon), var(--purple)); border-radius: 22px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; font-weight: 900; color: #fff; box-shadow: 0 0 20px rgba(0, 212, 255, 0.4); }
        h1 { margin: 0; font-size: 1.8rem; letter-spacing: 1px; color: var(--neon); text-shadow: 0 0 10px rgba(0, 212, 255, 0.5); }
        .sub { color: #94a3b8; font-size: 0.9rem; margin: 10px 0 30px; }
        .btn { display: block; text-decoration: none; padding: 12px; margin: 12px 0; border-radius: 12px; font-weight: bold; transition: 0.3s; position: relative; overflow: hidden; }
        .yt { border: 1px solid #ff0000; color: #ff0000; }
        .yt:hover { background: #ff0000; color: #fff; box-shadow: 0 0 20px rgba(255,0,0,0.4); }
        .tg { border: 1px solid var(--neon); color: var(--neon); }
        .tg:hover { background: var(--neon); color: #050a18; box-shadow: 0 0 20px rgba(0,212,255,0.4); }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo-box">IE</div>
        <h1>IRAN ECLIPS</h1>
        <p class="sub">مرجع آموزش‌های تخصصی شبکه و تکنولوژی</p>
        <a href="https://www.youtube.com/@iranEclips" target="_blank" class="btn yt">YouTube Channel</a>
        <a href="https://t.me/IranEclip" target="_blank" class="btn tg">Telegram Community</a>
    </div>
</body>
</html>`,
      {
        headers: { "content-type": "text/html; charset=UTF-8" },
      }
    );
  }

  const targetBase = process.env.iraneclips;
  if (!targetBase)
    return new Response("Configuration missing", { status: 500 });

  const targetUrl = targetBase.replace(/\/$/, "") + url.pathname + url.search;
  const headers = new Headers(req.headers);
  headers.delete("host");

  try {
    return await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.body,
      duplex: "half",
      redirect: "manual",
    });
  } catch (e) {
    return new Response("Service Error", { status: 502 });
  }
}
