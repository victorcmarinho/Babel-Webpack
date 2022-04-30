const path = require("path"); // Tradutor de caminho para o sistema operacional
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: process.env.NODE_ENV, // Modo de compilação development ou production
  devtool: isDevelopment ? "eval-source-map" : "source-map", // Mapa de código original para debugger
  entry: path.resolve(__dirname, "src", "index.tsx"), // Arquivo principal para ser compiladp
  output: {
    path: path.resolve(__dirname, "dist"), // Resultado da compilação
    filename: "bundle.js", // Nome do arquivo compilado
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Extensões de arquivos que iram ser compilado
  },
  devServer: {
    // Live reload configuration webpack-dev-serve
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 8080,
    hot: true, // Hot reload
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(), // Hot reload
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public", "index.html"), // Injeção do script no arquivo HTML principal
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        }, // Utilização do babel para compilar código Javascript para o navegador
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"], // Loader de CSS e SASS
      },
    ],
  },
};
