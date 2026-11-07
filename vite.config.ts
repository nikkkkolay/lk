import {copyFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';

import {defineConfig, type Plugin} from 'vite';
import react from '@vitejs/plugin-react';

/**
 * GitHub Pages отдаёт 404.html для любого неизвестного пути.
 * Копируем туда index.html, чтобы клиентский роутер сам разобрал маршрут.
 */
function spaFallback(): Plugin {
    let outDir = 'dist';

    return {
        name: 'spa-fallback',
        apply: 'build',
        configResolved(config) {
            outDir = config.build.outDir;
        },
        closeBundle() {
            const index = join(outDir, 'index.html');
            if (existsSync(index)) {
                copyFileSync(index, join(outDir, '404.html'));
            }
        },
    };
}

export default defineConfig({
    // Репозиторий называется lk, поэтому сайт живёт по адресу /lk/.
    base: '/lk/',
    plugins: [react(), spaFallback()],
    server: {
        port: 5173,
        host: true,
    },
});
