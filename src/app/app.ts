import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Counter } from './counter/counter';
import { DataBindings } from './data-bindings/data-bindings';
import { Directives } from './directives/directives';
import { Highlight } from './highlight';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter, DataBindings, Directives, Highlight],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  fullName = "Vijay"
  imgUrl = "https://pic.pnnet.dev/128x128";

  counter = 0;

  incrementCounter():void {
    this.counter++;  
  }
  resetCounter():void {
    this.counter = 0;
  }
}
