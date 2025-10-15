const path = require("path");

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    files: [
      "src/test/setupTests.js",
      "src/test/**/*.spec.jsx"
    ],

    preprocessors: {
      "src/test/setupTests.js": ["webpack"],
      "src/test/**/*.spec.jsx": ["webpack"]
    },

    webpack: {
      mode: "development",
      context: path.resolve(__dirname, "src"),
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/i,
            type: "asset/resource",
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
        alias: {
          "@": path.resolve(__dirname, "src"),
        },
        modules: [path.resolve(__dirname, "src"), "node_modules"],
      },
    },

    reporters: ["progress", "kjhtml", "coverage"],

    coverageReporter: {
      type: "html",
      dir: "coverage/",
    },

    browsers: ["ChromeHeadless"],

    singleRun: true,
    restartOnFileChange: true,

    plugins: [
      "karma-jasmine",
      "karma-webpack",
      "karma-chrome-launcher",
      "karma-coverage",
      "karma-jasmine-html-reporter",
    ],
  });
};
