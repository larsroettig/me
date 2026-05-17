export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://larsroettig.me/sitemap.xml",
  };
}
