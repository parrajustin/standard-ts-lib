# File: `src/search_string/search_string_parser.ts`

This file provides a utility for parsing search query strings into a structured format. It can handle keywords with values (e.g., `to:me`), negated conditions (e.g., `-from:joe`), quoted phrases, and plain text segments.

## Exports

### `TextTransformer`

-   **Type:** Type Alias
-   **Description:** A function type that defines a transformer. A transformer can convert a plain text segment from a search query into a key-value condition.
-   **Definition:**
    ```typescript
    export type TextTransformer = (text: string) => Optional<{ key: string; value: string }>;
    ```
-   **Inputs:**
    -   `text`: `string` - The text segment to potentially transform.
-   **Output:** `Optional<{ key: string; value: string }>` - An `Optional` that is a `Some` containing the new key-value condition if the transformation is successful, otherwise `None`.

### `ParseQuery`

-   **Type:** Interface
-   **Description:** Defines the structure for a parsed query, separating conditions into those that are included and those that are excluded (negated).
-   **Definition:**
    ```typescript
    export interface ParseQuery {
        exclude: Record<string, string[]>;
        include: Record<string, string[]>;
    }
    ```
-   **Properties:**
    -   `exclude`: `Record<string, string[]>` - A map where keys are condition keywords and values are arrays of negated values.
    -   `include`: `Record<string, string[]>` - A map where keys are condition keywords and values are arrays of included values.

### `Conditions`

-   **Type:** Interface
-   **Description:** Represents a single keyword-value condition parsed from the search string.
-   **Definition:**
    ```typescript
    export interface Conditions {
        keyword: string;
        value: string;
        negated: boolean;
    }
    ```
-   **Properties:**
    -   `keyword`: `string` - The keyword of the condition (e.g., 'from').
    -   `value`: `string` - The value associated with the keyword.
    -   `negated`: `boolean` - `true` if the condition is negated (e.g., with a `-` prefix).

### `SearchString`

-   **Type:** Class
-   **Description:** A class that represents a parsed search string. It provides methods to access the parsed data and to manipulate the query. Instances of this class are created using the static `parse` method.
-   **Behavior:** The parser iterates through the input string, identifying text segments, keywords, and values. It handles spaces, quotes, and negation to correctly build a query structure. The `toString()` method can be used to reconstruct the string representation from the parsed state.

#### `parse`

-   **Type:** Static Method
-   **Description:** Parses a search query string and returns a `SearchString` instance.
-   **Signature:**
    ```typescript
    public static parse(str: string, transformTextToConditions: TextTransformer[] = []): SearchString
    ```
-   **Inputs:**
    -   `str`: `string` - The search query string to parse.
    -   `transformTextToConditions`: `TextTransformer[]` (optional) - An array of functions to transform text segments into conditions.
-   **Output:** `SearchString` - A new instance of `SearchString`.

#### `getConditionArray`

-   **Type:** Method
-   **Description:** Returns all parsed conditions as an array.
-   **Signature:**
    ```typescript
    public getConditionArray(): Conditions[]
    ```
-   **Output:** `Conditions[]` - An array of `Conditions` objects.

#### `getParsedQuery`

-   **Type:** Method
-   **Description:** Returns the parsed conditions as a structured `ParseQuery` object, separating included and excluded conditions.
-   **Signature:**
    ```typescript
    public getParsedQuery(): ParseQuery
    ```
-   **Output:** `ParseQuery` - An object containing the parsed query.

#### `getAllText`

-   **Type:** Method
-   **Description:** Returns a single string containing all plain text segments joined by spaces.
-   **Signature:**
    ```typescript
    public getAllText(): string
    ```
-   **Output:** `string` - The concatenated text segments.

#### `getTextSegments`

-   **Type:** Method
-   **Description:** Returns all parsed plain text segments.
-   **Signature:**
    ```typescript
    public getTextSegments(): TextSegment[]
    ```
-   **Output:** `TextSegment[]` - An array of `TextSegment` objects, each containing the text and a negation flag.

#### `removeKeyword`

-   **Type:** Method
-   **Description:** Removes all conditions that match a given keyword and negation status.
-   **Signature:**
    ```typescript
    public removeKeyword(keywordToRemove: string, negatedToRemove: boolean): void
    ```
-   **Inputs:**
    -   `keywordToRemove`: `string` - The keyword to remove.
    -   `negatedToRemove`: `boolean` - The negation status of the conditions to remove.

#### `addEntry`

-   **Type:** Method
-   **Description:** Adds a new condition to the search string.
-   **Signature:**
    ```typescript
    public addEntry(keyword: string, value: string, negated: boolean): void
    ```
-   **Inputs:**
    -   `keyword`: `string` - The keyword of the condition to add.
    -   `value`: `string` - The value of the condition.
    -   `negated`: `boolean` - Whether the condition should be negated.

#### `removeEntry`

-   **Type:** Method
-   **Description:** Removes the first occurrence of a specific condition.
-   **Signature:**
    ```typescript
    public removeEntry(keyword: string, value: string, negated: boolean): void
    ```
-   **Inputs:**
    -   `keyword`: `string` - The keyword of the condition to remove.
    -   `value`: `string` - The value of the condition to remove.
    -   `negated`: `boolean` - The negation status of the condition.

#### `clone`

-   **Type:** Method
-   **Description:** Creates a new `SearchString` instance with the same parsed data.
-   **Signature:**
    ```typescript
    public clone(): SearchString
    ```
-   **Output:** `SearchString` - A new `SearchString` instance.

#### `toString`

-   **Type:** Method
-   **Description:** Reconstructs the search query string from the current state of the `SearchString` object.
-   **Signature:**
    ```typescript
    public toString(): string
    ```
-   **Output:** `string` - The string representation of the search query.
