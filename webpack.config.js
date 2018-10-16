const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        exclude: [path.resolve(__dirname, "node_modules/excalibur")],
        enforce: "pre"
      },
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.(png|jpg|bmp|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              emitFile: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "index.html",
        context: "src"
      }
    ])
  ]
};
