# Data Bindings

> **Source:** `src/app/data-bindings/`

## Overview

Angular provides four types of data binding that connect the component class to its template. They cover one-way flows in both directions as well as a two-way shorthand.

## Types of Binding

### 1. Interpolation `{{ expression }}`

Renders a component property as text inside the template.

```html
<h2>Hello, {{ fullName }}!</h2>
```

```typescript
export class DataBindings {
  fullName = 'Vijay';
}
```

### 2. Property Binding `[property]="expression"`

Sets a DOM property or component `@Input` to a component value. Evaluated as an expression, not a string.

```html
<img [src]="imgUrl" [alt]="fullName" />
```

```typescript
export class DataBindings {
  imgUrl = 'https://pic.pnnet.dev/128x128';
}
```

> Use property binding instead of attribute binding (`attr.src`) when setting DOM properties.

### 3. Event Binding `(event)="handler()"`

Listens to DOM events and calls a component method.

```html
<button (click)="incrementCounter()">+1</button>
<button (click)="resetCounter()">Reset</button>
<p>Count: {{ counter }}</p>
```

```typescript
export class DataBindings {
  counter = 0;

  incrementCounter(): void {
    this.counter++;
  }

  resetCounter(): void {
    this.counter = 0;
  }
}
```

### 4. Two-Way Binding `[(ngModel)]="property"`

Combines property binding and event binding into a single syntax. Requires `FormsModule`.

```html
<input [(ngModel)]="fullName" />
<p>Live value: {{ fullName }}</p>
```

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  ...
})
export class DataBindings {
  fullName = 'Vijay';
}
```

`[(ngModel)]` is syntactic sugar for:

```html
<input [ngModel]="fullName" (ngModelChange)="fullName = $event" />
```

## Binding Summary

| Syntax | Direction | Use case |
|---|---|---|
| `{{ value }}` | Component → DOM | Display text |
| `[property]="value"` | Component → DOM | Set element/component inputs |
| `(event)="handler()"` | DOM → Component | React to user actions |
| `[(ngModel)]="value"` | Both | Form inputs |

## Further Reading

- [Angular binding overview](https://angular.dev/guide/templates/binding)
- [Two-way binding](https://angular.dev/guide/templates/two-way-binding)
