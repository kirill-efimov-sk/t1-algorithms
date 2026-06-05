import type { Data } from "../dto/calculator.dto";
import type { Operation } from "../model/types";

export const OperationsFactory = {
    operationAdd(): Operation<number> {
        return {
            perform(data: Data<number>): number {
                return data.getOperandA() + data.getOperandB();
            }
        };
    },

    operationSubtract(): Operation<number> {
        return {
            perform(data: Data<number>): number {
                return data.getOperandA() - data.getOperandB();
            }
        };
    },

    operationMultiply(): Operation<number> {
        return {
            perform(data: Data<number>): number {
                return data.getOperandA() * data.getOperandB();
            }
        };
    },

    operationDivide(): Operation<number> {
        return {
            perform(data: Data<number>): number {
                if (data.getOperandB() === 0) {
                    throw new Error("Division by zero!");
                }
                return data.getOperandA() / data.getOperandB();
            }
        };
    }
};