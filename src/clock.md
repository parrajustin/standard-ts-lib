# File: `src/clock.ts`

This file defines a `Clock` interface and provides two implementations: `RealTimeClock` for using actual system time and `FakeClock` for testing environments where time needs to be controlled.

## Exports

### `Clock`

-   **Type:** Interface
-   **Description:** An abstraction for time-related functions, allowing for interchangeable real and fake time implementations.
-   **Definition:**
    ```typescript
    export interface Clock {
        // Gets the milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time (UTC).
        now(): number;

        // A method that returns a high resolution timestamp in milliseconds.
        performanceNow(): number;

        // Sets a function to run after ms milliseconds have passed.
        setTimeout(func: () => Promise<unknown>, ms: number): number;

        // Removes a function scheduled with setTimeout.
        clearTimeout(id: number): void;
    }
    ```

### `FakeClock`

-   **Type:** Class
-   **Implements:** `Clock`
-   **Description:** A mock implementation of the `Clock` interface that allows for manual control over time in a testing environment.
-   **Behavior:** Time does not advance automatically. You must manually advance it using `addMillis` or `addSeconds`. Scheduled timeouts will only execute when `executeTimeoutFuncs` is called and the internal time has passed the scheduled time.

#### Constructor

-   **Signature:** `constructor(now: number)`
-   **Inputs:**
    -   `now`: `number` - The initial time in milliseconds.

#### Methods

-   `addMillis(ms: number): void` - Advances the clock's time by the specified number of milliseconds.
-   `addSeconds(s: number): void` - Advances the clock's time by the specified number of seconds.
-   `setNow(now: number): void` - Sets the clock's current time to a specific value.
-   `now(): number` - Returns the current time of the fake clock.
-   `performanceNow(): number` - Returns the current time of the fake clock.
-   `setTimeout(func: () => Promise<unknown>, ms: number): number` - Schedules a function to be executed later.
-   `clearTimeout(id: number): void` - Removes a scheduled timeout.
-   `executeTimeoutFuncs(): Promise<void>` - Executes any scheduled timeout functions whose scheduled time has passed.

### `RealTimeClock`

-   **Type:** Class
-   **Implements:** `Clock`
-   **Description:** An implementation of the `Clock` interface that uses the browser's built-in `Date` and `performance` objects.
-   **Behavior:** This class directly wraps `Date.now()`, `window.performance.now()`, `window.setTimeout()`, and `window.clearTimeout()`.

#### Methods

-   `now(): number` - Returns `Date.now()`.
-   `performanceNow(): number` - Returns `window.performance.now()`.
-   `setTimeout(func: () => void, ms: number): number` - Schedules a function using `window.setTimeout`.
-   `clearTimeout(id: number): void` - Clears a timeout using `window.clearTimeout`.
