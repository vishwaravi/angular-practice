import { Element } from '@angular/compiler';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight {

  constructor(private el: ElementRef) { }

  @Input() appHighlight = ''

  @HostListener('mouseenter')
  onMouseEnter(){
    this.highlight(this.appHighlight||'yellow');
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.highlight('');
  }

  private highlight(color:string){
    this.el.nativeElement.style.backgroundColor = color
  }
}
 