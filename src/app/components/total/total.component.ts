import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'total',
  imports: [CommonModule],
  templateUrl: './total.component.html',
})
export class TotalComponent {
  @Input() total: number = 0;
  @Input() applyTax: boolean = false;
  @Input() currency: 'CRC' | 'USD' = 'USD';

  get tax(): number {
    return this.applyTax ? this.total * 0.13 : 0;
  }

  get totalWithTax(): number {
    return this.total + this.tax;
  }

  get currencySymbol(): string {
    return this.currency === 'CRC' ? '₡' : '$';
  }
}
