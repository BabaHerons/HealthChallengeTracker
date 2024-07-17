import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-add.component.html',
  styleUrl: './btn-add.component.css'
})
export class BtnAddComponent {
  @Input() text?:string = "Add";
  @Input() type?:string;
  @Input() loading:boolean = false
  @Output() onClick = new EventEmitter

  btnClick = () => {
    this.onClick.emit()
  }
}
