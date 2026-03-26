# Angular Signals

> **Source:** `src/app/counter/`

## Overview

Angular Signals (introduced in Angular 16, stabilised in Angular 17+) provide a reactive primitive for managing state without relying on Zone.js change detection. A signal holds a value and notifies any consumers (templates, computed signals, effects) automatically whenever the value changes.

## Key APIs

| API | Purpose |
|---|---|
| `signal(initialValue)` | Creates a writable signal |
| `computed(() => expr)` | Derives a read-only signal from other signals |
| `effect(() => sideEffect)` | Runs a side-effect whenever dependent signals change |
| `signal.set(value)` | Replaces the signal value |
| `signal.update(fn)` | Updates the value using the current value |
| `signal()` | Reads the current value (calling it as a function) |

## Example — Counter Component

```typescript
import { Component, computed, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.html',
})
export class Counter {
  // Writable signal, initial value 1
  counter = signal(1);

  // Derived signal — automatically recomputes when `counter` changes
  doubleCounter: Signal<number> = computed(() => this.counter() * 2);

  increment() {
    // Doubles the counter on each click (counter + counter)
    this.counter.set(this.counter() + this.counter());
  }

  decrement() {
    if (this.counter() > 0) {
      this.counter.set(this.counter() - 1);
    }
  }
}
```

### Template Usage

```html
<p>Counter: {{ counter() }}</p>
<p>Double: {{ doubleCounter() }}</p>
<button (click)="increment()">Increment</button>
<button (click)="decrement()">Decrement</button>
```

> Signals are read in templates by calling them as functions — `counter()`, not `counter`.

## Signals vs. Traditional Properties

| | Traditional property | Signal |
|---|---|---|
| Change detection | Zone.js / `markForCheck` | Automatic (fine-grained) |
| Derived values | Manual computation | `computed()` |
| Side effects | `ngOnChanges` / `ngOnInit` | `effect()` |
| Template reads | `{{ prop }}` | `{{ prop() }}` |

## Further Reading

- [Angular Signals guide](https://angular.dev/guide/signals)
- [Angular Signals API reference](https://angular.dev/api/core/signal)
