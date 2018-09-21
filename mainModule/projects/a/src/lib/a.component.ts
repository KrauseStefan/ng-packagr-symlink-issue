import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-a',
  template: `
    <p>
      a works!
    </p>
  `,
  styles: []
})
export class AComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
