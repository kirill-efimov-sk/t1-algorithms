import { Item } from "../../dto";
import { OrderService } from "..";

interface TestCase {
    type: string;
    expected: number;
    description: string;
}

const testCases: TestCase[] = [
    { 
      type: 'VIP', 
      expected: 456700,
      description: '10% discount for VIP'
    },
    { 
        type: 'NEW', 
        expected: 482075,
        description: '5% discount for NEW'
    },
    { 
        type: 'ANY', 
        expected: 507450, 
        description: 'only 50ye discount for orders over 1000'
    },
];

describe('order service test cases', () => {
    let service: OrderService;
    let items: Item[];

    beforeEach(() => {
    service = new OrderService();
    items = [
        new Item("Laptop", 98500, 5),
        new Item("Mouse", 1500, 10)
    ];
    });

    // positive tests
    test.each(testCases)('Type: $type; $description', (testCase) => {
        const total = service.calc(items, testCase.type); 
        console.log(total)
        expect(total).toBe(testCase.expected);
    });

    test('returns 0 for empty items array', () => {
        const total = service.calc([], "ANY");
        expect(total).toBe(0);
    });
    
    // negative tests
    test('throws error when type is null', () => {
        expect(() => service.calc(items, null as any)).toThrow();
    });
    test('throws error when items is null', () => {
        expect(() => service.calc(null as any, "ANY")).toThrow();
    });

    test('negative price test', () => {
        const invalidItems = [
            new Item("Keyboard", -100, 5)
        ];
        const total = service.calc(invalidItems, "ANY");
        expect(total).toBe(-500);
    });
    test('negative quantity test', () => {
        const invalidItems = [
            new Item("Keyboard", 100, -5)
        ];
        const total = service.calc(invalidItems, "ANY");
        expect(total).toBe(-500);
    });

    // New test
    test('negative quantity test', () => {
        const bulkDiscountRule = new BulkQuantityDiscountRule(10, 0.99);

        service.addRule(bulkDiscountRule);
        const invalidItems = [
            new Item('Powerbank', 1000, 10)
        ];
        const total = service.calc(invalidItems, 'OTHER');
        expect(total).toBe(9900);
    });
})