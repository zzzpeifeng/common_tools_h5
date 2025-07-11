import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import AutoImport from 'unplugin-auto-import/vite';
// import viteVConsole from "vite-plugin-vconsole";
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite'
import viteVConsole from "vite-plugin-vconsole";
const pathResolve = (dir: string) => resolve(__dirname, dir);



export default defineConfig(({ mode }) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有
    // `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd(), '')
    return {
        // vue
        plugins: [
            vue(),
            tailwindcss(),
            // 默认会向 index.html 注入 .env 文件的内容，类似 vite 的 loadEnv函数
            // 还可配置entry入口文件， inject自定义注入数据等
            // 可以在html中插入VITE变量，如：<title><%- VITE_APP_TITLE %></title>
            createHtmlPlugin(),
            AutoImport({
                imports: ['vue', 'vue-router'],
                // 设置为在'src/'目录下生成解决ts报错，默认是当前目录('./'，即根目录)
                dts: 'src/auto-import.d.ts',
                // 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
                // 'vue-global-api'这个插件仅仅解决vue3 hook报错
                eslintrc: {
                    enabled: true,
                },
            }),
            viteVConsole({
                entry: pathResolve('src/main.ts'),
                localEnabled: true,
                enabled: env.VITE_BUILD_VCONSOLE === 'true',
                config: {
                    maxLogNumber: 1000,
                    theme: 'dark',
                },
            }),
        ],
        // 别名
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: resolve(__dirname, './src'),
                },
            ]
        },
        // vite 配置
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
            'process.env': env,
        },
        // vite.config.ts

        build: {
            outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
            sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
            // minify默认esbuild，esbuild模式下terserOptions将失效
            // vite3变化：Terser 现在是一个可选依赖，如果你使用的是 build.minify: 'terser'，你需要手动安装它 `npm add -D terser`
            minify: 'terser',
            terserOptions: {
                compress: {
                    keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
                    drop_console: env.VITE_BUILD_DROP_CONSOLE === 'true', // 去除 console
                    drop_debugger: true, // 去除 debugger
                },
            },
            chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
        },
    }
})