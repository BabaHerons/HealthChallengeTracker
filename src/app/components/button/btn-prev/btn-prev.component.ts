import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-prev',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-prev.component.html',
  styleUrl: './btn-prev.component.css'
})
export class BtnPrevComponent {
  @Input() disabled:boolean = false
  @Input() click = () => {}
}
