import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-calorie-chart',
  templateUrl: './calorie-chart.component.html',
  styleUrls: ['./calorie-chart.component.css']
})
export class CalorieChartComponent {

  public chartOptions: any;
  private energia!:number;
  @Input() valoreAttuale!:number;
  @Input() valoreFinale!:number;

  constructor() {
    this.chartOptions = {
      chart: {
        height: 390,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "70%"
          },
          dataLabels: {
            showOn: "always",
            name: {
              offsetY: 10,
              show: true,
              color: "#000",
              fontSize: "27px",
            },
            value: {
              show: false
            }
          }
        }
      },
      fill:{
        colors:['#9e2828'],
        type:"solid",
        opacity:1
      }
    }
  }

  ngOnInit(){
      this.energia = (this.valoreAttuale/this.valoreFinale)*100;
      this.chartOptions.series = [this.energia];
      let label = this.valoreAttuale + "/" + this.valoreFinale;
      this.chartOptions.labels = [label];
  }

}
