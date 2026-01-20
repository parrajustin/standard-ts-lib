# File: `src/diff_merge_patch/diff_type.ts`

This file defines the `DiffPair` type, which is the basic building block for representing a sequence of differences between two texts.

## Exports

### `DiffPair`

-   **Type:** Type Alias
-   **Description:** Defines the structure of a single diff operation. A complete diff is represented as an array of `DiffPair`s (e.g., `DiffPair[]`).
-   **Definition:**
    ```typescript
    import type { DiffOp } from "./diff_op";

    export type DiffPair = [DiffOp, string];
    ```
-   **Structure:**
    -   `[0]`: `DiffOp` - The operation type (`DELETE`, `EQUAL`, or `INSERT`).
    -   `[1]`: `string` - The text content associated with the operation.
