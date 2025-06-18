import { Component, EventEmitter, Output } from '@angular/core';
import { Item } from '../../models/item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'new-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-item.component.html',
})
export class NewItemComponent {
  @Output() addItemEventEmitter = new EventEmitter<Item>();

  private counterId = 6;

  newItem: Item = {
    id: this.counterId++,
    description: '',
    quantity: 1,
    price: 0,
  };

  onAddItem(): void {
    if (
      this.newItem.description &&
      this.newItem.quantity > 0 &&
      this.newItem.price >= 0
    ) {
      this.addItemEventEmitter.emit(this.newItem);
      this.newItem = {
        id: this.counterId++,
        description: '',
        quantity: 1,
        price: 0,
      };
    }
  }
}
