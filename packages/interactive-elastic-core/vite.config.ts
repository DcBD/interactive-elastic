import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        cors: false
    },
    plugins: [dts({ insertTypesEntry: true })],
    build: {
        lib: {
            entry: 'src/main.ts',
            name: "interactive-elastic-core",
            formats: ['es', "umd"]
        },
        rollupOptions: {
            external: ['aws4fetch'],
            output: {
                globals: {
                    'aws4fetch': 'aws4fetch'
                }
            }
        }
    }
})
