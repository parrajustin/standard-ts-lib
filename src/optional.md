# File: `src/optional.ts`

This file provides an `Optional` type, a functional programming construct for safely handling values that may be absent. It helps avoid `null` or `undefined` errors by forcing explicit handling of both the present (`Some`) and absent (`None`) cases.

## Exports

### `Optional<T>`

-   **Type:** Type Alias
-   **Description:** The main `Optional` type, which is a union of `Some<T>` (a value is present) and `None` (a value is absent).
-   **Definition:** `export type Optional<T> = Some<T> | None;`

### `Some<T>`

-   **Type:** Class (via `SomeImpl`) and Factory Function
-   **Description:** Represents the presence of a value.
-   **Constructor/Factory:** `Some(val: T)`
-   **Behavior:** It wraps a value `val`, indicating that the value exists. It provides methods for mapping, chaining, and safely accessing the value.

#### Methods on `Some<T>`

-   `valueOr(_val: unknown): T`: Returns the contained value.
-   `safeValue(): T`: Safely returns the contained value. This method is preferred over directly accessing `.val` as it only exists on `Some`, preventing a compile error if the type were to change to a possible `None`.
-   `map<U>(mapper: (val: T) => U): Some<U>`: Applies a function to the contained value and returns a new `Some` with the result.
-   `andThen<T2>(mapper: ...): Optional<T2>`: Chains another operation. If the current optional is `Some`, it calls `mapper` with the value. The `mapper` can return a new value (which will be wrapped in `Some`) or another `Optional`.
-   `merge<U, O>(...)`: Merges this `Optional` with another. If both are `Some`, it applies the given function to their values.
-   `equals(other: Optional<unknown>): boolean`: Checks if the other `Optional` is a `Some` with an equal value.
-   `clone(): Some<T>`: Returns a new `Some` instance containing the same value.

### `None`

-   **Type:** Class (via `NoneImpl`) and Singleton Constant
-   **Description:** Represents the absence of a value. It is a singleton, meaning there is only one `None` instance.
-   **Behavior:** It signifies that a value is missing. Its methods are designed to propagate the `None` state through chains of operations.

#### Methods on `None`

-   `valueOr<T2>(val: T2): T2`: Returns the provided default value `val`.
-   `map(_mapper: unknown): None`: Returns `None`, short-circuiting the map operation.
-   `andThen(_op: unknown): None`: Returns `None`, short-circuiting the chained operation.
-   `merge(...)`: Returns `None`.
-   `equals<T>(other: Optional<T>): boolean`: Checks if the other `Optional` is also `None`.
-   `clone(): None`: Returns the `None` singleton itself.

### Helper Functions

-   **`IsOptional<T>(value: unknown): value is Optional<T>`**: A type guard to check if a given value is an `Optional` (`Some` or `None`).
-   **`WrapOptional<T>(value: T | null | undefined): Optional<T>`**: A utility function to convert a nullable or undefined value into an `Optional`. It returns `Some<T>` if the value is not `null` or `undefined`, and `None` otherwise.
