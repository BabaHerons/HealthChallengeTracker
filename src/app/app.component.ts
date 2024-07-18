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
      workout_type: "Select",
      username: "",
      workout_mins: ""
    })

    if (!localStorage.getItem("userData")){
      localStorage.setItem("userData", JSON.stringify(this.userData))
    }
  }

  userData = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    },
  ]

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

  add_workout_data(){
    // GETTING THE DATA FROM LOCALSTORAGE
    let old_data = JSON.parse(localStorage.getItem("userData")!)

    // SETTING THE NEW USER FLAG TO CHECK THE EXISTING USER
    let new_user_flag:boolean = true

    // LOOPING EVERY ELEMENT OF THE LIST TO CHECK THE USER
    for (let i=0; i<old_data.length; i++){
      let user = old_data[i]

      // CHECKS FOR THE OLD USER
      if (user.name == this.user_data_form.controls.username.value){
        new_user_flag = false
        let workouts = user.workouts
        let new_workout_flag = true

        // UPDATING THE WORKOUT FOR THE EXISTING USER
        for (let k=0; k<workouts.length; k++){
          let workout = workouts[k]

          // IF CURRENT WORKOUT TYPE EXISTS THEN UPDATING THE 'MINUTES'
          if (workout.type == this.user_data_form.controls.workout_type.value){
            new_workout_flag = false
            workout.minutes = Number(workout.minutes) + Number(this.user_data_form.controls.workout_mins.value)
          }
        }

        // IF IT IS A NEW WORKOUT THEN ADDING A NEW ENTRY
        if (new_workout_flag) {
          workouts.push({
            type: this.user_data_form.controls.workout_type.value,
            minutes: this.user_data_form.controls.workout_mins.value
          })
        }
        alert("User updated.")
      }
    }

    // IF NEW USER FOUND THEN ADD A NEW ENTRY IN THE userData
    if (new_user_flag){
      old_data.push({
        id: old_data.length + 1,
        name: this.user_data_form.controls.username.value,
        workouts: [
          {
            type: this.user_data_form.controls.workout_type.value,
            minutes: this.user_data_form.controls.workout_mins.value
          }
        ]
      })
      alert("New user added.")
    }

    // SETTING THE UPDATED VALUE TO LOCALSTORAGE
    localStorage.setItem("userData", JSON.stringify(old_data))
    this.ngOnInit()
  }
}
