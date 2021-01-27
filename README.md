# Lerna versioning sandbox

This sandbox shows the differnt solutions to pre-releasing packages and graduating the pre-releases to actual releases.

## Publishing a pre-release patch
Run `npm run release:prepatch`

This will publish a "canary" release to npm, bumping the patch version.

Assuming the version being `1.0.0` at the moment of execution, the script will create an alpha version with a bumped `patch`, resulting in `1.0.1-alpha.1+...` followed by commit SHA.


When run again, it will only increment the `-alpha.N...` version and update the SHA. *It should be noted that npm ignores the `+SHA` part in version list; how does artifactory behave with such versions is something to be investigated yet*

### Publishing a pre-relase minor
Works in the similar manner to pre-release patch.

Run `npm run release:preminor`. The versions will follow `1.0.0` => `1.1.0-alpha.1+` transition.

## Releasing a proper version from alpha state
Running `npm run release:...` (with `patch, minor, major`), will remove the `-alpha...` suffix and apply the version according to semver logic.

For example, if the version is now `1.0.1-alpha.3...` the versions will transition in the follwing fashion:
- `patch`: => `1.0.1`
- `minor`: => `1.1.0`
- `major`: => `2.0.0`

In case of version being `1.1.0-alpha...`, it will behave as follows:
- `patch`: => `1.1.0` (because a first patch for the coming `1.1.X` version is `0`)
- `minor`: => `1.1.0`
- `major`: => `2.0.0`

---
Taking a look at the scripts themselves, the pre-release is using `lerna publish --canary` instead of `lerna version pre...`, chiefly because for reasons unkown, `version pre...` does not respect the `-alpha.X..` markup in the versions, resuling in some odd behavior.

For example, given the current version `1.0.0`, a `lerna version preminor` will yield `1.1.0-alpha.0` which looks fine, but the subsequent `lerna version preminor` yields `1.2.0-alpha.0` instead of `1.1.0-alpha.1` as desired. Canry publishing mechanics however, respect the pre-release markup in the expected way.
