# File: `src/status_error.ts`

This file defines a standardized error handling system using the `StatusError` class and an `ErrorCode` enum. It provides a structured way to represent errors that can be easily identified and handled programmatically.

## Exports

### `ErrorCode`

-   **Type:** Enum
-   **Description:** A collection of standard error codes, similar to those used in gRPC or Google Cloud APIs.
-   **Members:**
    -   `OK`
    -   `CANCELLED`
    -   `UNKNOWN`
    -   `INVALID_ARGUMENT`
    -   `DEADLINE_EXCEEDED`
    -   `NOT_FOUND`
    -   `ALREADY_EXISTS`
    -   `PERMISSION_DENIED`
    -   `RESOURCE_EXHAUSTED`
    -   `FAILED_PRECONDITION`
    -   `ABORTED`
    -   `OUT_OF_RANGE`
    -   `UNIMPLEMENTED`
    -   `INTERNAL`
    -   `UNAVAILABLE`
    -   `DATA_LOSS`
    -   `UNAUTHENTICATED`

### `StatusError`

-   **Type:** Class
-   **Description:** A custom error class that encapsulates an `ErrorCode`, a descriptive message, and optional additional data. It also captures the stack trace for easier debugging.
-   **Behavior:** It is designed to be used with the `Result` type, allowing functions to return either a success value or a structured `StatusError`.

#### Constructor

-   **Signature:** `constructor(public errorCode: ErrorCode, public message: string, error?: Error)`
-   **Inputs:**
    -   `errorCode`: `ErrorCode` - The programmatic error code.
    -   `message`: `string` - A human-readable error message.
    -   `error`: `Error` (optional) - An underlying `Error` object to capture its stack trace.

#### Methods

-   **`setPayload(name: string, payload: any): this`**: Attaches an additional key-value payload to the error object for more context.
-   **`toString(includeStack = true): string`**: Returns a formatted string representation of the error, including the error code, message, timestamp, and optionally the stack trace and any payloads.
-   **`with(func: (error: StatusError) => void): this`**: A utility method to apply modifications to the `StatusError` instance in a fluent style.

### Error Creator Functions

-   **Type:** Functions
-   **Description:** A suite of convenience functions, one for each member of the `ErrorCode` enum (except `OK`), that create and return a `StatusError` instance with the corresponding error code.
-   **Signatures:**
    ```typescript
    export function CancelledError(message: string): StatusError;
    export function UnknownError(message: string): StatusError;
    export function InvalidArgumentError(message: string): StatusError;
    export function DeadlineExceededError(message: string): StatusError;
    export function NotFoundError(message: string): StatusError;
    export function AlreadyExistsError(message: string): StatusError;
    export function PermissionDeniedError(message: string): StatusError;
    export function ResourceExhaustedError(message: string): StatusError;
    export function FailedPreconditionError(message: string): StatusError;
    export function AbortedError(message: string): StatusError;
    export function OutOfRangeError(message: string): StatusError;
    export function UnimplementedError(message: string): StatusError;
    export function InternalError(message: string): StatusError;
    export function UnavailableError(message: string): StatusError;
    export function DataLossError(message: string): StatusError;
    export function UnauthenticatedError(message: string): StatusError;
    ```
-   **Input:**
    -   `message`: `string` - The error message.
-   **Output:** `StatusError` - A new `StatusError` instance.
