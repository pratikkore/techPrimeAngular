import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  readonly createProjectActiveImg = 'assets/Images/create-project-active.svg';
  readonly createProjectImg = 'assets/Images/create-project.svg';

  readonly dashboardActiveImg = 'assets/Images/Dashboard-active.svg';
  readonly dashboardImg = 'assets/Images/Dashboard.svg';

  readonly projectActiveListImg = 'assets/Images/Project-list-active.svg';
  readonly projectListImg = 'assets/Images/Project-list.svg';

  readonly logoutImg = 'assets/Images/Logout.svg';

}
  
