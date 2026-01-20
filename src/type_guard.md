# File: `src/type_guard.ts`

This file contains a single utility function, `TypeGuard`, which is a helper for creating custom type guards in TypeScript.

## Exports

### `TypeGuard`

-   **Type:** Function
-   **Description:** A generic function that helps in creating type guards for type narrowing. It takes a value and a boolean, and its return type `_value is T` tells the TypeScript compiler to narrow the type of the value to `T` if the function returns `true`.
-   **Signature:**
    ```typescript
    export function TypeGuard<T>(_value: unknown | T, isMatched: boolean): _value is T
    ```
-   **Inputs:**
    -   `_value`: `unknown | T` - The value to be type-checked. It is not used in the function body but is necessary for the type guard signature.
    -   `isMatched`: `boolean` - The result of the type check condition.
-   **Output:** `boolean` - Returns `isMatched` and signals to the TypeScript compiler that `_value` is of type `T` if `true`.
-   **Behavior:** This function simply returns the `isMatched` boolean. Its primary purpose is to leverage TypeScript's `is` keyword in the return type to perform type narrowing in conditional blocks.
