# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 1.7.1

- 3220a83 [Fix] Mute keybindings when role=textbox (fixes [#51](https://github.com/glortho/react-keydown/issues/51))

## 1.7.0

- [abdd314](https://github.com/glortho/react-keydown/commit/abdd314f07fab3a6980033cd5c5ad74b9ea534df) [Feature] Add native es modules build (fixes [#47](https://github.com/glortho/react-keydown/issues/47))

## 1.6.9

- [83df6fd](https://github.com/glortho/react-keydown/commit/83df6fd9569f9307e7568ba3ca267903258f417d) [Fix] Prevent double firing of onKeyDown handlers when one of the bindings already has a ctrl modifier (which fires in text fields already)

## 1.6.7

- [b015d8b](https://github.com/glortho/react-keydown/commit/b015d8b4441f87c6ecc9729a1691ed7670381cde) [Fix] Better Symbol type checking. Thank you @AntonovAv (fixes #42).

## 1.6.5

- [f6c6c01](https://github.com/glortho/react-keydown/commit/f6c6c0178288a20d0539b3dbd9cefb244a8ba98f) [Feature] Patch feature: add "delete" and "del" as aliases to key code 46. 
- [3870148](https://github.com/glortho/react-keydown/commit/3870148c9bd1ba05dcb19ee1fa0103e919a564c8) [Fix] Return values from decorated methods (fixes #35)
- [f694b33](https://github.com/glortho/react-keydown/commit/f694b33f5c9ff97fabf09e6019420727a46bde4b) [Fix] Use window.KeyboardEvent instead of just KeyboardEvent for better
  clarity and testability with jsdom. (fixes #35)

## 1.6.3

- [7f322a5](https://github.com/glortho/react-keydown/commit/7f322a50735b84649b2460402afe325928e154f2) [Fix] Use Array.from polyfill (fixes #29 and #33)
- [065f313](https://github.com/glortho/react-keydown/commit/065f3139f736b7799d0c4f2f98fc3d37172ae52b) [Maintenance] Switching to Yarn

## 1.6.2

- [146920a](https://github.com/glortho/react-keydown/commit/1253776a3d8d299c78ccfbd43d1413311146920a) [Fix] Avoid transpilation to Array.from (thanks to [@elyobo](http://github.com/elyobo) for pr [#27](https://github.com/glortho/react-keydown/pull/27))
- [3a6821f](https://github.com/glortho/react-keydown/commit/a672753926ecd7e7b2232cab49e9804a23a6821f) [Fix] Do not use Array.fill in order to maximize compatibility with IE (thanks to [@elyobo](http://github.com/elyobo) for pr [#26](https://github.com/glortho/react-keydown/pull/26))

## 1.6.1

- [f3a8ed0](https://github.com/glortho/react-keydown/commit/e0cfb05832233a141a1c5cb1da45829449e6a71b) [Fix] 1.6.0 introduced a bug wherein a decorated method would not fire when called programmatically.
- [8aa893f](https://github.com/glortho/react-keydown/commit/0d4d6cdf7488fd4aa44dcea7b5e11b0178aa893f) [Maintenance] Switch to simple indices rather than uuids (fixes [#19](https://github.com/glortho/react-keydown/issues/19) via pr [#24](https://github.com/glortho/react-keydown/pull/24) from [@jeffijoe](https://github.com/jeffijoe))

## 1.6.0

- [e0cfb05](https://github.com/glortho/react-keydown/commit/e0cfb05832233a141a1c5cb1da45829449e6a71b) [Feature] Add experimental support for using the @keydown method decorator as a filter for handlers bound via onKeyDown to input, textarea, etc.

## 1.5.0

- [91209b0](https://github.com/glortho/react-keydown/commit/160b8944abac0224893e2178c961b5e91209b0c2) [Feature] Add function key codes

## 1.4.9

- [6d00ef9](https://github.com/glortho/react-keydown/commit/6d00ef98a0ed1d66f6ab39c156d2314a06505b81) [Fix] Correct version typo for react-dom in package.json (fixes [#21](https://github.com/glortho/react-keydown/issues/21))

## 1.4.8

- [025e549](https://github.com/glortho/react-keydown/commit/bb06f1816709093822d57a92d1dc5dd9f025e549) [Fix] Use UUIDs as keys in the bindings map rather than the prototypes themselves,
  to address HMR issues in webpack (see #16)

## 1.4.7

- React >= 0.14.0 rather than ^0.14.0

## 1.4.6

- [8626078](https://github.com/glortho/react-keydown/commit/6ceecce53693fd8296449996e7cee6ed18626078) [Feature] Add esc key

## 1.4.5

- Wrong react version dependency was cached.

## 1.4.4

- [8c00bb2](https://github.com/glortho/react-keydown/commit/39c2c39e8d97b393600cb8d5c40cb212f8c00bb2) [Fix] Use proper es6 module import syntax

## 1.4.1

- [7fb3e85](https://github.com/glortho/react-keydown/commit/d194044e2b0a46098f143fd6e29e649137fb3e85) [Fix] Add uppercase version of special keys back in for backwards compatibility

## 1.4.0

- [699f42c](https://github.com/glortho/react-keydown/commit/6ba2cc37258f84ff56faa943a75107e81699f42c) [Dependency Update] Switch to [react-dom](https://www.npmjs.com/package/react-dom) for full
  compatibility with React 0.14+. (Breaking SemVer just slightly for the sake of version parity.)
- [ac8fb21](https://github.com/glortho/react-keydown/commit/ca3eedc3084518e63051ec8b5b9b0a3a8ac8fb21) [Fix] Fix scoping problems introduced in last major code reorganization that meant some mounted instance would always receive keydown events.

## 1.3.7

- [d1453b5](https://github.com/glortho/react-keydown/commit/662d982379f6a9d0751419d647f7f522cd1453b5) [Fix] Add node check to safeguard against unmounted components when looking for ancestors of click event targets.

## 1.3.6

- [ec0bff2](https://github.com/glortho/react-keydown/commit/e4ba5a5f862ff0830bb3de9210f25dac0ec0bff2) [Fix] Re-export `Keys` lib after reorganization.
- [1b93de3](https://github.com/glortho/react-keydown/commit/c06e104f0ffa2b283487d3bcef439ceb01b93de3) [Maintenance] Reorganize code to be more coherent/modular/maintainable.
- [301f4e4](https://github.com/glortho/react-keydown/commit/8f691582c771677902b9c6a4ed27fc05e301f4e4) [Maintenance] Write preliminary reference documentation.
- [79af533](https://github.com/glortho/react-keydown/commit/c87eb4527cd2aa3284e1ce56262370f3779af533) [Feature] Add support for more alphanumeric keys.
- [c46805e](https://github.com/glortho/react-keydown/commit/5856838150e6fd0b62d40d157cdec2b72c46805e) [Maintenance] Move compile task into script to more easily manage different builds for umd vs. commonjs-only (default).

## 1.3.5

- Running `npm run compile` no longer builds for UMD by default. AMD users
  should use the [umd-specific branch of
  master](https://github.com/glortho/react-keydown/tree/master-umd) instead.
  See [pr#7](https://github.com/glortho/react-keydown/pull/7) for reference.

