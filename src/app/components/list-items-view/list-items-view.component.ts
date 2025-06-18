import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';
import { RowItemViewComponent } from '../row-item-view/row-item-view.component';

@Component({
  selector: 'list-items-view',
  imports: [RowItemViewComponent],
  templateUrl: './list-items-view.component.html',
})
export class ListItemsViewComponent {
  @Input() items: Item[] = [];

  @Output() removeEventEmitter: EventEmitter<number> =
    new EventEmitter<number>();

  onRemove(id: number): void {
    this.removeEventEmitter.emit(id);
  }
}
