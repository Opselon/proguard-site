import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // نقشه راه ۱: به Vite می‌گوییم ریشه سایت شما کجاست (جایی که index.html قرار دارد)
  root: 'src',

  // نقشه راه ۲: آدرس نهایی سایت در گیت‌هاب
  base: '/proguard-site/',

  build: {
    // نقشه راه ۳: به Vite می‌گوییم پوشه build شده (dist) را کجا قرار دهد
    // (یک پوشه بالاتر از ریشه، یعنی در proguard-site/dist)
    outDir: '../dist',
    emptyOutDir: true, // همیشه قبل از بیلد، پوشه dist را خالی کن
  },

  plugins: [react()],
})
