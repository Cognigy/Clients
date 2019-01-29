# Introduction

This repository contains multiple packages. They are in subfolders of `./packages/`.
These packages have cross-references to each other. The tool `lerna` is used to link them automatically.

To get started, install lerna.
```
npm i -g lerna
```

Then, from the root folder of the repository, use `lerna bootstrap` to install the dependencies of any package ***and link them***.
This way, in package B, we can use the locally available package A by importing it like a regular node module with require/import.

To build all packages, run `lerna run build`. This will execute `npm run build` in every package.