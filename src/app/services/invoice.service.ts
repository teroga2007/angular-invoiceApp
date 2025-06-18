import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import invoiceData from '../data/invoice.data';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoice: Invoice = invoiceData;
  constructor() {}

  getInvoice(): Invoice {
    return { ...this.invoice, total: this.calculateTotal() };
  }

  calculateTotal(): number {
    return this.invoice.items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  }

  removeItem(id: number): Invoice {
    this.invoice.items = this.invoice.items.filter((item) => item.id !== id);
    this.invoice.total = this.calculateTotal();
    return this.invoice;
  }

  addItem(item: Item): Invoice {
    this.invoice.items = [...this.invoice.items, item];
    return { ...invoiceData, total: this.calculateTotal() };
  }
}
