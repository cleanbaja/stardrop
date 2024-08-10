import { VitePWA } from 'vite-plugin-pwa'
import Unfonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
 
    Unfonts({
      google: {
        families: ['Varela Round', 'Open Sans', 'Inter'],
      }
    }),

    VitePWA({
      registerType: 'prompt',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'stardrop',
        short_name: 'stardrop',
        description: 'seamless p2p file transfers',
        theme_color: '#1e3f5a',
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })
  ],
})