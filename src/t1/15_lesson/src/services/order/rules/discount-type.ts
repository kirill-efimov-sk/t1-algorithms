import type { DiscountContext, DiscountRule } from "./types";

const DEFAULT_DISCOUNTS: Record<string, number> = {
    VIP: 0.90,
    NEW: 0.95,
};

export class TypeDiscountRule implements DiscountRule {
  private readonly clientDiscounts: Record<string, number>;

  constructor(
    clientDiscounts: Record<string, number> = DEFAULT_DISCOUNTS
  ) {
    this.clientDiscounts = { ...clientDiscounts }; 
  }

  apply(context: DiscountContext): number {
    const discountRate = this.clientDiscounts[context.type];
    
    return discountRate ? context.price * discountRate : context.price;
  }
}