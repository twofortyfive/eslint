# Forbid import of given packages into given paths (`mathieu-eveillard/no-restricted-imports`)

<!-- end auto-generated rule header -->

This rule aims to prevent a developer of importing given packages into specific paths, thus enforcing a clear dependency schema (e.g. functional core / imperative shell, hexagonal architecture).

## Rule Details

### Error level

It is strongly recommended to use the `error` level.

### Options

Rule options accept an array of constraints, each being an object with 2 properties:

- `packages`: an array of package names that should NOT be imported into…
- `path`: the path where these packages should NOT be importer.
