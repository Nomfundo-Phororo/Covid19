import { RecoveriesService } from './../recoveries.service';
import { StatisticsService } from './../statistics.service';
import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import {IdeathsAndNewCases} from '../statistics';
import {Irecoveries} from '../recoveriesStat';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  

  lineGraph: any = [];
  linegraphRec: any=[];
  linegraphDeath: any=[];
  statistics:IdeathsAndNewCases[];
  recovery:Irecoveries[];
 
  errorMessage: string;
  constructor(private statisticsService:StatisticsService, private recoveryService:RecoveriesService){}
  ngOnInit(): void {
    this.statisticsService.getStats().subscribe({
      next: statistics => {
        this.statistics=statistics;

        const Dates=statistics.map(o=>o.Date_reported);
        
        const Death=statistics.map(o=>o.New_deaths);
     
        const newCase=statistics.map(o=>o.New_cases);
      


        this.recoveryService.getRecoveries().subscribe({
          next: recovery=>{
            console.log(recovery);
            this.recovery=recovery;
            const Dates1=recovery.map(a=>a.Date);
            console.log(Dates1);
            const RecoverycCases=recovery.map(a=>a.Recoveries);
             console.log(RecoverycCases);
    
             this.linegraphDeath = new Chart('linechart', {
              type: 'line',
              data: {
                labels: Dates,
                datasets: [{
                  label: 'News Covid19 cases per day from February to November 2020',
                  data: newCase,
                  fill: true,
                  lineTension: 0.5,
                  borderColor: '#4680ff',
                  borderWidth: 2
                },
                {
                  label: 'News Covid19 recoveries per day from February to November 2020',
                  data: RecoverycCases,
                  fill: true,
                  lineTension: 0.5,
                  borderColor: '#FF1493',
                  borderWidth: 2
                }
              ]
              },
              options: {
                title: {
                  text: '',
                  display: true
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                }
              }
            });   
      }
      
        });


    
         
          this.lineGraph = new Chart('linechartDeath', {
            type: 'line',
            data: {
              labels: Dates,
              datasets: [ {
                label: 'Total Deaths per day from February to November 2020',
                data:Death,
                fill: true,
                lineTension: 0.5,
                borderColor: '#571959',
                borderWidth: 2
              }
           
            ]
            },
            options: {
              title: {
                text: '',
                display: true
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });
   
        
      },
      
      error: err => this.errorMessage = err
    });
    this.recoveryService.getRecoveries().subscribe({
      next: recovery=>{
        console.log(recovery);
        this.recovery=recovery;
        const Dates1=recovery.map(a=>a.Date);
        console.log(Dates1);
        const RecoverycCases=recovery.map(a=>a.Recoveries);
         console.log(RecoverycCases);

    this.linegraphRec = new Chart('linechart2', {
      type: 'line',
      data: {
        labels: Dates1,
        datasets: [{
          label: 'News Covid19 recoveries per day from February to November 2020',
          data: RecoverycCases,
          fill: true,
          lineTension: 0.5,
          borderColor: '#FF1493',
          borderWidth: 2
        }
     
      ]
      },
      options: {
        title: {
          text: '',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });    
  }
  
    });
  
    }
}
