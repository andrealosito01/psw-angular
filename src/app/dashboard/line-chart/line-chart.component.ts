import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {

  public chartOptions: any;
  @Input() name:string = "";
  @Input() values!:number[];
  @Input() labels!:string[];

  constructor() {
    this.chartOptions = {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [],
        labels:{
          show:true
        }
      }
    };
  }

  ngOnInit(){
    if(this.values.length-6 > 0 && this.labels.length-6 > 0){
      this.chartOptions.xaxis.max = this.values.length;
      this.chartOptions.xaxis.min = this.values.length-6;
    }
    this.chartOptions.series = [{
      name:this.name,
      data:this.values.reverse()
    }]
    this.chartOptions.xaxis.categories = this.labels.reverse();
  }

}
