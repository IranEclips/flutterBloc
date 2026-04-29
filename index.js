export const config = { runtime: "edge" };

export default async function handler(req) {
  const url = new URL(req.url);
  const targetBase = process.env.iraneclips;

  if (url.pathname === "/" && req.headers.get("accept")?.includes("text/html")) {
    return new Response("<h1>App Core Online</h1>", { headers: { "content-type": "text/html" } });
  }

  if (!targetBase) return new Response("Config Missing", { status: 500 });

  const targetUrl = targetBase.replace(/\/$/, "") + url.pathname + url.search;
  const headers = new Headers(req.headers);
  headers.delete("host");

  return fetch(targetUrl, {
    method: req.method,
    headers: headers,
    body: req.body,
    duplex: "half",
    redirect: "manual",
  });
}