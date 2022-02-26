module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
          throwIfNamespace: false,
        },
      },
    ],
  ],
  plugins: [
    '@emotion/babel-plugin',
  ],
};
