import { Address } from './address';

export class Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: Address;

  constructor(
    id: number,
    name: string,
    email: string,
    phone: string,
    address: Address
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}
