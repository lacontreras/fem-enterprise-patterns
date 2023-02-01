import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Console } from 'console';
import { fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-basic-sequence',
  template: `
    <button #btn mat-raised-button color="accent">Click me!</button>
    <div class="container">
      <h1>{{ message }}</h1>
    </div>
  `,
})
export class BasicSequenceComponent implements AfterViewInit {
  @ViewChild('btn') btn;
  message: string;

  ngAfterViewInit() {
    fromEvent(this.getNativeElement(this.btn), 'click')
      .pipe(
        filter((event: KeyboardEvent) => event.shiftKey),
        map((event) => 'TANNER IS AN ELITE PLANNER!')
      )
      .subscribe((result) => {
        console.log('RESULT', result);
        this.message = result;
      });
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
}
