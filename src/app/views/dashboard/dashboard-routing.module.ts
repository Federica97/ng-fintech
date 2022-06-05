import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {AuthGuard} from "../../core/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'cards', loadChildren: () => import('../card/card.module').then(m => m.CardModule) },
      { path: 'movements', loadChildren: () => import('../movements/movements.module').then(m => m.MovementsModule) },
      { path: 'movements/:cardId', loadChildren: () => import('../movements/movements.module').then(m => m.MovementsModule) },
      { path: 'transfer', loadChildren: () => import('../transfer/transfer.module').then(m => m.TransferModule) },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
