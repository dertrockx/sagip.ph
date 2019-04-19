const path = require('path');

const plugins = [
  'gatsby-plugin-sass',
  {
    resolve: 'gatsby-plugin-root-import',
    options: {
      '@common': path.join(__dirname, 'src/@common'),
      stylesheets: path.join(__dirname, 'src/stylesheets'),
      assets: path.join(__dirname, 'src/assets'),
    },
  },
  'gatsby-plugin-react-helmet',
];

module.exports = {
  siteMetadata: {
    title: 'sagip.ph',
  },
  plugins,
}
