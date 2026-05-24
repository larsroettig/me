export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/imprint", "/privacy"] },
    ],
    sitemap: "https://larsroettig.me/sitemap.xml",
  };
}
