// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
//Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаём значения в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
} 

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { js1 } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";
import { php } from "./gulp/tasks/php.js";

//Наблюдатель за изменениями
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
    gulp.watch(path.watch.php, php);
}

export { svgSprite };

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);


const maintTasks = gulp.series(fonts, gulp.parallel(copy, php, html, scss, gulp.series(js1, js), images)); 

// Построение сценариев выполнения задач
const dev = gulp.series(reset, maintTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset,maintTasks);
const deployZip = gulp.series(reset,maintTasks, zip);
const deployFTP = gulp.series(reset,maintTasks, ftp);

// Экспорт сценариев
export { dev };
export { build };
export { deployZip };
export { deployFTP };

// Выполнение сценария по умолчанию
gulp.task('default', dev);