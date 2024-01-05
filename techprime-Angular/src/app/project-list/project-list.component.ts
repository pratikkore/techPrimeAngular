// project-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectListService } from 'src/Services/project-list.service';
import { DatePipe } from '@angular/common';

export interface ProjectData {
  id: string;
  ProjectName: string;
  Reason: string;
  Type: string;
  Division: string;
  Category: string;
  Priority: string;
  Dept: string;
  Location: string;
  Status: string;
  Action: string;
  StartDate: string;
  EndDate: string;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  displayedColumns: string[] = [
    'ProjectName',
    'Reason',
    'Type',
    'Division',
    'Category',
    'Priority',
    'Dept',
    'Location',
    'Status',
    'Action',
  ];
  readonly sortingOption = [
    'ProjectName',
    'StartDate',
    'EndDate',
    'Priority',
    'Type',
    'Reason',
    'Status',
    'Division',
    'Category',
    'Location',
  ];

  dataSource = new MatTableDataSource<ProjectData>([]);
  selectedSort: string = 'Priority';
  size = 7;
  pageIndex = 1;
  // p = 1;
  data: any;
  constructor(private projectService: ProjectListService) {}
  ngOnInit(): void {
    this.getProjectData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProjectData() {
    this.projectService
      .getProjectData(this.selectedSort)
      .subscribe((data: any) => {
        this.data = data;
        this.dataSource = new MatTableDataSource(this.data.slice(0, this.size));
        console.log(data);
      });
  }

  statusClick(_id: any, status: string) {
    this.projectService
      .updateStatus({ id: _id, status: status })
      .subscribe((data: any) => {
        console.log(data);
        this.getProjectData();
      });
  }

  paginate(event: any) {
    this.pageIndex = event;
    console.log(this.data);
    
    this.dataSource = new MatTableDataSource(
      this.data.slice(event * this.size - this.size, event * this.size)
    );
  }

  getLastPage() {
    this.pageIndex = Math.ceil(this.data.length / this.size);
    return this.pageIndex;
  }

  getLastIndex() {
    return Math.ceil(this.data.length / this.size);
  }
}
