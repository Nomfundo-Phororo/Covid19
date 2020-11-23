import { Isymptoms } from './../symptom';
import { Component, OnInit } from '@angular/core';
import { SymptomsService } from './../symptoms.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  symptoms:Isymptoms[];
  errorMessage: string;
  constructor(private symptomsService:SymptomsService) { }

  ngOnInit(): void {
    this.symptomsService.getSymptoms().subscribe({
      next: symptoms => {
        this.symptoms=symptoms;
        
      },
      error: err => this.errorMessage = err
    });
  }

}
