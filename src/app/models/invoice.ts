import { Company } from './company';
import { Customer } from './customer';
import { Item } from './item';

export class Invoice {
  id: number;
  date: Date;
  customer: Customer;
  company: Company;
  items: Item[];
  total: number;
  applyTax: boolean;
  currency: 'CRC' | 'USD';

  constructor(
    id: number,
    date: Date,
    customer: Customer,
    company: Company,
    items: Item[],
    total: number,
    applyTax: boolean = true,
    currency: 'CRC' | 'USD' = 'CRC'
  ) {
    this.id = id;
    this.date = date;
    this.customer = customer;
    this.company = company;
    this.items = items;
    this.total = total;
    this.applyTax = applyTax;
    this.currency = currency;
  }
}
