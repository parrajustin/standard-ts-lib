# File: `src/utils.ts`

This file provides miscellaneous utility functions, particularly for working with `Result` and `StatusError` types.

## Exports

### `CombineResults`

-   **Type:** Function
-   **Description:** Aggregates an array of `Result` objects into a single `Result`. If all results in the array are `Ok`, it returns an `Ok` containing an array of their values. If it encounters an `Err`, it immediately returns that `Err`, short-circuiting the operation.
-   **Signature:**
    ```typescript
    export function CombineResults<T>(results: Result<T, StatusError>[]): Result<T[], StatusError>
    ```
-   **Inputs:**
    -   `results`: `Result<T, StatusError>[]` - An array of `Result` objects to combine.
-   **Output:** `Result<T[], StatusError>` - A single `Result` which is either:
    -   `Ok<T[]>` containing an array of all the success values.
    -   The first `Err<StatusError>` encountered in the input array.

### `ConvertToUnknownError`

-   **Type:** Higher-Order Function
-   **Description:** A factory function that creates an error conversion utility. The returned function takes an error of `unknown` type and converts it into a standardized `StatusError` with an `UNKNOWN` error code.
-   **Signature:**
    ```typescript
    export function ConvertToUnknownError(errorStr: string): (err: unknown) => StatusError
    ```
-   **Inputs:**
    -   `errorStr`: `string` - A descriptive string to include in the message of the created `StatusError`.
-   **Output:** `(err: unknown) => StatusError` - A function that performs the conversion.
-   **Behavior of Returned Function:**
    -   **Input:** `err: unknown` - The error to convert.
    -   **Output:** `StatusError` - A new `StatusError` object.
    -   **Logic:** It checks if the input `err` is already a `StatusError` (returns it directly), an `Error` instance (uses its message and stack), or some other type, and formats a descriptive error message.
