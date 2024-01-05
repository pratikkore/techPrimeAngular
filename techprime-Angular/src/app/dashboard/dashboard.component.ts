import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/Services/dashboard.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  isHighcharts: boolean = false;
  chartOptions: any = null;
  projectStatusCounts:any={};
  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.getProjectStatusCount();
    this.getCharts();
  }

  getProjectStatusCount(){
    this.dashboardService.getProjectStatusCount().subscribe(status =>{
      console.log(status);
      
      this.projectStatusCounts=status;
    });
  }
  getCharts() {
    this.dashboardService.getChartData().subscribe((response: any) => {
      console.log(response);
      // if (response.status === 200) {
        const dept: any = [];

        const closeData: any = [];
        const totalData: any = [];
        response.forEach((d: any) => {
          const succesPer = Math.ceil((d.closedCount / d.TotalCount) * 100);
          dept.push('<b>' + succesPer + '%</b> <br> <br>' + d.department);
          closeData.push(d.closedCount);
          totalData.push(d.TotalCount);
        });
        const series = [
          {
            name: 'Total',
            data: totalData,
            color: 'blue',
          },
          {
            name: 'Closed',
            data: closeData,
            color: 'green',
          },
        ];
        this.chartOptions = {
          chart: {
            type: 'column',
          },
          xAxis: {
            categories: dept,
            crosshair: true,
          },
          plotOptions: {
            series: {
              borderRadius: 4,
              pointWidth: 15,
            },
            column: {
              dataLabels: {
                enabled: true,
              },
            },
          },

          series: series,
        };
        this.isHighcharts = true;
        console.log(this.chartOptions,"chart");
        
      // }
    });
  }
}
