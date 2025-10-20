# Changelog

## [4.0.1](https://github.com/aimeerivers/watchthis-media-service/compare/v4.0.0...v4.0.1) (2025-10-20)


### Chores

* Update dependencies ([#35](https://github.com/aimeerivers/watchthis-media-service/issues/35)) ([325fc41](https://github.com/aimeerivers/watchthis-media-service/commit/325fc41468e5ca7334fd590a37147db9d4b62ef8))

## [4.0.0](https://github.com/aimeerivers/watchthis-media-service/compare/v3.0.0...v4.0.0) (2025-10-14)


### ⚠ BREAKING CHANGES

* Media Service now uses PostgreSQL instead of MongoDB. Please check and update accordingly.

### Features

* Switch to using PostgreSQL ([#32](https://github.com/aimeerivers/watchthis-media-service/issues/32)) ([3dc4a10](https://github.com/aimeerivers/watchthis-media-service/commit/3dc4a104732fa30872ad35a7ff90396e1a2a7a70))

## [3.0.0](https://github.com/aimeerivers/watchthis-media-service/compare/v2.0.0...v3.0.0) (2025-10-12)


### ⚠ BREAKING CHANGES

* Edit and delete functionality has been removed from Media Service

### Features

* Remove edit and delete capabilities from Media Service ([#30](https://github.com/aimeerivers/watchthis-media-service/issues/30)) ([b5b48e7](https://github.com/aimeerivers/watchthis-media-service/commit/b5b48e78e70e59c70b8bc66c00ff9d6f5ffc4bed))

## [2.0.0](https://github.com/aimeerivers/watchthis-media-service/compare/v1.0.6...v2.0.0) (2025-10-11)


### ⚠ BREAKING CHANGES

* Media Service API endpoints now require JWT authentication

### Features

* Add authentication middleware and require authentication to the API ([#27](https://github.com/aimeerivers/watchthis-media-service/issues/27)) ([84d0a8d](https://github.com/aimeerivers/watchthis-media-service/commit/84d0a8ddd3c171a4addc1580a349b0d3b1c98410))

## [1.0.6](https://github.com/aimeerivers/watchthis-media-service/compare/v1.0.5...v1.0.6) (2025-10-10)


### Bug Fixes

* Adding the same media twice should no longer give a 409 Conflict ([#25](https://github.com/aimeerivers/watchthis-media-service/issues/25)) ([dc713c1](https://github.com/aimeerivers/watchthis-media-service/commit/dc713c10a656ac21c226709a18c0e6bd001fd028))

## [1.0.5](https://github.com/aimeerivers/watchthis-media-service/compare/v1.0.4...v1.0.5) (2025-10-09)


### Chores

* Enable building and publishing a Docker image ([#23](https://github.com/aimeerivers/watchthis-media-service/issues/23)) ([3a03e37](https://github.com/aimeerivers/watchthis-media-service/commit/3a03e37953922152dbaaa25b1c85206f926ea537))

## [1.0.4](https://github.com/aimeerivers/watchthis-media-service/compare/v1.0.3...v1.0.4) (2025-09-21)


### Chores

* Update @tailwindcss/typography to 0.5.18 ([#21](https://github.com/aimeerivers/watchthis-media-service/issues/21)) ([5a0a53f](https://github.com/aimeerivers/watchthis-media-service/commit/5a0a53fc6e83123584af0d91f3b4a075ba840855))

## [1.0.3](https://github.com/aimeerivers/watchthis-media-service/compare/v1.0.2...v1.0.3) (2025-09-18)


### Chores

* Update dependencies ([#19](https://github.com/aimeerivers/watchthis-media-service/issues/19)) ([e3d0cff](https://github.com/aimeerivers/watchthis-media-service/commit/e3d0cff152112b474117673035ddc29db99bb84b))

## [1.0.2](https://github.com/aimeerivers/watchthis-media-service/compare/v1.0.1...v1.0.2) (2025-09-18)


### Continuous Integration

* Update Release Please to v4 ([#17](https://github.com/aimeerivers/watchthis-media-service/issues/17)) ([040f989](https://github.com/aimeerivers/watchthis-media-service/commit/040f9899048d7c97fca34555498749ff8ac61882))

## [1.0.1](https://github.com/aimeerivers/watchthis-media-service/compare/v1.0.0...v1.0.1) (2025-09-09)


### Bug Fixes

* Validate media URLs more carefully ([#14](https://github.com/aimeerivers/watchthis-media-service/issues/14)) ([bd24840](https://github.com/aimeerivers/watchthis-media-service/commit/bd2484097fed51d3b982aeedc57bbebe4a03d6f8))


### Chores

* Remove .eslintignore ([#11](https://github.com/aimeerivers/watchthis-media-service/issues/11)) ([68f443d](https://github.com/aimeerivers/watchthis-media-service/commit/68f443df17a799219f4befaea80f1e4491c20a7b))
* update caniuse-lite to version 1.0.30001741 ([#8](https://github.com/aimeerivers/watchthis-media-service/issues/8)) ([c394908](https://github.com/aimeerivers/watchthis-media-service/commit/c394908bcca522c2472f3579c1b6db64792fcf1d))

## 1.0.0 (2025-09-07)


### Features

* Add initial media service with CRUD operations and MongoDB integration ([#6](https://github.com/aimeerivers/watchthis-media-service/issues/6)) ([c650b09](https://github.com/aimeerivers/watchthis-media-service/commit/c650b090778573f4c77be6954983c7ac6d558923))


### Chores

* Rename project to "watchthis-media-service" and update related metadata ([#1](https://github.com/aimeerivers/watchthis-media-service/issues/1)) ([b4fc7c1](https://github.com/aimeerivers/watchthis-media-service/commit/b4fc7c1589f363f4f4a4bb4b45d5c0f356672bf7))
* Update dependencies ([#3](https://github.com/aimeerivers/watchthis-media-service/issues/3)) ([6dfcecc](https://github.com/aimeerivers/watchthis-media-service/commit/6dfcecc39dd8827b063e1052d9a98b21e01aa8cf))
* Update tailwindcss to 4.x ([#2](https://github.com/aimeerivers/watchthis-media-service/issues/2)) ([a2390c5](https://github.com/aimeerivers/watchthis-media-service/commit/a2390c5f97f3fbf8d4f1f906293fb6d534c3dc8a))
