# Contents

- [Webchat](https://github.com/Cognigy/Clients/tree/master/packages/webchat)
  - [Webchat Plugins (React)](https://github.com/Cognigy/Clients/tree/master/packages/webchat/src/plugins)
    - [Input Plugins](https://github.com/Cognigy/Clients/tree/master/packages/webchat/src/plugins/input)
    - [Message Plugins](https://github.com/Cognigy/Clients/tree/master/packages/webchat/src/plugins/message)
  - [Webchat UI (React)](https://github.com/Cognigy/Clients/tree/master/packages/webchat/src/webchat-ui)

# Introduction

This repository contains multiple packages. They are in subfolders of `./packages/`.
These packages have cross-references to each other. Yarn's `workspaces` feature is used to link them automatically.

If you don't have `yarn` yet, you can install it via npm.
```
npm i -g yarn
```

## Installing dependencies
To install dependencies (and cross-links) for the packages, run `yarn -i` in the project root folder.

## Building
To build (and bundle) the packages, run `yarn build`.

# Plugins

With Cognigy 3.3 you have the ability to develop custom plugins for your specific use case, such as a flight seat picker to let your user check in his/her flight directly in the webchat. 

[Take a look at our built-in plugins!](https://github.com/Cognigy/Clients/tree/master/packages/webchat/src/plugins/message)