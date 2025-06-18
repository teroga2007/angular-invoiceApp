export class Item {
  id: number;
  description: string;
  quantity: number;
  price: number;

  constructor(
    id: number,
    description: string,
    quantity: number,
    price: number
  ) {
    this.id = id;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
  }
}
