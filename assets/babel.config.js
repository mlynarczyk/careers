// https://babeljs.io/docs/en/config-files#monorepos
module.exports = function(api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { flow: false, typescript: true }],
  ];

  const plugins = [
    // https://github.com/zeit/next.js/issues/4068#issuecomment-485014513
    // https://github.com/zeit/next.js/issues/4068#issuecomment-382298624
    ['styled-components', { ssr: true }],
  ];

  return {
    presets,
    plugins,
  };
};
