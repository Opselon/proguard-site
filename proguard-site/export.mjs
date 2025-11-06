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
  const finalHtml = originalHtml
    .replace(/href="\/style.css"/g, 'href="./style.css"')
    .replace(/src="\/assets\//g, 'src="./assets/');
  
  // 4. نوشتن فایل نهایی index.html
  await fs.writeFile(path.join(DIST_DIR, 'index.html'), finalHtml);
  console.log('✅ Generated index.html');

  // 5. کپی کردن تمام فایل‌های استاتیک از مسیرهای صحیح
  await fs.copy('src/assets', path.join(DIST_DIR, 'assets'));
  // --- این خط اصلاح شده است ---
  await fs.copy('style.css', path.join(DIST_DIR, 'style.css')); 
  // ---------------------------
  console.log('✅ Copied all static assets.');

  console.log('Static export completed successfully!');
}

exportSite().catch(error => {
  console.error('Export failed:', error);
  process.exit(1);
});
