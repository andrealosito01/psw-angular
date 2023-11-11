import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-macro-chart',
  templateUrl: './macro-chart.component.html',
  styleUrls: ['./macro-chart.component.css']
})
export class MacroChartComponent {
  public chartOptions: any;
  @Input() valoriAttuali!:number[];
  @Input() valoriFinali!:number[];

  constructor() {
    this.chartOptions = {
      chart: {
        height: 390,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      colors: ["#f1c232", "#6aa84f", "#cc0000", "#674ea7"],
      labels: ["Carboidrati", "Fibre", "Proteine", "Grassi totali"],
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 150,
        offsetY: 10,
        labels: {
          useSeriesColors: true
        },
        formatter: function(seriesName:any, opts:any) {
          return seriesName
        },
        itemMargin: {
          horizontal: 3
        }
      },
      responsive: [
        {
          breakpoint: 1400,
          options: {
            legend: {
              show:true,
              offsetX: 100
            }
          }
        },
        {
          breakpoint: 1025,
          options: {
            legend: {
              show:true,
              offsetX: 50
            }
          }
        },
        {
          breakpoint: 992,
          options: {
            legend: {
              show:true,
              offsetX: 0
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            legend: {
              show:true,
              offsetX: -50
            }
          }
        },
        {
          breakpoint: 576,
          options: {
            legend: {
              show:true,
              offsetX: 100
            }
          }
        },
        {
          breakpoint: 432,
          options: {
            legend: {
              show:true,
              offsetX: 0
            }
          }
        }
      ]
    };
  }

  ngOnInit(){
    this.chartOptions.series = this.valoriAttuali.map((x,i) => (x / this.valoriFinali[i])*100);
  }

}
