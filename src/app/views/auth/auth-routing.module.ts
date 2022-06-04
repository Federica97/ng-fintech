import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'sign-in', loadChildren: () => import('./modules/sign-in/sign-in.module').then(m => m.SignInModule) },
      { path: 'register', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule) },
      { path: '', redirectTo:'sign-in'}
    ]
  }

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
