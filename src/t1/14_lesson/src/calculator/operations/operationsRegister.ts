import type { Calculator } from "../model/calculator";
import type { Operation } from "../model/types";

export class OperationsRegister {
    private operations: Map<string, Operation<number>>;
    private calculator: Calculator | null = null;

     /**
     * Creates an instance of the transaction logger.
     * @param calculator - The calculator instance
     * @param operations - operation map
     * @example
     * const operations = new Map([
     *   ['+', addOperation],
     *   ['-', subtractOperation]
     * ]);
     * const register = new OperationsRegister(calculator, operations);
     */
    constructor(calculator: Calculator, operations: Map<string, Operation<number>>) {
        this.calculator = calculator;
        this.operations = operations

        this.registerTo(calculator);
    }

    /**
     * Returns a string containing a comma-separated list of all available operations.
     * @returns A string with a list of operations (for example: "+, -, *, /")
     * @example
     * const availableOperations = register.getAvailableOperations();
     * console.log(availableOperations); // "+, -, *, /"
     */
    public getAvailableOperations(): string {
        return Array.from(this.operations.keys()).join(', ');
    }

    /**
     * Checks whether the specified operation is registered.
     * @param key - key (for example: '+', '-', '*', '/')
     * @returns true` if the operation is registered, `false` otherwise
     * @example
     * if (register.hasOperation('+')) {
     *     console.log('operation is registered');
     * }
     */
    public hasOperation(key: string): boolean {
        return this.operations.has(key);
    }

    private registerTo(calculator: Calculator) {
        this.calculator = calculator;
        
        for (const [key, operation] of this.operations) {
            calculator.addOperation(key, operation);
        }
    }
}