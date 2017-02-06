## Outputing CSS in development

After cloning project run to install dependencies

> npm install

Run the required tasks on the command line 'e.g. gulp css-process-dev'

- sass-process (process sass to css)
- less-process (process less to css)
- css-compress (compress css file)
- css-prefix (autoprefix css file)
- css-sourcemap (addition of source map inline to css file to help debugging)
- sass-process-prod (for production runs following [sass-process,css-compress,css-prefix])
- sass-process-dev (for development runs following [sass-process,css-compress,css-prefix,css-sourcemap])
- sass-watch-dev (adds watcher to the main sass file and runs sass-process-dev task)
- sass-watch-prod (adds watcher to the main sass file and runs sass-process-prod task)
- less-process-prod (for production runs following [less-process,css-compress,css-prefix])
- less-process-dev (for development runs following [less-process,css-compress,css-prefix,css-sourcemap])
- less-watch-dev (adds watcher to the main less file and runs less-process-dev task)
- less-watch-prod (adds watcher to the main less file and runs less-process-prod task)