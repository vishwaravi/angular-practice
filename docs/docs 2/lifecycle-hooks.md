# Component Lifecycle Hooks

> **Source:** `src/app/lifecyclehooks/`

## Overview

Angular manages the creation, change detection, and destruction of every component/directive through a defined lifecycle. Hooks are interface methods you implement to run code at a specific phase.

## Hook Execution Order

```
constructor()
    ↓
ngOnChanges()       ← called before ngOnInit if @Input properties exist
    ↓
ngOnInit()
    ↓
ngDoCheck()
    ↓
ngAfterContentInit()
    ↓
ngAfterContentChecked()
    ↓
ngAfterViewInit()
    ↓
ngAfterViewChecked()
    ↓
ngOnDestroy()
```

---

## Hooks Used in This Project

### `OnChanges` — `ChildComp`

```typescript
// src/app/lifecyclehooks/child-comp/child-comp.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({ selector: 'app-child-comp', ... })
export class ChildComp implements OnChanges {

  @Input() fruits: any = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fruits']) {
      console.log('Changed', changes['fruits']);
    }
  }
}
```

**When it runs:** Every time a bound `@Input` property value changes (including the first time the component is initialised).

**`SimpleChanges`** is a dictionary keyed by input property name. Each entry is a `SimpleChange` object with:

| Property | Description |
|---|---|
| `currentValue` | The new value |
| `previousValue` | The old value |
| `firstChange` | `true` on the very first change |

---

### `AfterContentInit` — `OninitComp`

```typescript
// src/app/lifecyclehooks/oninit-comp/oninit-comp.ts
import { AfterContentInit, Component, ContentChildren, ElementRef, QueryList } from '@angular/core';

@Component({ selector: 'app-oninit-comp', ... })
export class OninitComp implements AfterContentInit {

  @ContentChildren('msg') elems!: QueryList<ElementRef>;

  ngAfterContentInit(): void {
    this.elems.forEach(element => {
      console.log(element.nativeElement.textContent);
    });
  }
}
```

**When it runs:** Once, after Angular projects external content into the component's `<ng-content>` slot.

**`@ContentChildren`** queries projected content (children passed between the component's opening and closing tags in the parent template), as opposed to `@ViewChildren` which queries the component's own template.

**Usage in parent template:**

```html
<app-oninit-comp>
  <p #msg>First projected message</p>
  <p #msg>Second projected message</p>
</app-oninit-comp>
```

---

## Common Hooks — Quick Reference

| Hook | Interface | Typical Use |
|---|---|---|
| `ngOnChanges` | `OnChanges` | React to `@Input` changes |
| `ngOnInit` | `OnInit` | Fetch data, initialise state (runs once) |
| `ngDoCheck` | `DoCheck` | Custom change detection |
| `ngAfterContentInit` | `AfterContentInit` | Access projected content |
| `ngAfterViewInit` | `AfterViewInit` | Access child view elements / DOM |
| `ngOnDestroy` | `OnDestroy` | Clean up subscriptions, timers |

## Best Practices

- Prefer `ngOnInit` over `constructor` for any initialisation logic that depends on `@Input` values or injected services.
- Always unsubscribe from Observables in `ngOnDestroy` (or use the `takeUntilDestroyed` operator from Angular 16+).
- `ngOnChanges` is only called for `@Input`-decorated properties; it does not fire for changes to nested object properties by reference.

## Further Reading

- [Lifecycle hooks guide](https://angular.dev/guide/components/lifecycle)
