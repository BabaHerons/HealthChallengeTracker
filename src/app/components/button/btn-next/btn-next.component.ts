import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-next',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-next.component.html',
  styleUrl: './btn-next.component.css'
})
export class BtnNextComponent {
  @Input() disabled:boolean = false
  @Input() click = () => {}
}
