const fs = require('fs');
const path = require('path');

const baseUrl = 'https://isuvsa.org';
const currentDate = new Date().toISOString().split('T')[0];

// Define your routes with their properties
const routes = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },

  // About Section
  { path: '/about', changefreq: 'monthly', priority: 0.9 },
  { path: '/about/mission', changefreq: 'yearly', priority: 0.8 },
  { path: '/about/history', changefreq: 'yearly', priority: 0.7 },
  { path: '/about/board', changefreq: 'monthly', priority: 0.8 },
  { path: '/about/constitution', changefreq: 'yearly', priority: 0.6 },

  // Events Section
  { path: '/events', changefreq: 'weekly', priority: 0.9 },
  { path: '/events/upcoming', changefreq: 'weekly', priority: 0.9 },
  { path: '/events/past', changefreq: 'monthly', priority: 0.7 },
  { path: '/events/cultural-shows', changefreq: 'monthly', priority: 0.8 },
  { path: '/events/tet', changefreq: 'yearly', priority: 0.8 },

  // Get Involved Section
  { path: '/get-involved', changefreq: 'monthly', priority: 0.9 },
  { path: '/get-involved/membership', changefreq: 'monthly', priority: 0.8 },
  { path: '/get-involved/committees', changefreq: 'monthly', priority: 0.7 },
  { path: '/get-involved/newsletter', changefreq: 'monthly', priority: 0.7 },
  { path: '/get-involved/volunteer', changefreq: 'monthly', priority: 0.7 },

  // Resources Section
  { path: '/resources', changefreq: 'monthly', priority: 0.8 },
  { path: '/resources/new-students', changefreq: 'yearly', priority: 0.7 },
  { path: '/resources/cultural', changefreq: 'monthly', priority: 0.7 },
  { path: '/resources/academic', changefreq: 'monthly', priority: 0.7 },

  // Other pages
  { path: '/gallery', changefreq: 'weekly', priority: 0.7 },
  { path: '/contact', changefreq: 'yearly', priority: 0.8 },
  { path: '/news', changefreq: 'daily', priority: 0.8 },
  { path: '/social', changefreq: 'monthly', priority: 0.6 },
  { path: '/vietnamese-culture', changefreq: 'monthly', priority: 0.7 },
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