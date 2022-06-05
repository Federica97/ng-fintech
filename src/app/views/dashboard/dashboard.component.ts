import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-dashboard',
  template: `
   <ac-navigation-menu></ac-navigation-menu>
  `,
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
