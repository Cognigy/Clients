# Introduction

This repository contains multiple packages. They are in subfolders of `./packages/`.
These packages have cross-references to each other. Yarn's `workspaces` feature is used to link them automatically.

If you don't have `yarn` yet, you can install it via npm.
```
npm i -g yarn  
```

# Contents

- [Webchat](./packages/webchat)
  - [Webchat Plugins (React)](./packages/webchat/src/plugins)
    - [Input Plugins](./packages/webchat/src/plugins/input)
    - [Message Plugins](./packages/webchat/src/plugins/message)
  - [Webchat UI (React)](./packages/webchat/src/webchat-ui)
  

## Installing dependencies
To install dependencies (and cross-links) for the packages, run `yarn -i` in the project root folder.

## Building
To build (and bundle) the packages, run `yarn build`.

# Plugins

With Cognigy 3.3 you have the ability to develop custom plugins for your specific use case, such as a flight seat picker to let your user check in his/her flight directly in the webchat.
To learn mor about developing Webchat Plugins, follow up on the [Plugin documentation](./docs/webchat-plugins/README.md)