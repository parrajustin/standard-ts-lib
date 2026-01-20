# File: `src/equality.ts`

This file provides utility functions for equality checking.

## Exports

### `IsUndefined`

-   **Type:** Function / Type Guard
-   **Description:** A type guard function that checks if a given value is `undefined`.
-   **Signature:**
    ```typescript
    export function IsUndefined(arg: unknown): arg is undefined
    ```
-   **Inputs:**
    -   `arg`: `unknown` - The value to check.
-   **Output:** `boolean` - Returns `true` if the value is `undefined`, and `false` otherwise. The `arg is undefined` return type informs the TypeScript compiler that the value is `undefined` within conditional blocks where this function returns `true`.
-   **Behavior:** Performs a strict equality check (`===`) against `undefined`.
