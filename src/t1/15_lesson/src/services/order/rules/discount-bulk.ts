import type { DiscountContext, DiscountRule } from "./types";

export class BulkQuantityDiscountRule implements DiscountRule {
  constructor(
    private readonly minQuantity: number,
    private readonly discountRate: number
  ) {}

  apply(context: DiscountContext): number {
    return context.totalQuantity > this.minQuantity 
      ? context.price * this.discountRate 
      : context.price;
  }
}