import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    const todosValue = changes['todos'];
    if (todosValue.currentValue) {
      this.data = new Array(1).fill(this.todos.length)
      this.barChartData[0].data = this.data
      console.log(this.barChartData[0].data)
    }
  }

  @Input() todos: Todo[];
  data: number[];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = ["todos"];
  public barChartType = 'doughnut';
  public barChartLegend = true;
  public barChartData = [
    {
      data: [], label: ["todos"], backgroundColor: [
        'rgba(234,215,215,.7)',
      ],
      borderColor: [
        'rgba(255,255,255)',
      ],
      animation: { duration: 8000 },
      scales: {
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            max: 100,
            min: 0,
            beginAtZero: true,
            stepSize: 1,
          }
        }],
        xAxes: [{
          ticks: {
            min: 0,
            beginAtZero: true,
          }
        }]
      }
    }
  ]
}
