import fs from 'fs-extra';
import path from 'path';
import worker from './src/index.mjs'; // سرور ورکر شما را وارد می‌کنیم

const DIST_DIR = 'dist';

async function exportSite() {
  console.log('Starting static export process...');

  // 1. اطمینان از وجود پوشه خروجی تمیز
  await fs.emptyDir(DIST_DIR);

  // 2. شبیه‌سازی یک درخواست به سرور ورکر برای گرفتن HTML
  const request = new Request('http://localhost/');
  const response = await worker.fetch(request, {});
  const originalHtml = await response.text();

  // 3. اصلاح مسیرهای فایل‌ها برای سازگاری با GitHub Pages
  // این کار مسیرهای مطلق مانند "/assets/style.css" را به مسیرهای نسبی "./assets/style.css" تبدیل می‌کند
  const finalHtml = originalHtml
    .replace(/href="\/assets\//g, 'href="./assets/')
    .replace(/src="\/assets\//g, 'src="./assets/');
  
  // 4. نوشتن فایل نهایی index.html
  await fs.writeFile(path.join(DIST_DIR, 'index.html'), finalHtml);
  console.log('✅ Generated index.html');

  // 5. کپی کردن **تمام** محتویات پوشه assets (که شامل style.css هم می‌شود)
  await fs.copy('src/assets', path.join(DIST_DIR, 'assets'));
  console.log('✅ Copied entire assets directory.');

  console.log('Static export completed successfully!');
}

exportSite().catch(error => {
  console.error('Export failed:', error);
  process.exit(1);
});
