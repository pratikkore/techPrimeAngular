import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStartDate } from '@angular/material/datepicker';
import { CreateProjectService } from 'src/Services/create-project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  projectName: any[] = [];

  reason: any[] = [];

  type: any[] = [];

  division: any[] = [];

  category: any[] = [];

  priority: any[] = [];

  dept: any[] = [];

  location: any[] = [];

  createProjectform = new FormGroup({
    ProjectName: new FormControl('', [Validators.required]),
    Reason: new FormControl(''),
    Type: new FormControl(''),
    Division: new FormControl(''),
    Category: new FormControl(''),
    Priority: new FormControl(''),
    Department: new FormControl(''),
    Location: new FormControl(''),
    StartDate: new FormControl('', [Validators.required]),
    EndDate: new FormControl('', [Validators.required]),
  });
  startDate: any;
  endDate: any;
  statusvalue: any = 'Registerd';

  constructor(private createProjectService: CreateProjectService) {}
  ngOnInit(): void {
    this.getReasonData();
  }

  getReasonData() {
    this.createProjectService.getReasonData().subscribe((data: any) => {
      console.log(data);
      this.reason = data;
      this.getTypeData();
    });
  }

  getTypeData() {
    this.createProjectService.getTypeData().subscribe((data: any) => {
      console.log(data);
      this.type = data;
      this.getDivisionData();
    });
  }

  getDivisionData() {
    this.createProjectService.getDivisionData().subscribe((data: any) => {
      console.log(data);
      this.division = data;
      this.getCategoryData();
    });
  }

  getCategoryData() {
    this.createProjectService.getCategoryData().subscribe((data: any) => {
      console.log(data);
      this.category = data;
      this.getPriorityData();
    });
  }

  getPriorityData() {
    this.createProjectService.getPriorityData().subscribe((data: any) => {
      console.log(data);
      this.priority = data;
      this.getDeptData();
    });
  }

  getDeptData() {
    this.createProjectService.getDeptData().subscribe((data: any) => {
      console.log(data);
      this.dept = data;
      this.getLocationData();
    });
  }

  getLocationData() {
    this.createProjectService.getLocationData().subscribe((data: any) => {
      console.log(data);
      this.location = data;
    });
  }

  onSaveProject() {
    if (this.createProjectform.valid) {
      const data: any = {
        ProjectName: this.projectName,
        Reason: this.reason,
        Type: this.type,
        Division: this.division,
        Category: this.category,
        Priority: this.priority,
        Department: this.dept,
        Location: this.location,
        StartDate: this.startDate,
        EndDate: this.endDate,
      };

      this.createProjectService
        .saveProjectData(this.createProjectform.value)
        .subscribe(
          (response) => {
            console.log('Project Successfully saved:', response);
          },
          (error) => {
            console.error('Error in Project save Request:', error);
          }
        );
    } else {
      console.error('Form is invalid. Cannot submit.');
    }
  }
}
