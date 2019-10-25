var path = require('path');

let distPath = path.join(__dirname, "/dist"),
    clientPath = path.join(__dirname, "/client");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  context: clientPath,
  entry: "./index.tsx",

  output: {
    filename: "app.js",
    path: distPath,
  },

  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".mjs", ".js", ".scss"]
  },

  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          sourceMap: true,
          useCache: true,
        }
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        enforce: "pre",
        exclude: [
          // This module's sourcemaps seem to be fucked up
        	/node_modules\/graphql-request/g,
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader", options: { sourceMap: true }
        }, {
          loader: "sass-loader", options: { sourceMap: true }
        }]
      },
    ]
  },

  devServer: {
    inline: true,
    contentBase: distPath,
    compress: true,
    port: 9000,
    historyApiFallback: {
      index: 'index.html'
    },
  }
}
