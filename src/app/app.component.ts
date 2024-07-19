import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BtnAddComponent } from './components/button/btn-add/btn-add.component';
import { TableComponent } from './components/table/table.component';
import  Chart from 'chart.js/auto';

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
    // PATCH THE USER DATA FORM  SO THAT IT WON'T BE EMPTY
    this.user_data_form.patchValue({
      workout_type: "Select",
      username: "",
      workout_mins: ""
    })

    // CHECKING THE AVAAILABILITY OF USER DATA IN LOCALSTORAGE
    if (!localStorage.getItem("userData")){
      localStorage.setItem("userData", JSON.stringify(this.userData))
    }

    // UPDATING THE USER DATA
    this.userData = JSON.parse(localStorage.getItem("userData")!)
    
    // GETTING THE WORKOUT DATA FOR THE TABLE
    this.get_workout_data()

    // SETTING THE INITIAL GRAPH DETAILS
    this.update_graph(this.userData[0])
  }

  // CREATING THE CHART AFTER THE DOM RENDERS
  ngAfterViewInit(){
    this.createChart()
  }


  newUserData:any = []
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

  // THIS FUNCTION TAKES THE userData AND RETURN THE DATA FORMATTED FOR THE TABLE
  compile_data(userData:any){
    let result = []
    for (let i=0; i<userData.length; i++){
      let user = userData[i]
      let data = {
        username: "",
        workout_types:"",
        workout_count:"",
        workout_mins:0,
      }
      data.username = user.name
      data.workout_count = user.workouts?.length
      for (let k=0; k<user.workouts?.length; k++){
        let workout = user.workouts[k]
        data.workout_mins += workout.minutes
        if (data.workout_types == ""){
          data.workout_types += workout.type
        }
        else {
          data.workout_types += ", " + workout.type
        }
      }
      result.push(data)
    }
    return result
  }

  user_data_form = new FormGroup({
    username: new FormControl(""),
    workout_type: new FormControl(""),
    workout_mins: new FormControl(""),
  })

  // WORKOUT DATA TABLE HEADERS
  table_headers = {
    "username": "Name",
    "workout_types": "Workouts",
    "workout_count": "Number of Workouts",
    "workout_mins": "Total Workout Minutes",
  }

  // FUNCTIONT TO ADD THE WORKOUT DATA FOR THE USER
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

  // THIS FUNCTION SIMULATES THE API CALL FOR GETTING THE WORKOUT DATA FROM THE BACKEND
  get_workout_data(enoff: number[] = [5, 0]){
    let from = enoff[1]
    let to = enoff[1] + enoff[0]
    this.newUserData = this.compile_data(JSON.parse(localStorage.getItem("userData")!))
    this.newUserData = this.newUserData.slice(from, to)
  }

  chart:any = []
  x_label:any = []
  chart_data:any = []
  custom_label:string = ""
  chart_created:boolean = false

  // FUNCTION TO CREATE THE CHART FOR TRACKING THE WORKOUT PROGRESS
  createChart(){
    let canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d")!
    this.chart = new Chart(ctx, {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        // labels: Object.keys(this.appt_dates),
        labels: this.x_label,
	      datasets: [
          {
            label: this.custom_label + "'s Workout",
            data: this.chart_data,
            backgroundColor: '#a8d1df',
            // type: "bar"
          },
        ]
      },
      options: {
        aspectRatio:2.5,
        // indexAxis:'y',
        scales:{
          x: {
            // max:1000000000,
            ticks:{
              stepSize:1
            }
          }
        }
      },
      
    });
    this.chart_created = true
  }

// FUNCTION TO UPDATE THE GRAPH UPON USER SELECTION
  update_graph(user:any){
    this.custom_label = user.name
    this.get_graph_data(user)
    if (this.chart_created){
      this.chart.destroy()
    }
    this.createChart()
  }

  // FUNCTION TO UPDATE THE X-AXIS & Y-AXIS UPON PASSING A USER DATA
  get_graph_data(user:any){
    let x = []
    let y = []
    for (let i=0; i<user.workouts.length; i++){
      let workout = user.workouts[i]
      x.push(workout.type)
      y.push(workout.minutes)
    }
    this.x_label = x
    this.chart_data = y
  }
}
