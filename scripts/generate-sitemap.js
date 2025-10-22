const fs = require('fs');
const path = require('path');

const baseUrl = 'https://isuvsa.org';
const currentDate = new Date().toISOString().split('T')[0];

// Define your routes with their properties
const routes = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/about/board', changefreq: 'monthly', priority: 0.8 },

  // Events
  { path: '/events/upcoming', changefreq: 'weekly', priority: 0.9 },


  // Other pages
  { path: '/acce', changefreq: 'monthly', priority: 0.7 },
  { path: '/gallery', changefreq: 'weekly', priority: 0.7 },
  { path: '/contact', changefreq: 'yearly', priority: 0.8 },
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicPath = path.join(__dirname, '..', 'public');
  const sitemapPath = path.join(publicPath, 'sitemap.xml');

  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`✅ Sitemap generated successfully at: ${sitemapPath}`);
  console.log(`📝 Total routes: ${routes.length}`);
  console.log(`📅 Last modified date: ${currentDate}`);
}

// Also generate a sitemap index if you have multiple sitemaps
function generateSitemapIndex() {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

  const publicPath = path.join(__dirname, '..', 'public');
  const sitemapIndexPath = path.join(publicPath, 'sitemap-index.xml');

  fs.writeFileSync(sitemapIndexPath, sitemapIndex);
  console.log(`✅ Sitemap index generated at: ${sitemapIndexPath}`);
}

// Run the generation
generateSitemap();
generateSitemapIndex();

module.exports = { generateSitemap, generateSitemapIndex };