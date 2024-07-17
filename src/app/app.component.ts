import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BtnAddComponent } from './components/button/btn-add/btn-add.component';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule, ReactiveFormsModule, BtnAddComponent, TableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  ngOnInit(){
    this.user_data_form.patchValue({
      workout_type: "Select"
    })
  }

  user_data_form = new FormGroup({
    username: new FormControl(""),
    workout_type: new FormControl(""),
    workout_mins: new FormControl(""),
  })

  table_headers = {
    "username": "Name",
    "workout_types": "Workouts",
    "workout_count": "Number of Workouts",
    "workout_mins": "Total Workout Minutes",
  }
}
