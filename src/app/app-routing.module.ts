import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  {path:'PdfViewer', component:PdfViewerComponent},
  {path:'Login', component:LoginComponent},
  {
    path: 'User',
    loadChildren: () =>
      import('./common/Common.module').then((m) => m.CommonModule),
  },
  {
    path: 'Admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'IQC',
    loadChildren: () =>
      import('./iqcuser/iqcuser.module').then((m) => m.IqcuserModule),
  },
  {
    path: 'Auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  }, 
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/layout.module').then((m) => m.LayoutModule),
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
