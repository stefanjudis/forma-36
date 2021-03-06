const path = require('path');
const postcss = require('rollup-plugin-postcss');
const svgr = require('@svgr/rollup').default;
const url = require('@rollup/plugin-url');

const filenameMatcher = /^src\/(.+)(\..+)$/;

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config) {
    const outputDir = process.cwd() + '/dist/';

    const [, inputFilename] = config.input.match(filenameMatcher);

    config.plugins = [
      postcss({
        config: {
          path: path.resolve(__dirname, './tools/postcss.config.js'),
        },
        minimize: true,
        modules: true,
        extract: 'styles.css',
      }),
      url(),
      svgr({
        ref: true,
      }),
      ...config.plugins,
    ];

    // Manual name changes. Not great...
    if (inputFilename === 'alpha') {
      const outputFile = config.output.file;
      const outputSubDir = `${outputDir}${inputFilename}/`;
      config.output.file = outputFile.replace(outputDir, outputSubDir);
    }

    return config;
  },
};
