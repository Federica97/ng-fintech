import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ac-navigation-menu',
  template: `

    <mat-drawer-container>
      <mat-drawer class="pt-3" #drawer opened="true" mode="side" style="background-color: var(--dark-white);">
        <div style="padding-left: 20px;">
          <h2>Menu</h2>
        </div>
        <mat-list style="background-color: #fff">
          <mat-list-item routerLink="/dashboard" routerLinkActive="sidenav-link-active" [routerLinkActiveOptions]="{exact:true}">
            <mat-icon mat-list-icon matPrefix>home</mat-icon>
            <div mat-line>Home</div>
          </mat-list-item>
          <mat-divider></mat-divider>
          <mat-list-item routerLink="/dashboard/cards" routerLinkActive="sidenav-link-active">
            <mat-icon mat-list-icon matPrefix>credit_card</mat-icon>
            <div mat-line>Cards</div>
          </mat-list-item>
          <mat-divider></mat-divider>
          <mat-list-item routerLink="/dashboard/movements" routerLinkActive="sidenav-link-active">
            <mat-icon mat-list-icon matPrefix>receipt_long</mat-icon>
            <div mat-line>Movements</div>
          </mat-list-item>
          <mat-divider></mat-divider>
          <mat-list-item routerLink="/dashboard/transfer" routerLinkActive="sidenav-link-active">
            <mat-icon mat-list-icon matPrefix>paid</mat-icon>
            <div mat-line>Transfer</div>
          </mat-list-item>
          <mat-divider></mat-divider>
          <mat-list-item routerLinkActive="sidenav-link-active">
            <mat-icon mat-list-icon matPrefix>event</mat-icon>
            <div mat-line>Appointments</div>
          </mat-list-item>
          <mat-divider></mat-divider>
          <mat-list-item routerLinkActive="sidenav-link-active">
            <mat-icon mat-list-icon matPrefix>summarize</mat-icon>
            <div mat-line>Taxes</div>
          </mat-list-item>
          <mat-divider></mat-divider>
          <mat-list-item>
            <mat-icon mat-list-icon matPrefix>person</mat-icon>
            <div mat-line>Nome Cognome</div>
            <div mat-line>Logout</div>
          </mat-list-item>
        </mat-list>
      </mat-drawer>
      <mat-drawer-content>

      <mat-toolbar color="primary">
        <span>Fintech</span>
        <span class="example-spacer"></span>
        <!--<button mat-button routerLink="/login/sign-in" class="example-icon favorite-icon"
                aria-label="Example icon-button with heart icon">
          Login
        </button>-->
      </mat-toolbar>
      <router-outlet></router-outlet>
      </mat-drawer-content>

    </mat-drawer-container>


  `,
  styles: [`

    mat-drawer-container {
      width: 100%;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.5);
    }


    mat-drawer-content {
      background-color: var(--dark-white);
    }

    mat-drawer {
      width: 250px;
    }

    mat-list {
      margin: 0;
      height: 100vh;
      cursor: pointer;
    }

    mat-list-item:hover {
      background-color: var(--dark-white);
    }


  `]
})
export class NavigationMenuComponent {

  constructor() {
  }


}
