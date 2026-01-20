# File: `src/wrap_to_result.ts`

This file contains the `WrapToResult` utility function, which provides a safe way to execute synchronous functions that may throw exceptions by wrapping their outcomes in a `Result` type.

## Exports

### `WrapToResult`

- **Type:** Function
- **Description:** A function that takes another function, executes it in a `try...catch` block, and returns its outcome as a `Result`. This is the synchronous equivalent of `WrapPromise` and allows for consistent, exception-free error handling.
    > [!IMPORTANT]
    > **CRITICAL FOR SAFETY:** If a function has the potential to throw an error, it **MUST** be wrapped in `WrapToResult` to be considered "safe". Do not write code that allows exceptions to bubble up. We strictly follow Google coding style: **do not throw errors**; instead, always return `Result` types and `Status` objects. Use this utility to enforce that pattern.
- **Signature:**
    ```typescript
    export function WrapToResult<T>(
        func: () => T,
        textForUnknown: string,
        ...mutators: ((error: StatusError) => void)[]
    ): Result<T, StatusError>;
    ```
- **Inputs:**
    - `func`: `() => T` - The synchronous function to execute.
    - `textForUnknown`: `string` - A descriptive text to use if the function throws an unknown or non-standard error.
    - `mutators`: `((error: StatusError) => void)[]` (optional) - A variadic array of functions that can modify the `StatusError` object before it is returned in an `Err`.
- **Output:** `Result<T, StatusError>` - A `Result` object which is either:
    - `Ok<T>`: If `func` executes successfully, containing its return value.
    - `Err<StatusError>`: If `func` throws an exception. The thrown exception is converted into a `StatusError`.
- **Behavior:** It calls `func` inside a `try` block. If an exception is caught, it intelligently converts the caught error (whether it's an `Error`, `StatusError`, or something else) into a `StatusError`, applies any provided mutators, and wraps it in `Err`.
