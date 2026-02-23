import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true });

async function forceVisible(pg) {
  await pg.evaluate(() => {
    document.querySelectorAll('.animate-reveal, .animate-reveal-left').forEach(el => {
      el.classList.add('is-visible');
    });
  });
  await pg.waitForTimeout(400);
}

// Check horizontal scroll on all pages
for (const path of ['/', '/projects', '/blog', '/contact']) {
  await page.goto(`http://localhost:4321${path}`, { waitUntil: 'networkidle' });
  await forceVisible(page);
  const info = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  const overflow = info.scrollWidth > info.clientWidth ? 'OVERFLOW' : 'OK';
  console.log(`${path}: ${info.scrollWidth}/${info.clientWidth} ${overflow}`);
}

// Test mobile nav after View Transition navigation
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

// Navigate to /projects via View Transition
await page.click('a[href="/projects"]');
await page.waitForTimeout(1000);

// Try to open mobile menu
const toggleBefore = await page.$('.nav__toggle');
console.log('Toggle found after nav:', !!toggleBefore);

await page.click('.nav__toggle');
await page.waitForTimeout(500);

const menuOpen = await page.evaluate(() => {
  const menu = document.querySelector('.mobile-menu');
  return menu?.classList.contains('is-open');
});
console.log('Mobile menu opens after navigation:', menuOpen);

await page.screenshot({ path: '/tmp/ifftu-mobile-nav-test.png' });

await browser.close();
