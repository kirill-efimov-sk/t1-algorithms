interface TestCases {
  input: {operandA: number, operandB: number, operation: string},
  expected: number
}

export const testCases: TestCases[] = [
    { input: {operandA: 20, operandB: 25, operation: '+'}, expected: 45 },
    { input: {operandA: 20, operandB: 25, operation: '-'}, expected: -5 },
    { input: {operandA: 2, operandB: 5, operation: '*'}, expected: 10 },
    { input: {operandA: 6, operandB: 2, operation: '/'}, expected: 3 },
];