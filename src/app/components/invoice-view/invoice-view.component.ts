import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'invoice-view',
  imports: [CommonModule],
  templateUrl: './invoice-view.component.html',
})
export class InvoiceViewComponent {
  @Input() id!: number;
  @Input() date!: Date;
}
