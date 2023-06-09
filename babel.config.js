const path = require('path');

const pak = require('./package.json');

module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [pak.name]: path.join(__dirname, '..', 'src/index.tsx'),
          '@components': './src/components/',
          '@colors': './src/shared/colors.ts',
          '@screens': './src/screens/',
          '@model': './src/model/',
          '@utils': './src/shared/utils.ts',
          '@assets': './assets/',
        },
      },
    ],
    ['module:react-native-dotenv'],
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },
    ],
  ],
};