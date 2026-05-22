import { quickSort } from "./quickSort";

interface SortTestCase {
    input: number[];
    expected: number[];
}

const testCases: SortTestCase[] = [
    { input: [], expected: [] },
    { input: [1], expected: [1] },
    { input: [2, 1], expected: [1, 2] },
    { input: [5, 5, 5, 5], expected: [5, 5, 5, 5] },
    { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
    { input: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] },
    { input: [3, 1, 2, 3, 1, 2], expected: [1, 1, 2, 2, 3, 3] },
];

describe("Testing Quicksort of an Array", () => {
    test.each(testCases)(
        "Should return $expected for $input",
        ({ input, expected }) => {
            expect(quickSort(input)).toEqual(expected);
        },
    );
});
