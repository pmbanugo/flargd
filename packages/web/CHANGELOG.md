# @flargd/web

## 0.4.0

### Minor Changes

- 6cde97ed: add getAll() function for evaluating all flags related to an app
- 1801c500: - update urls to the latest endpoint for flag resolution
  - change error logging path

## 0.3.0

### Minor Changes

- 0fe5a5f: enable evaluating multiple flags through the `getMany()` method

### Patch Changes

- 12f72eb: The get() client function was refactored to properly hide private properties.
- f9c67b8: return an error object instead of null for when retrieving flags
- 20bf0ed: updated the url for flag evaluation

## 0.2.0

### Minor Changes

- Initial release of the client library for Flargd. It includes a `get()` function to retrieve a flag.
