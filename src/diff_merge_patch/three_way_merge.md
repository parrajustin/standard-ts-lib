# File: `src/diff_merge_patch/three_way_merge.ts`

This file provides utilities for performing a three-way difference analysis between a base text and two divergent versions of it (referred to as `left` and `right`). This is a foundational step for implementing a three-way merge algorithm.

## Exports

### `ChangeType`

-   **Type:** Enum
-   **Description:** An enum that categorizes the result of comparing a specific text chunk across the base, left, and right versions.
-   **Members:**
    -   `CHOOSE_RIGHT`: The change only exists on the right side.
    -   `CHOOSE_LEFT`: The change only exists on the left side.
    -   `POSSIBLE_CONFLICT`: A potential conflict was detected where both left and right sides made differing changes to the same base chunk.
    -   `NO_CONFLICT_FOUND`: The chunk is identical across all versions, or the changes are non-conflicting.

### `Side`

-   **Type:** Enum
-   **Description:** A simple enum to represent the `left` or `right` side in the comparison.
-   **Members:**
    -   `LEFT`
    -   `RIGHT`

### `ThreeWayDiff`

-   **Type:** Class
-   **Description:** A data structure that holds the result of a three-way comparison for a specific segment of the text. It contains the changes from the base to the left and right sides, their content, and a `ChangeType` classification.
-   **Constructor:**
    ```typescript
    constructor(
        public changeType: ChangeType,
        public leftChanges: ChangeOperation[],
        public leftLo: number,
        public leftHi: number,
        public leftStr: string,
        public rigthChanges: ChangeOperation[],
        public rightLo: number,
        public rightHi: number,
        public rightStr: string,
        public baseLo: number,
        public baseHi: number,
        public baseStr: string
    )
    ```
-   **Properties:**
    -   `changeType`: `ChangeType` - The classification of the diff for this chunk.
    -   `leftChanges`, `rigthChanges`: `ChangeOperation[]` - Arrays of change operations from the base to the left/right texts.
    -   `leftLo`, `leftHi`, `rightLo`, `rightHi`, `baseLo`, `baseHi`: `number` - The low and high index bounds for the string segments in each version.
    -   `leftStr`, `rightStr`, `baseStr`: `string` - The actual string content of the chunk for each version.

### `GetThreeWayDifferences`

-   **Type:** Function
-   **Description:** The main function of this module. It performs a three-way diff on the base, left, and right texts and returns a structured analysis of the differences.
-   **Signature:**
    ```typescript
    export function GetThreeWayDifferences(
        base: string,
        left: string,
        right: string
    ): Result<ThreeWayDiff[], StatusError>
    ```
-   **Inputs:**
    -   `base`: `string` - The original, common ancestor text.
    -   `left`: `string` - The first modified version of the text.
    -   `right`: `string` - The second modified version of the text.
-   **Output:** `Result<ThreeWayDiff[], StatusError>` - An `Ok` containing an array of `ThreeWayDiff` objects that collectively describe the differences across the three texts, or an `Err` if the initial diffing process fails.
-   **Behavior:** It first computes the differences between `base` and `left`, and `base` and `right`. It then processes these two sets of changes to identify conflicts and non-conflicting changes, packaging the results into an array of `ThreeWayDiff` objects.
