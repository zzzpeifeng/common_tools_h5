// src/vite-env.d.ts

// vite2为src/env.d.ts，vite3已改为src/vite-env.d.ts

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_API_BASE_URL: string;
    readonly VITE_BUILD_SOURCEMAP: string;
    readonly VITE_BUILD_DROP_CONSOLE: string;
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
