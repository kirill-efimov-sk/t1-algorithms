import { Calculator } from "./calculator";
import { Data } from "../dto/calculator.dto";
import { operations, OperationsRegister } from "../operations";
import { CalculatorViewModel } from "../viewmodel/calculatorViewModel";
import { testCases } from "../../__mocks__/operations";

describe('Calculator test', () => {
    let calculator: Calculator;
    let viewModel: CalculatorViewModel;
    
    beforeEach(() => {
        calculator = new Calculator();
        viewModel = new CalculatorViewModel(calculator);
        
        new OperationsRegister(calculator, operations)
    });
    describe('Constructor calculator test', () => {
      test.each(testCases)(
        "Should return $expected for $input",
        ({ input, expected }) => {
            const data = new Data<number>(input.operandA, input.operandB, input.operation);

            viewModel.perform(data);
            const currentData = viewModel.getCurrentData();
            
            expect(currentData?.getResult()).toBe(expected);
        },
      )
      });
});
