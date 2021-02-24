import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: 'Input Mono, Fira-Code, monospace',
      },
    },
  },
})
