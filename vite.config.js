import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {quasar, transformAssetUrls} from '@quasar/vite-plugin'
import {viteMockServe} from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
    plugins: [
        vue({
            template: {transformAssetUrls}
        }),
        viteMockServe({
            mockPath: './mock',  // mock文件存放的位置
            localEnabled: mode === 'mock' //在开发环境中启用 mock
        }),
        quasar({})
    ]
}))
