import vue from '@vitejs/plugin-vue'

export default {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    },
    server: {
        proxy: {
            '/g4/auth': {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        }
    }
}
