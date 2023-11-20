import { log } from "console";
import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
	// Ищем файлы шрифтов otf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "FONTS",
			message: "Error: <%= error.message %>"
		})
	))
	// Конвертируем в ttf
	.pipe(fonter({
		formats: ['ttf']
	}))
	// Выгружаем в в исходную папку
	.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
	// Ищем файлы шрифтов ttf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "FONTS",
			message: "Error: <%= error.message %>"
		})
	))
	// Конвертируем в woff
	.pipe(fonter({
		formats: ['woff']
	}))
	// Выгружаем в папку с результатом
	.pipe(app.gulp.dest(`${app.path.build.fonts}`))
	// Ищем файлы шрифтов ttf
	.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {}))
	// Конвертируем в woff2
	.pipe(ttf2woff2())
	// Выгружаем в папку с результатом
	.pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontsStyle = () => {
	// Файл стилей подключения шрифтов
	let fontsFile = `${app.path.srcFolder}/scss/_fonts.scss`;
	// Проверяем существуют ли файлы шрифтов
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFile)  {
			// Проверяем существует ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				// Если файла нет создаём его
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (var i = 0; i < fontsFiles.length; i++) {
					// Записываем подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeght = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						if (fontWeght.toLowerCase() === 'thin') {
							fontWeght = 100;
						} else if (fontWeght.toLowerCase() === 'extralight') {
							fontWeght = 200;
						} else if (fontWeght.toLowerCase() === 'light') {
							fontWeght = 300;
						} else if (fontWeght.toLowerCase() === 'medium') {
							fontWeght = 500;
						} else if (fontWeght.toLowerCase() === 'semibold') {
							fontWeght = 600;
						} else if (fontWeght.toLowerCase() === 'bold') {
							fontWeght = 700;
						} else if (fontWeght.toLowerCase() === 'extrabold' || fontWeght.toLowerCase() === 'heavy') {
							fontWeght = 800;
						} else if (fontWeght.toLowerCase() === 'black') {
							fontWeght = 900;
						} else {
							fontWeght = 400;
						}
/*						fs.appendFile(fontsFile,
							`@font-face {
								font-family: ${fontName};
								font-display: swap;
								src: url("../fonts/${fontFileName}.woff2") format("woff2");
								font-weight: ${fontWeght};
								font-style: normal;
							}\r\n`, cb);
*/						//
						fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeght};\n\tfont-style: normal;\n}\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			} else {
				// Если файл есть выводим сообщение
				console.log("Файл scss/fonts.scss уже существует. Для обновления нужно его удалить");
			}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() {

	}
}