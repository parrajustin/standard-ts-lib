# File: `src/diff_merge_patch/patch_operation.ts`

This file defines two data structures, `PatchOperation` and `ChangeOperation`, which are used by the diff, patch, and merge algorithms to represent changes between texts.

**Note:** The `PatchOperation` class is derived from the original `diff-match-patch` library by Neil Fraser (Google).

## Exports

### `PatchOperation`

-   **Type:** Class
-   **Description:** Represents a single "patch" or "hunk" of changes in a diff. It contains a collection of diffs and metadata about the patch's location in the original and new texts. This is a core component of the `diff-match-patch` algorithm.
-   **Properties:**
    -   `diffs`: `DiffPair[]` - An array of diff tuples (`[DiffOp, string]`) that make up this patch.
    -   `start1`: `number` - The starting index of the patch in the original text (`text1`).
    -   `start2`: `number` - The starting index of the patch in the new text (`text2`).
    -   `length1`: `number` - The length of the patch in `text1`.
    -   `length2`: `number` - The length of the patch in `text2`.
-   **Methods:**
    -   `toString(): string`: Converts the patch object into the standard GNU diff format (e.g., `@@ -382,8 +481,9 @@`).

### `ChangeOperation`

-   **Type:** Class
-   **Description:** Represents a single, granular change operation (insert, delete, or equal). It holds more detailed information than a simple `DiffPair`, including start/end indices and content for both the base and test versions of the text. This is particularly useful for complex merge logic.
-   **Constructor:**
    ```typescript
    constructor(
        public op: DiffOp,
        public baseStart = 0,
        public testStart = 0,
        public baseEnd = 0,
        public testEnd = 0,
        public baseLength = 0,
        public testLength = 0,
        public baseContent = "",
        public testContent = ""
    )
    ```
-   **Properties:**
    -   `op`: `DiffOp` - The type of operation (`DELETE`, `EQUAL`, `INSERT`).
    -   `baseStart`, `baseEnd`: The start and end indices in the base text.
    -   `testStart`, `testEnd`: The start and end indices in the test/new text.
    -   `baseLength`, `testLength`: The length of the content in each version.
    -   `baseContent`, `testContent`: The string content for the operation in each version.
