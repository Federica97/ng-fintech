import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-snackbar',
  template: `
    <p>
      snackbar works!
    </p>
  `,
  styles: [
  ]
})
export class SnackbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
