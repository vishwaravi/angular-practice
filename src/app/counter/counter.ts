import { Component, computed, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  counter = signal(1);
  doubleCounter:Signal<number> = computed(() => this.counter() * 2); 

  increment() {
    this.counter.set((this.counter() + this.counter()));
  }
  decrement() {
    if(this.counter() > 0)
      this.counter.set(this.counter() - 1);
  }
}
