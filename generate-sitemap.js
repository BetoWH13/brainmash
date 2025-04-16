const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://brainmash.xyz';
const PAGES_DIR = './'; // root dir
const today = new Date().toISOString().split('T')[0];

const files = fs.readdirSync(PAGES_DIR)
  .filter(file => file.endsWith('.html'))
  .map(file => ({
    loc: `${SITE_URL}/${file === 'index.html' ? '' : file}`,
    lastmod: today,
    priority: file === 'index.html' ? '1.00' : '0.80'
  }));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${
  files.map(f => 
`  <url>
    <loc>${f.loc}</loc>
    <lastmod>${f.lastmod}</lastmod>
    <priority>${f.priority}</priority>
  </url>`).join('\n')
}\n</urlset>`;

fs.writeFileSync(path.join(PAGES_DIR, 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated!');
