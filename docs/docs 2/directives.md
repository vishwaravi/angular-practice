# Directives

> **Source:** `src/app/directives/` (built-in), `src/app/highlight.ts` (custom)

## Overview

Directives extend HTML with new behaviour. Angular has three kinds:

| Kind | Description | Example |
|---|---|---|
| **Component** | Directive with a template | `@Component` |
| **Attribute** | Changes appearance/behaviour of an element | `appHighlight`, `ngClass` |
| **Structural** | Alters the DOM layout by adding/removing elements | `@if`, `@for`, `*ngIf`, `*ngFor` |

---

## Built-in Structural Directives

### `@for` / `*ngFor` — Render a list

```html
<!-- Modern control-flow syntax (Angular 17+) -->
@for (movie of movies; track movie) {
  <li>{{ movie }}</li>
}

<!-- Legacy syntax (still valid) -->
<li *ngFor="let movie of movies">{{ movie }}</li>
```

```typescript
import { CommonModule } from '@angular/common';

@Component({ imports: [CommonModule] })
export class Directives {
  movies = ['Dark Knight', 'Interstellar', 'Inception', 'Shutter Island', 'Seven', 'F1'];
}
```

### `@if` / `*ngIf` — Conditional rendering

```html
<!-- Modern syntax -->
@if (movies.length > 0) {
  <p>{{ movies.length }} movies found.</p>
} @else {
  <p>No movies.</p>
}

<!-- Legacy syntax -->
<p *ngIf="movies.length > 0">{{ movies.length }} movies found.</p>
```

---

## Custom Attribute Directive — `appHighlight`

```typescript
// src/app/highlight.ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight {
  @Input() appHighlight = '';          // accepts a colour string

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight(this.appHighlight || 'yellow');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

### How it works

1. `@Directive` registers the class as a directive matching the `[appHighlight]` attribute selector.
2. `ElementRef` injects a reference to the host DOM element.
3. `@HostListener` listens to DOM events on the host element without adding event listeners manually.
4. The `@Input()` property shares the same name as the selector (`appHighlight`), allowing the colour to be passed inline.

### Usage

```html
<!-- Default yellow highlight -->
<p appHighlight>Hover over me</p>

<!-- Custom colour -->
<p [appHighlight]="'lightblue'">Hover — blue highlight</p>
```

---

## Creating a Custom Directive

```bash
ng generate directive my-directive
```

Minimum structure:

```typescript
import { Directive } from '@angular/core';

@Directive({
  selector: '[appMyDirective]',
})
export class MyDirective {}
```

## Further Reading

- [Built-in directives](https://angular.dev/guide/directives)
- [Attribute directives](https://angular.dev/guide/directives/attribute-directives)
- [Angular control flow (`@if`, `@for`)](https://angular.dev/guide/templates/control-flow)
