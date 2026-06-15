import { chromium } from 'playwright';

const BASE = 'https://happycamperconsultant.com';
const PAGES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about/' },
  { name: 'how-we-help', path: '/how-we-help/' },
  { name: 'who-its-for', path: '/who-its-for/' },
  { name: 'approach', path: '/approach/' },
  { name: 'insights', path: '/insights/' },
  { name: 'investment', path: '/investment/' },
  { name: 'conversation', path: '/conversation/' },
  { name: 'vdms', path: '/vdms/' },
  { name: 'christian-camps', path: '/christian-camps/' },
];

const VIEWPORTS = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1280', width: 1280, height: 800 },
  { name: '1440', width: 1440, height: 900 },
];

const OUTDIR = 'data/qa/screenshots';

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

// Capture screenshots
for (const pg of PAGES) {
  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(500); // let animations settle
    const filename = `${OUTDIR}/${pg.name}-${vp.name}.png`;
    await page.screenshot({ path: filename, fullPage: true });
    console.log(`✓ ${filename}`);
  }
}

// Run accessibility audit on homepage at desktop
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.1/axe.min.js' });
await page.waitForTimeout(2000);
const a11y = await page.evaluate(async () => {
  const results = await axe.run();
  return {
    violations: results.violations.map(v => ({
      id: v.id, impact: v.impact, desc: v.description,
      count: v.nodes.length,
      targets: v.nodes.slice(0, 3).map(n => n.target.join(' '))
    })),
    passes: results.passes.length,
    incomplete: results.incomplete.length
  };
});
console.log('\n=== A11Y RESULTS ===');
console.log(JSON.stringify(a11y, null, 2));

// Performance metrics on homepage
const perf = await page.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0];
  const paint = performance.getEntriesByType('paint');
  const r = performance.getEntriesByType('resource');
  return {
    timing: {
      ttfb: Math.round(nav.responseStart - nav.requestStart),
      fcp: Math.round(paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0),
      domReady: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
      fullLoad: Math.round(nav.loadEventEnd - nav.startTime),
    },
    resources: {
      total: r.length,
      totalSize: r.reduce((s, x) => s + (x.transferSize || 0), 0),
      scripts: r.filter(x => x.initiatorType === 'script').length,
      styles: r.filter(x => x.initiatorType === 'css' || x.name.endsWith('.css')).length,
      images: r.filter(x => x.initiatorType === 'img' || x.name.match(/\.(png|jpg|jpeg|gif|webp|avif|svg)/)).length,
      fonts: r.filter(x => x.name.match(/\.(woff|woff2|ttf|otf)/)).length,
      largest: r.sort((a, b) => (b.transferSize || 0) - (a.transferSize || 0)).slice(0, 5)
        .map(x => ({ name: x.name.split('/').pop().substring(0, 50), size: x.transferSize, type: x.initiatorType }))
    }
  };
});
console.log('\n=== PERFORMANCE ===');
console.log(JSON.stringify(perf, null, 2));

// Run a11y on all other pages too
const allA11y = {};
for (const pg of PAGES.slice(1)) {
  await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.1/axe.min.js' });
  await page.waitForTimeout(2000);
  const results = await page.evaluate(async () => {
    const res = await axe.run();
    return {
      violations: res.violations.map(v => ({
        id: v.id, impact: v.impact, desc: v.description,
        count: v.nodes.length,
        targets: v.nodes.slice(0, 3).map(n => n.target.join(' '))
      })),
      passes: res.passes.length
    };
  });
  allA11y[pg.name] = results;
  console.log(`✓ a11y: ${pg.name} — ${results.violations.length} violations`);
}
console.log('\n=== ALL PAGE A11Y ===');
console.log(JSON.stringify(allA11y, null, 2));

await browser.close();
console.log('\nDone.');
