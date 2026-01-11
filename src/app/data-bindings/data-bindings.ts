import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-bindings',
  imports: [FormsModule,],
  templateUrl: './data-bindings.html',
  styleUrl: './data-bindings.css',
})
export class DataBindings {
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
