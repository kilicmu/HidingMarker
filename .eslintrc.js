const path = require('path');

module.exports = {
    root: true,
    extends: "airbnb", //npx install-peerdeps --dev eslint-config-airbnb //使用airbnb规则
    parser: "@typescript-eslint/parser", // 指定一个paser，将源代码转换为抽象语法树
    parserOptions: {
       project: path.resolve(__dirname, './tsconfig.json'),
       tsconfigRootDir: __dirname,
       ecmaVersion: 2019,
       sourceType: 'module'
    },
    env: {
        browser: true,
    },
    rules: {
        indent: ['warn', 2],
        'no-console': 'off',
        'no-unused-vars': 'warn',
        'no-param-reassign': 'off',
        'class-methods-use-this': 'off',
        'no-debugger': 'off',
        'no-undef': 'off',
        'no-underscore-dangle': 'off',
        semi: ['warn', 'never'],
        'func-names': 'off',
        'max-classes-per-file': 'off',
        'no-new-func': 'off',
        'no-plusplus': 'off',
        'max-len': ['error', 80],
      },
}