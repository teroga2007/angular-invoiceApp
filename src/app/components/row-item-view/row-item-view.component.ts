import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'tr[row-item-view]',
  imports: [],
  templateUrl: './row-item-view.component.html',
})
export class RowItemViewComponent {
  @Input() item!: Item;

  @Output() removeEventEmitter: EventEmitter<number> =
    new EventEmitter<number>();

  onRemove(id: number): void {
    this.removeEventEmitter.emit(id);
  }
}
