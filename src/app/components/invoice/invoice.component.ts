import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { InvoiceViewComponent } from '../invoice-view/invoice-view.component';
import { ListItemsViewComponent } from '../list-items-view/list-items-view.component';
import { CompanyViewComponent } from '../company-view/company-view.component';
import { CustomerViewComponent } from '../customer-view/customer-view.component';
import { TotalComponent } from '../total/total.component';
import { NewItemComponent } from '../new-item/new-item.component';
import { Item } from '../../models/item';

@Component({
  selector: 'app-invoice',
  imports: [
    CommonModule,
    NavBarComponent,
    InvoiceViewComponent,
    CustomerViewComponent,
    CompanyViewComponent,
    ListItemsViewComponent,
    TotalComponent,
    NewItemComponent,
  ],
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent implements OnInit {
  invoice!: Invoice;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoice = this.invoiceService.getInvoice();
  }

  onRemoveItem(id: number): void {
    // Remove the item with the given id from the invoice items
    this.invoice = this.invoiceService.removeItem(id);
  }

  addItem(item: Item): Invoice {
    this.invoice = this.invoiceService.addItem(item);
    return { ...this.invoice, total: this.invoiceService.calculateTotal() };
  }
}
