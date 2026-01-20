# File: `src/async.ts`

This file contains helper functions for working with asynchronous operations in JavaScript/TypeScript.

## Exports

### `AsyncForEach`

-   **Type:** Function
-   **Description:** Applies an asynchronous callback function to each element of an array and returns an array of the resulting promises. This is analogous to `Array.prototype.map` for asynchronous operations.
-   **Signature:**
    ```typescript
    export function AsyncForEach<InputType, OutputType>(
        data: InputType[],
        cb: (input: InputType) => Promise<OutputType>
    ): Promise<OutputType>[]
    ```
-   **Inputs:**
    -   `data`: `InputType[]` - The array of data to iterate over.
    -   `cb`: `(input: InputType) => Promise<OutputType>` - The asynchronous callback function to apply to each element. This function should return a `Promise`.
-   **Output:** `Promise<OutputType>[]` - An array of promises, where each promise corresponds to the asynchronous operation for an element in the input array.
-   **Behavior:** The function iterates over the input `data` array and calls the `cb` function for each item. It wraps the callback in `Promise.resolve` to ensure a promise is always returned. It does **not** wait for the promises to resolve; it returns the array of pending promises immediately. To wait for all operations to complete, you would typically use `Promise.all()` on the returned array.
