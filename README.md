# DSH Amadeus Skin

[中文](README.zh-CN.md) · A local DeepSeek Harness (DSH) web theme bundle, independent of the Amadeus workbench.

> **Artwork rights:** The Amadeus image comes from [Yink/Amadeus](https://github.com/Yink/Amadeus). Its original provenance and redistribution permission have not been verified. No authorization is claimed or guaranteed. Verify rights before publishing, redistributing or using it. See [ASSETS.md](ASSETS.md). The MIT license applies to code, not third-party artwork; the generated `client.js` embeds that image.

## Features

- Dark crimson, black and warm gold palette, plus a light wine-colored palette; dark mode is recommended.
- Theme token overrides for text, backgrounds, code syntax, links and buttons; static terminal ornaments and Amadeus marks in the sidebar, new-session welcome area and composer.
- Does not read chat content or change the model; the decorations are static, not status indicators. No network is required by the skin.

## Local installation

1. Obtain this directory locally and ensure Node.js is available for building/testing. This is a local DSH bundle, not an npm publication: the name remains `@local/dsh-amadeus-skin` and `private` is `true`.
2. In DSH, ask the agent to install the bundle from the **absolute path to this directory**, using the plugin manager's `install_bundle` operation. Installation changes the current DSH profile; do not manually edit profile files. If an existing bundle has the same package name, decide whether to replace it first.
3. Enable the bundle/plugin if necessary and choose dark mode in Appearance. Check the plugin manager's application result; an installed entry alone does not prove it is active. Replacing already loaded modules may require restarting DSH.
4. Disable or uninstall the bundle to remove its overrides and decorations. Other active themes can also affect the resulting appearance.

## Compatibility and limitations

Designed for the DSH web client with its theme, conversation and sidebar services/slots. No minimum or maximum DSH version has been established; future changes may break it. Some `--shiki-token-*` and activity/focus variables rely on current implementation details, not stable public tokens. Shared tokens can affect other components and override another theme; non-themed components or layouts may retain defaults. Light-mode message and code surfaces use warm colors; dark surface values follow the version this skin was built against. Test actual rendering, interactions and contrast in your DSH version; automated tests are not visual or accessibility certification.

## Build and test

From this directory with Node.js (no package installation required):

```sh
npm run build
npm test
```

The build embeds `amadeus-logo.png` into `client.js` from `client.source.js`; rebuild after changing either. The tests exercise registration and cleanup, token values, and selected static contrast ratios in a simulated environment. They do not verify a running DSH UI.

## License

Code: [MIT](LICENSE). Artwork: separately subject to its rights holders and the uncertainties in [ASSETS.md](ASSETS.md).
