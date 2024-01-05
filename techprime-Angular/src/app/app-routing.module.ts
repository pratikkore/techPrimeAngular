import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { authguardGuard } from './authguard.guard';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'Project',
    component: SideNavComponent,
    canActivate: [authguardGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'create-project',
        component: CreateProjectComponent,
        canActivate: [authguardGuard],
        data: { logoActive: true }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authguardGuard],
        data: { logoActive: true }
      },
      {
        path: 'project-list',
        component: ProjectListComponent,
        canActivate: [authguardGuard],
        data: { logoActive: true }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
