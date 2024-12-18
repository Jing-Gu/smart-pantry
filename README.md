# Smart Pantry

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

// TODO: about self-hosting
// Tech stack

## Changelog & version bump

After git commit (follow conventional commits), run `npm run release` for version bump and changelog update.

```
<type>(<scope>): <subject>
e.g.
fix(release): need to depend on latest rxjs and zone.js

The header is mandatory and the scope of the header is optional.
```

_release-please_ will create a PR with the version bump according to the changes (major, minor, patch) and updated CHANGELOG.md.

Review and merge the PR, then push the changes to repo.

### Auto changelog

https://github.com/googleapis/release-please

### Conventional commits

https://www.conventionalcommits.org/en/v1.0.0/
