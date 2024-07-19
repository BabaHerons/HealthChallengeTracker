import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BtnPrevComponent } from '../button/btn-prev/btn-prev.component';
import { BtnNextComponent } from '../button/btn-next/btn-next.component';
import { BtnRefreshComponent } from '../button/btn-refresh/btn-refresh.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    BtnPrevComponent, BtnNextComponent, BtnRefreshComponent, ReactiveFormsModule, CommonModule, FormsModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  constructor() {}

  ngOnInit(){
    this.incoming_table_headers_keys = Object.keys(this.table_headers)
    this.incoming_table_headers_values = Object.values(this.table_headers)
  }

  // SOME INPUT & OUTPUT VALUES FOR THIS 'TABLE' COMPONENT
  @Input() table_headers:any = {}
  @Input() table_records:any = []
  @Input() loading_table:boolean = false
  @Input() s_no:boolean = true
  @Input() custom_not_found:string = "No Data Found"

  @Output() api_call = new EventEmitter
  api_call_emit(entries:Number, offset:Number){
    this.api_call.emit([entries, offset])
  }

  incoming_table_headers_keys:any = []
  incoming_table_headers_values:any = []
  prev_loading:boolean = true
  next_loading:boolean = false
  n:number = 5
  offset:number = 0

  // FOR DISPLAYING THE NUMBER OF RECORDS IN THE PAGE
  select_records(new_value:number){
    this.n = Number(new_value)
    this.offset = 0
    this.api_call_emit(this.n, this.offset)
  }
  

  // FOR PREVIOUS BUTTON
  subtract(){
    this.prev_loading = true
    if ((this.offset > 0) && ((this.offset - this.n) >= 0)){
      this.offset -= this.n
      this.api_call_emit(this.n, this.offset)
      this.prev_loading = false
    }
    this.next_loading = false
  }

  // FOR NEXT BUTTON
  add(){
    this.next_loading = true
    if (this.table_records.length > 0){
      this.offset += this.n
      this.api_call_emit(this.n, this.offset)
    }
    if (this.table_records.length == 0){
      this.next_loading = true
    } else {
      this.next_loading = false
    }
    this.prev_loading = false
  }

  search_text_form = new FormGroup({
    search_text: new FormControl(""),
    start_date: new FormControl(""),
    end_date: new FormControl(""),
    disease:new FormControl(""),
    doc:new FormControl(""),
    patient:new FormControl(""),
    ward:new FormControl(""),
    department:new FormControl(""),
  })

  // SEARCH WITH ANY DATA
  search_by_text(){
    let data = this.search_text_form.value["search_text"]
    let searched_records:any = []

    for (let record of this.table_records){
      for (let header of this.incoming_table_headers_keys){
        if (String(record[header])?.toLowerCase().includes(String(data)?.toLowerCase())){
          searched_records.push(record)
          break
        }
      }
    }
    this.table_records = searched_records
  } 

  // FOR REFRESHING THE DATA
  refresh(){
    this.search_text_form.reset({
      search_text: '',
      start_date: '',
      end_date: ''
    });
    
    this.api_call_emit(this.n, this.offset)
  }
}
