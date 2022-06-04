import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ac-login',
  template: `

        <mat-card class="mat-elevation-z4">
          <mat-card-title class="text-center pb-3" *ngIf="title">{{title}}</mat-card-title>
          <mat-card-content>
            <ng-content select=".form-column"></ng-content>
          </mat-card-content>
        </mat-card>

  `,
  styles: [
    `
      mat-card-title {
        color: var(--light-black);
      }

    `
  ]
})
export class LoginComponent implements OnInit {
  @Input() title: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
