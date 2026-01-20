# File: `src/wrap_promise.ts`

This file contains the `WrapPromise` utility function, which adapts standard JavaScript `Promise` objects to the `Result` type for safer error handling in asynchronous operations.

## Exports

### `WrapPromise`

-   **Type:** Function
-   **Description:** A function that wraps a `Promise` into a new `Promise` that always resolves with a `Result` object. This prevents unhandled promise rejections and allows for consistent error handling using the `Ok`/`Err` pattern.
-   **Signature:**
    ```typescript
    export async function WrapPromise<TInput>(
        promise: Promise<TInput>,
        textForUnknown: string,
        ...mutators: ((error: StatusError) => void)[]
    ): Promise<Result<TInput, StatusError>>
    ```
-   **Inputs:**
    -   `promise`: `Promise<TInput>` - The promise to wrap.
    -   `textForUnknown`: `string` - A descriptive text to use if the promise rejects with an unknown or non-standard error type.
    -   `mutators`: `((error: StatusError) => void)[]` (optional) - A variadic array of functions that can modify the `StatusError` object before it is returned in an `Err`.
-   **Output:** `Promise<Result<TInput, StatusError>>` - A new promise that resolves to:
    -   `Ok<TInput>`: If the original promise resolves successfully.
    -   `Err<StatusError>`: If the original promise rejects. The rejection reason is converted into a `StatusError`.
-   **Behavior:** It attaches `.then()` and `.catch()` handlers to the input promise. On success, it wraps the value in `Ok`. On failure, it intelligently converts the caught error (whether it's an `Error`, `StatusError`, or something else) into a `StatusError`, applies any provided mutators, and wraps it in `Err`.
