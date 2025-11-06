import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // این خط به Vite می‌گوید که آدرس نهایی سایت شما
  // در یک زیرپوشه به نام /proguard-site/ خواهد بود.
  base: "/proguard-site/", 
  plugins: [react()],
})
