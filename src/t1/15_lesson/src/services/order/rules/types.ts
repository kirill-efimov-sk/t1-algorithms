export interface DiscountContext {
  price: number;
  type: string;
  totalQuantity: number;
}

export interface DiscountRule {
  apply({price, type, totalQuantity}: DiscountContext): number;
}