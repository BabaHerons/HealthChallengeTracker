import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-refresh',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-refresh.component.html',
  styleUrl: './btn-refresh.component.css'
})
export class BtnRefreshComponent {
  @Input() text?:string = "Refresh";
  @Input() click = () => {}

}
