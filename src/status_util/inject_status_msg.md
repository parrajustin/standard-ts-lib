# File: `src/status_util/inject_status_msg.ts`

This file provides higher-order utility functions for modifying `StatusError` objects. These are designed to be used as "mutators" in functions like `WrapPromise` and `WrapToResult` to add more context to errors as they are handled.

## Exports

### `InjectStatusMsg`

-   **Type:** Higher-Order Function
-   **Description:** A factory that creates a mutator function. The mutator function prepends a specific message to a `StatusError`'s existing message and can optionally add metadata.
-   **Signature:**
    ```typescript
    export function InjectStatusMsg(
        msg: string,
        meta?: Record<string, string>
    ): (error: StatusError) => void
    ```
-   **Inputs:**
    -   `msg`: `string` - The message to prepend to the error's message.
    -   `meta`: `Record<string, string>` (optional) - A key-value object to be added to the error's payload.
-   **Output:** `(error: StatusError) => void` - A mutator function that takes a `StatusError` and modifies it in place.
-   **Example Usage:**
    ```typescript
    WrapPromise(somePromise, "Failed", InjectStatusMsg("While doing X"));
    ```

### `InjectMeta`

-   **Type:** Higher-Order Function
-   **Description:** A factory that creates a mutator function. The mutator function adds a set of key-value pairs to a `StatusError`'s payload.
-   **Signature:**
    ```typescript
    export function InjectMeta(meta: Record<string, string>): (error: StatusError) => void
    ```
-   **Inputs:**
    -   `meta`: `Record<string, string>` - A key-value object to be added to the error's payload.
-   **Output:** `(error: StatusError) => void` - A mutator function that takes a `StatusError` and modifies its payload in place.
-   **Example Usage:**
    ```typescript
    WrapPromise(somePromise, "Failed", InjectMeta({ component: 'MyComponent' }));
    ```
