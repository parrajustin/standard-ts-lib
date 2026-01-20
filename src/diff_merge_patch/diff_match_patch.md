# File: `src/diff_merge_patch/diff_match_patch.ts`

This file contains the implementation of the `DiffMatchPatch` class, a port of Google's `diff-match-patch` library. It provides functionalities for computing differences between texts, creating and applying patches, and matching patterns.

**Note:** This code is derived from the original work by Neil Fraser (Google) and has been adapted for TypeScript. See the source file for full license and copyright details.

## Exports

### `DiffMatchPatch`

-   **Type:** Class
-   **Description:** A class containing methods for finding differences between two texts, creating patches, and applying them. It is configurable through several public properties.

#### Properties

-   `diffTimeout`: `number` - The number of seconds to map a diff before giving up (0 for infinity). Default is `1.0`.
-   `diffEditCost`: `number` - The cost of an empty edit operation in terms of edit characters. Default is `4`.
-   `matchThreshold`: `number` - At what point is no match declared (0.0 = perfection, 1.0 = very loose). Default is `0.5`.
-   `matchDistance`: `number` - How far to search for a match. Default is `1000`.
-   `patchDeleteThreshold`: `number` - Threshold for how closely deleted text needs to match the expected text. Default is `0.5`.
-   `patchMargin`: `number` - Chunk size for context length in patches. Default is `4`.
-   `matchMaxBits`: `number` - The number of bits in an int, used for matching. Default is `32`.

#### Public Methods

##### `diffMain`

-   **Description:** Finds the differences between two texts.
-   **Signature:** `diffMain(text1: string | null, text2: string | null, optChecklines?: boolean, optDeadline?: number): Result<DiffPair[], StatusError>`
-   **Inputs:**
    -   `text1`: The first text to compare.
    -   `text2`: The second text to compare.
    -   `optChecklines`: Optional flag to enable a faster, line-level diff.
    -   `optDeadline`: Optional timestamp to abort the operation.
-   **Output:** `Result<DiffPair[], StatusError>` - An array of `DiffPair` tuples representing the differences.

##### `diffCleanupSemantic`

-   **Description:** Reduces the number of edits by eliminating semantically trivial equalities.
-   **Signature:** `diffCleanupSemantic(diffs: DiffPair[]): void`
-   **Inputs:**
    -   `diffs`: An array of `DiffPair` tuples.

##### `diffCleanupEfficiency`

-   **Description:** Reduces the number of edits by eliminating operationally trivial equalities.
-   **Signature:** `diffCleanupEfficiency(diffs: DiffPair[]): void`
-   **Inputs:**
    -   `diffs`: An array of `DiffPair` tuples.

##### `diffPrettyHtml`

-   **Description:** Converts a diff array into a pretty HTML report.
-   **Signature:** `diffPrettyHtml(diffs: DiffPair[]): string`
-   **Inputs:**
    -   `diffs`: An array of `DiffPair` tuples.
-   **Output:** `string` - An HTML representation of the diff.

##### `diffLevenshtein`

-   **Description:** Computes the Levenshtein distance (the number of inserted, deleted, or substituted characters).
-   **Signature:** `diffLevenshtein(diffs: DiffPair[]): number`
-   **Inputs:**
    -   `diffs`: An array of `DiffPair` tuples.
-   **Output:** `number` - The Levenshtein distance.

##### `changeMake`

-   **Description:** Converts a diff array into an array of `ChangeOperation` objects.
-   **Signature:** `changeMake(diffs: DiffPair[]): Result<ChangeOperation[], StatusError>`
-   **Inputs:**
    -   `diffs`: An array of `DiffPair` tuples.
-   **Output:** `Result<ChangeOperation[], StatusError>` - An array of `ChangeOperation` objects.

##### `patchMake`

-   **Description:** Computes a list of patches to transform one text into another.
-   **Signature:** `patchMake(a: string | DiffPair[], optB?: string | DiffPair[], optC?: string | DiffPair[]): Result<PatchOperation[], StatusError>`
-   **Inputs:**
    -   Can be called with `(text1, text2)`, `(diffs)`, or `(text1, diffs)`.
-   **Output:** `Result<PatchOperation[], StatusError>` - An array of `PatchOperation` objects.

##### `patchApply`

-   **Description:** Merges a set of patches onto a text.
-   **Signature:** `patchApply(patches: PatchOperation[], text: string): Result<[string, boolean[]], StatusError>`
-   **Inputs:**
    -   `patches`: An array of `PatchOperation` objects.
    -   `text`: The original text.
-   **Output:** `Result<[string, boolean[]], StatusError>` - A tuple containing the patched text and an array of booleans indicating which patches were applied.

##### `patchToText`

-   **Description:** Takes a list of patches and returns a textual representation.
-   **Signature:** `patchToText(patches: PatchOperation[]): string`
-   **Inputs:**
    -   `patches`: An array of `PatchOperation` objects.
-   **Output:** `string` - The textual representation of the patches.

##### `patchFromText`

-   **Description:** Parses a textual representation of patches and returns a list of `PatchOperation` objects.
-   **Signature:** `patchFromText(textline: string): Result<PatchOperation[], StatusError>`
-   **Inputs:**
    -   `textline`: The textual representation of patches.
-   **Output:** `Result<PatchOperation[], StatusError>` - An array of `PatchOperation` objects.

##### `diffCommonPrefix`

-   **Description:** Determines the common prefix of two strings.
-   **Signature:** `diffCommonPrefix(text1: string, text2: string): number`
-   **Output:** `number` - The number of characters in the common prefix.

##### `diffCommonSuffix`

-   **Description:** Determines the common suffix of two strings.
-   **Signature:** `diffCommonSuffix(text1: string, text2: string): number`
-   **Output:** `number` - The number of characters in the common suffix.

##### `diffCleanupMerge`

-   **Description:** Reorders and merges like edit sections in a diff array.
-   **Signature:** `diffCleanupMerge(diffs: DiffPair[]): void`

##### `diffText1` / `diffText2`

-   **Description:** Computes the source (`diffText1`) or destination (`diffText2`) text from a diff array.
-   **Signature:** `diffText1(diffs: DiffPair[]): string`
-   **Output:** `string` - The computed text.

##### `diffLineMode`

-   **Description:** Computes a line-mode diff.
-   **Signature:** `diffLineMode(text1: string, text2: string): Result<DiffPair[], StatusError>`
-   **Output:** `Result<DiffPair[], StatusError>` - An array of `DiffPair` tuples.

##### `diffToDelta`

-   **Description:** Crushes the diff into an encoded string.
-   **Signature:** `diffToDelta(diffs: DiffPair[]): string`
-   **Output:** `string` - The delta-encoded string.

##### `diffFromDelta`

-   **Description:** Computes the full diff from an original text and a delta-encoded string.
-   **Signature:** `diffFromDelta(text1: string, delta: string): Result<DiffPair[], StatusError>`
-   **Output:** `Result<DiffPair[], StatusError>` - An array of `DiffPair` tuples.
