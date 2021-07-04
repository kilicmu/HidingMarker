import path from 'path';
import ts from "rollup-plugin-typescript2"
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import eslint from '@rollup/plugin-eslint';
import alias from '@rollup/plugin-alias';
import replace from "@rollup/plugin-replace"
import merge from 'lodash.merge';
import serve from 'rollup-plugin-serve';
import pkg from './package.json';
import livereload from "rollup-plugin-livereload";

const extensions = ['.js', '.ts'];

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

const configs = {
  umd: {
    output: {
      format: 'umd',
      file: resolve(pkg.main),
      name: pkg.name,
      sourcemap: true,
    },
    plugins: [
      serve({
        open: true,
        openPage: '/public/index.html',
        port: 3000,
        contentBase: [resolve('public'), resolve('dist')],
      }),
      livereload(),
    ],
  },
  min: {
    output: {
      format: 'umd',
      file: resolve(pkg.main.replace(/(.\w+)$/, '.min$1')),
      name: pkg.name,
    },
    plugins: [uglify()],
  },
};

const currentConfig = configs[process.env.FORMAT || 'umd'];

const config = merge(
  {
    input: resolve('./src/index.ts'),
    plugins: [
      // eslint({fix: true, include: 'src/**/*.ts'}),
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
      // getBabelOutputPlugin({
      //   configFile: path.join(__dirname, 'babel.config.js'),
      //   allowAllFormats: true
      // }),
      ts({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      // babel({
      //   exclude: 'node_modules/**',
      //   extensions
      // }),
      alias({
          entries: [
              {find: 'src', replacement: path.resolve(__dirname, './src')},
              {find: 'utils', replacement: path.resolve(__dirname, './src/utils')},
              {find: 'lib', replacement: path.resolve(__dirname, './src/lib')}
          ]
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      
    ],
  },
  currentConfig,
);

module.exports = config;