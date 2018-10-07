Files in this directory will run on a different process, the flags chosen in
the CLI will be passed through the `TEMP_BORELA_JS_TOOLBOX` env variable as a
JSON string.

The `toolbox-settings.js` file loads the settings in sequence from:

* `package.json` file;
* `borelarc` file;
* `borela.json` file;
* `TEMP_BORELA_JS_TOOLBOX` env variable which contains the settings passed
  directly to the CLI.
