import 'windi.css'
import './styles/main.css'
import { ViteSSG } from 'vite-ssg'
import routes from 'pages-generated'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes },
  ({ app }) => {
    app.use(MotionPlugin)
  },
)
