# File: `src/diff_merge_patch/diff_op.ts`

This file defines the `DiffOp` enum, which represents the types of operations in a diff array.

## Exports

### `DiffOp`

-   **Type:** Enum
-   **Description:** An enumeration that specifies the type of a diff operation. It is a core component used throughout the diff, match, and patch algorithms to categorize changes.
-   **Members:**
    -   `DELETE = -1`: Represents a segment of text that was deleted from the original text.
    -   `EQUAL = 0`: Represents a segment of text that is common to both the original and new texts.
    -   `INSERT = 1`: Represents a segment of text that was added to the new text.
