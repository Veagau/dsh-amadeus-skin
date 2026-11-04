# DSH Amadeus Skin

![Amadeus Skin cover](docs/skin-cover.png)

[简体中文](README.zh-CN.md)

A local DeepSeek Harness (DSH) web theme bundle, independent of the Amadeus workbench.

> **Artwork rights:** The Amadeus image is sourced from [Yink/Amadeus](https://github.com/Yink/Amadeus), but its provenance and permission to use or redistribute are unverified. No authorization is claimed or guaranteed; verify rights before use or distribution. The MIT code license does not cover third-party artwork, which is also embedded in `client.js`. See [ASSETS.md](ASSETS.md).

## Features

- Dark crimson, black and warm gold palette; light wine-colored palette also available. Dark mode is recommended.
- Theme overrides for text, backgrounds, code syntax, links and buttons, with static terminal ornaments and Amadeus marks in the sidebar, welcome area and composer.
- Does not read chat content, change the model or require a network connection. Decorations are not status indicators.

## Installation

1. Obtain this directory locally. The bundle is private (`@local/dsh-amadeus-skin`), not an npm publication.
2. In DSH, ask the agent to install the bundle using the plugin manager's `install_bundle` operation and the **absolute path to this directory**. Installation changes the current profile; decide whether to replace an existing bundle with the same name first.
3. Enable the bundle and plugin if necessary, then select dark mode in Appearance. Check the plugin manager's application result; installation alone does not guarantee activation. Replacing loaded modules may require a DSH restart.
4. To remove the skin, disable or uninstall the bundle. Other active themes may affect its appearance.

## Build and test

Node.js is required; no package installation is needed. From this directory:

```sh
npm run build
npm test
```

Rebuild after changing `client.source.js` or `amadeus-logo.png`: the build generates `client.js` with the image embedded. Tests run in a simulated environment and do not verify the live UI.

## Compatibility

Designed for the DSH web client. No supported version range has been established; future DSH changes may break the skin. Some theme variables depend on implementation details, and shared tokens can affect other components or themes. Check rendering, interactions and contrast in your DSH version; automated tests are not visual or accessibility certification.

## Screenshots

Dark conversation view (account and usage details cropped):

![Dark Amadeus theme in the conversation view](docs/theme-dark.png)

Activity indicator:

![Themed activity indicator](docs/theme-activity.png)

## License

Code: [MIT](LICENSE). Artwork rights are separate; see [ASSETS.md](ASSETS.md).
