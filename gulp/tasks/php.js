export const php = () =>{
	return app.gulp.src(app.path.src.php, { sourcemaps: app.isDev })
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "PHP",
			message: "Error: <%= error.message %>"
		})
	))
	.pipe(app.gulp.dest(app.path.build.php))
	.pipe(app.plugins.browsersync.stream());
}