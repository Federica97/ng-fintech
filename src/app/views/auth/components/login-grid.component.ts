import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-login-grid',
  template: `
    <mat-grid-list cols="2" [style.background]="'#E5E6E4'">
      <mat-grid-tile>
        <ng-content select=".first-col"></ng-content>
      </mat-grid-tile>
      <mat-grid-tile>
        <ng-content select=".second-col"></ng-content>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styles: [
  ]
})
export class LoginGridComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
