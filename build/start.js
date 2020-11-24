const childProcess = require("child_process");
// electron
const command = require("electron");
// webpack
const webpack = require("webpack");
// configuration
const electron = require("./webpack.electron.config");
const renderer = require("./webpack.renderer.config");

const env = "development";
const ElectonCompiler = webpack(electron(env));
const RendererCompiler = webpack(renderer(env));

let electronStarted = false;
// watcher
const RendererWatcher = RendererCompiler.watch({}, () => { });

const ElectonWatcher = ElectonCompiler.watch({}, (err, stats) => {
  if (!err && !stats.hasErrors() && !electronStarted) {
    electronStarted = true;

    childProcess
      .spawn(command, ["."], { stdio: "inherit" })
      .on("close", () => {
        RendererWatcher.close();
        ElectonWatcher.close();
      });
  }
});
