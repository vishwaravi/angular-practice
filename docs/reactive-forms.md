# Reactive Forms

> **Source:** `src/app/reactive-forms/`

## Overview

Angular Reactive Forms give you explicit, immutable control over the form model in the component class. The model is built programmatically and is synchronised with the template, making it easier to unit-test and compose complex validation logic.

Compare to **Template-driven forms** (which use `ngModel`): Reactive forms keep the source of truth in the component, not the template.

## Setup

Import `ReactiveFormsModule` in the standalone component (or in a shared module):

```typescript
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  ...
})
```

---

## Key Classes

| Class | Description |
|---|---|
| `FormControl` | Tracks the value and validity of a single input |
| `FormGroup` | Groups multiple `FormControl`s into one object |
| `FormArray` | Manages an array of controls (dynamic lists) |
| `FormBuilder` | Service that simplifies creating form models |

---

## Example — Profile Form

```typescript
// src/app/reactive-forms/reactive-form/reactive-form.ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.html',
})
export class ReactiveForm {

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  onSubmit(): void {
    console.log(this.profileForm.value);
    // { firstName: '...', lastName: '...' }
  }
}
```

```html
<!-- reactive-form.html -->
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">

  <label>
    First Name
    <input type="text" formControlName="firstName" />
  </label>

  <label>
    Last Name
    <input type="text" formControlName="lastName" />
  </label>

  <button type="submit" [disabled]="profileForm.invalid">Submit</button>
</form>
```

---

## Validation

Add built-in validators via `Validators`:

```typescript
import { FormControl, FormGroup, Validators } from '@angular/forms';

profileForm = new FormGroup({
  firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
  lastName:  new FormControl('', Validators.required),
});
```

Show validation errors in the template:

```html
<div *ngIf="profileForm.get('firstName')?.invalid && profileForm.get('firstName')?.touched">
  First name is required (min 2 characters).
</div>
```

---

## Reading Form Values

| Expression | Returns |
|---|---|
| `profileForm.value` | Object with current values of all controls |
| `profileForm.get('firstName')?.value` | Value of a single control |
| `profileForm.valid` | `true` when all controls pass validation |
| `profileForm.dirty` | `true` if any control value has changed |
| `profileForm.touched` | `true` if any control has been blurred |

---

## FormBuilder Shorthand

`FormBuilder` reduces boilerplate:

```typescript
import { inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

export class ReactiveForm {
  private fb = inject(FormBuilder);

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName:  [''],
  });
}
```

## Further Reading

- [Reactive forms guide](https://angular.dev/guide/forms/reactive-forms)
- [Form validation](https://angular.dev/guide/forms/form-validation)
