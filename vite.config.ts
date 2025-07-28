import { defineConfig } from 'vite'
         import react from '@vitejs/plugin-react'

         export default defineConfig({
           base: '/SmartWeight/', // 👈 This fixes white screen issue
           plugins: [react()],
         })