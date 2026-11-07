import {writeFileSync} from 'node:fs';
import {join} from 'node:path';

import {defineConfig, type Plugin} from 'vite';
import react from '@vitejs/plugin-react';

/**
 * GitHub Pages не поддерживает серверный rewrite, поэтому любой «красивый» путь
 * отдаётся с HTTP-статусом 404. Для приложения это ломает пересылку ссылок:
 * мессенджеры и встроенные браузеры видят 404 и не показывают страницу.
 *
 * Поэтому роутинг переведён на хеш (см. src/main.tsx), а этот плагин генерирует
 * 404.html с редиректом: старые ссылки вида /lk/study/gradebook продолжают
 * работать и превращаются в /lk/#/study/gradebook.
 */
function spaFallback(): Plugin {
    let outDir = 'dist';
    let base = '/';

    return {
        name: 'spa-fallback',
        apply: 'build',
        configResolved(config) {
            outDir = config.build.outDir;
            base = config.base;
        },
        closeBundle() {
            const html = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Личный кабинет обучающегося — МАУ</title>
    <script>
      // Превращаем /lk/study/gradebook в /lk/#/study/gradebook.
      (function () {
        var base = ${JSON.stringify(base)};
        var rest = window.location.pathname.slice(base.length - 1) || '/';
        var hash = window.location.hash.replace(/^#/, '');

        if (hash.charAt(0) === '/') {
          rest = hash;
        } else if (rest.indexOf('/404.html') === 0) {
          rest = '/';
        }

        if (rest.charAt(0) !== '/') {
          rest = '/' + rest;
        }

        window.location.replace(base + '#' + rest + window.location.search);
      })();
    </script>
  </head>
  <body>
    <p>Перенаправление… <a href="${base}">Открыть личный кабинет</a></p>
  </body>
</html>
`;

            writeFileSync(join(outDir, '404.html'), html);
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
