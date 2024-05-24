import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Data } from '../data';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  dataForm!: FormGroup;
  stdDeviation!: number;
  mean!: number;
  calculations: Data[] = [];

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      data: ['', Validators.required]
    });
    this.getCalculations();
  }

  calculateStdDeviation() {
    if (this.dataForm.invalid) {
      return;
    }

    const data = this.dataForm.value.data.split(',').map(Number);
    this.dataService.calculateStd(data)
      .subscribe(response => {
        this.stdDeviation = response.std_deviation;
        this.mean = response.mean;
        this.saveCalculation(data, response.mean, response.std_deviation);
      });
  }

  saveCalculation(data: number[], mean: number, stdDeviation: number) {
    const calculation: Data = { data, mean, stdDeviation }; // Ensure correct property names
    this.dataService.saveCalculation(calculation)
      .subscribe(() => {
        console.log('Calculation saved successfully');
        this.getCalculations(); // Refresh the calculations list
      });
  }

  getCalculations() {
    this.dataService.getCalculations()
      .subscribe(calculations => {
        this.calculations = calculations.filter(calculation => calculation.data !== undefined);
      });
  }
}
