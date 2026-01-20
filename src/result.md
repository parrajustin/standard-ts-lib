# File: `src/result.ts`

This file implements a `Result` type, a common functional programming construct for error handling without using exceptions. A `Result` represents either a success (`Ok`) containing a value, or a failure (`Err`) containing an error.

## Exports

### `Result<T, E>`

-   **Type:** Type Alias
-   **Description:** The main `Result` type, which is a union of `Ok<T>` and `Err<E>`.
-   **Definition:** `export type Result<T, E> = Ok<T> | Err<E>;`

### `Ok<T>`

-   **Type:** Class (via `OkImpl`) and Factory Function
-   **Description:** Represents a successful outcome, containing the resulting value.
-   **Constructor/Factory:** `Ok(val: T)`
-   **Behavior:** It holds a success value `val`. It provides methods for chaining operations and accessing the value.

#### Methods on `Ok<T>`

-   `unwrapOr(): T`: Returns the contained value.
-   `unsafeUnwrap(): T`: Returns the contained value.
-   `safeUnwrap(): T`: Returns the contained value (and is preferred over `unsafeUnwrap` as it only exists on `Ok`, preventing compilation if the type changes to a potential `Err`).
-   `map<U>(mapper: (val: T) => U): Ok<U>`: Applies a function to the contained value and returns a new `Ok` with the result.
-   `andThen<T2, E2>(mapper: (val: T) => Result<T2, E2>): Result<T2, E2>`: Chains another operation that returns a `Result`. If the current result is `Ok`, it calls `mapper` with the value.
-   `mapErr(): Ok<T>`: Returns itself, as there is no error to map.

### `Err<E>`

-   **Type:** Class (via `ErrImpl`) and Factory Function
-   **Description:** Represents a failure outcome, containing an error value.
-   **Constructor/Factory:** `Err(val: E)`
-   **Behavior:** It holds an error value `val`. It provides methods for control flow and error handling.

#### Methods on `Err<E>`

-   `unwrapOr<T2>(val: T2): T2`: Returns the provided default value `val`.
-   `unsafeUnwrap(): never`: Throws an error, as there is no success value to unwrap. Its use is discouraged.
-   `map(): Err<E>`: Returns itself, as there is no value to map.
-   `andThen(): Err<E>`: Returns itself, short-circuiting the chained operation.
-   `mapErr<F>(mapper: (val: E) => F): Err<F>`: Applies a function to the contained error value and returns a new `Err` with the result.

### `StatusResult<E>`

-   **Type:** Type Alias
-   **Description:** A specialized `Result` type where the success value is not important, only whether the operation succeeded or failed.
-   **Definition:** `export type StatusResult<E> = Result<unknown, E>;`

### Type Guard Functions

-   **`IsResult<T, E>(val: unknown): val is Result<T, E>`**: Checks if a value is an instance of `Ok` or `Err`.
-   **`IsOk<T>(val: unknown): val is Ok<T>`**: Checks if a value is an `Ok`.
-   **`IsErr(val: unknown): val is Err<unknown>`**: Checks if a value is an `Err`.
-   **`IsErrWithError<E>(val: unknown, error: E): val is ErrImpl<E>`**: Checks if a value is an `Err` containing a specific error instance.
