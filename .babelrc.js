const { extendDefaultPlugins } = require('svgo');

module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: [
    '@emotion/babel-plugin',
    [
      'inline-react-svg',
      {
        svgo: {
          plugins: extendDefaultPlugins([
            {
              name: 'mergePaths',
              active: false,
            },
            {
              name: 'cleanupIDs',
              active: false,
            },
          ]),
        },
      },
    ],
  ],
};
