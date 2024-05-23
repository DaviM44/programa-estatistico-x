import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  dataForm!: FormGroup;
  stdDeviation!: number;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      data: ['', Validators.required]
    });
  }

  calculateStdDeviation() {
    if (this.dataForm.invalid) {
      return;
    }

    const data = this.dataForm.value.data.split(',').map(Number);
    this.dataService.calculateStd(data)
      .subscribe(response => {
        this.stdDeviation = response.std_deviation;
        this.saveCalculation(data, response.std_deviation);
      });
  }

  saveCalculation(data: number[], stdDeviation: number) {
    this.dataService.saveCalculation({ data, stdDeviation })
      .subscribe(() => console.log('Calculation saved successfully'));
  }
}
