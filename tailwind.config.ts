import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: 'class',
  shortcuts: {
    'gray-border': 'border border-gray-200 dark:border-gray-600 outline-none'
  }
})
