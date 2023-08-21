import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ insertTypesEntry: true })],
  build: {
    lib: {
      entry: 'src/main.ts',
      name: "interactive-elastic-react",
      formats: ['es', "umd"]
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@tanstack/react-query'
      ],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDom',
          '@tanstack/react-query': "ReactQuery",
          'react/jsx-runtime': 'react/jsx-runtime',
        }
      }
    }
  }
})
