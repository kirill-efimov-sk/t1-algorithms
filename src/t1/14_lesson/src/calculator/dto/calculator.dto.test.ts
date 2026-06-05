import { Data } from "../dto/calculator.dto";
import { testCases } from "../../__mocks__/operations";


describe('DTO tests', () => {
    describe('Constructor dto tests', () => {
      test.each(testCases)(
        "Test dto $input",
        ({ input }) => {
            const data = new Data<number>(input.operandA, input.operandB, input.operation);

            expect(data.getOperandA()).toBe(input.operandA);
            expect(data.getOperandB()).toBe(input.operandB);
            expect(data.getOperation()).toBe(input.operation);
        },
      )
      });
});
