# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 1.4.6

- [8626078](https://github.com/glortho/react-keydown/commit/6ceecce53693fd8296449996e7cee6ed18626078) [Feature] Add esc key

## 1.4.5

- Wrong react version dependency was cached.

## 1.4.4

- [8c00bb2](https://github.com/glortho/react-keydown/commit/39c2c39e8d97b393600cb8d5c40cb212f8c00bb2) [Fix] Use proper es6 module import syntax

## 1.4.1

- [7fb3e85](https://github.com/jedverity/react-keydown/commit/d194044e2b0a46098f143fd6e29e649137fb3e85) [Fix] Add uppercase version of special keys back in for backwards compatibility

## 1.4.0

- [699f42c](https://github.com/jedverity/react-keydown/commit/6ba2cc37258f84ff56faa943a75107e81699f42c) [Dependency Update] Switch to [react-dom](https://www.npmjs.com/package/react-dom) for full
  compatibility with React 0.14+. (Breaking SemVer just slightly for the sake of version parity.)
- [ac8fb21](https://github.com/jedverity/react-keydown/commit/ca3eedc3084518e63051ec8b5b9b0a3a8ac8fb21) [Fix] Fix scoping problems introduced in last major code reorganization that meant some mounted instance would always receive keydown events.

## 1.3.7

- [d1453b5](https://github.com/jedverity/react-keydown/commit/662d982379f6a9d0751419d647f7f522cd1453b5) [Fix] Add node check to safeguard against unmounted components when looking for ancestors of click event targets.

## 1.3.6

- [ec0bff2](https://github.com/jedverity/react-keydown/commit/e4ba5a5f862ff0830bb3de9210f25dac0ec0bff2) [Fix] Re-export `Keys` lib after reorganization.
- [1b93de3](https://github.com/jedverity/react-keydown/commit/c06e104f0ffa2b283487d3bcef439ceb01b93de3) [Maintenance] Reorganize code to be more coherent/modular/maintainable.
- [301f4e4](https://github.com/jedverity/react-keydown/commit/8f691582c771677902b9c6a4ed27fc05e301f4e4) [Maintenance] Write preliminary reference documentation.
- [79af533](https://github.com/jedverity/react-keydown/commit/c87eb4527cd2aa3284e1ce56262370f3779af533) [Feature] Add support for more alphanumeric keys.
- [c46805e](https://github.com/jedverity/react-keydown/commit/5856838150e6fd0b62d40d157cdec2b72c46805e) [Maintenance] Move compile task into script to more easily manage different builds for umd vs. commonjs-only (default).

## 1.3.5

- Running `npm run compile` no longer builds for UMD by default. AMD users
  should use the [umd-specific branch of
  master](https://github.com/jedverity/react-keydown/tree/master-umd) instead.
  See [pr#7](https://github.com/jedverity/react-keydown/pull/7) for reference.

