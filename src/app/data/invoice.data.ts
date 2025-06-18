import { Invoice } from '../models/invoice';

const invoiceData: Invoice = {
  id: 1,
  date: new Date(),
  customer: {
    id: 101,
    email: 'example1@example.com',
    phone: '123-456-7890',
    name: 'John Doe',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
  },
  company: {
    id: 201,
    email: 'sterogam@gmail.com',
    name: 'S-Digital 😸',
  },
  items: [
    {
      id: 1,
      description: 'Widget A',
      quantity: 2,
      price: 25.0,
    },
    {
      id: 2,
      description: 'Widget B',
      quantity: 1,
      price: 15.0,
    },
    {
      id: 3,
      description: 'Widget C',
      quantity: 5,
      price: 10.0,
    },
    {
      id: 4,
      description: 'Widget D',
      quantity: 3,
      price: 20.0,
    },
    {
      id: 5,
      description: 'Widget E',
      quantity: 4,
      price: 30.0,
    },
  ],
  total: 0, // This will be calculated based on items
  applyTax: true,
  currency: 'USD',
};

export default invoiceData;
