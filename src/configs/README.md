The configuration for each tool in this directory run on their own processes,
the flags chosen in the CLI will be passed through the `TEMP_BORELA_JS_TOOLBOX`
env variable as a JSON string.

The `toolbox.js` file loads the flags in sequence from:

* Env variables following the format `BORELA_JS_TOOOBOX_{flag}`. For example:
  * `BORELA_JS_TOOLBOX_JSX`;
  * `BORELA_JS_TOOLBOX_REACT`;
* `package.json` file;
* `borelarc` file;
* `borela.json` file;
* `TEMP_BORELA_JS_TOOLBOX` env variable.
