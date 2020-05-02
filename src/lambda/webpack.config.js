const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    graphql: "./src/lambda/graphql.ts"
  },
  output: {
    path: path.resolve(__dirname, "../../built-lambda"),
    filename: "[name].js",
    libraryTarget: "commonjs"
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    node: 12
                  }
                }
              ],
              "@babel/preset-typescript"
            ]
          }
        }
      }
    ]
  },
  resolve: { extensions: [".mjs", ".js", ".ts"] },
  target: "node"
};
