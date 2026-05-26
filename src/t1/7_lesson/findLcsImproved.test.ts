import { findLcs } from './findLcsImproved';

describe('find lcs test cases', () => {
    test('1. base case', () => {
        const result = findLcs('ABDEFADRFG', 'DAFERGA');
        const expected = ['DAFG', 'AFRG', 'AERG', 'DFRG', 'DERG', 'DARG'];
        expect(result).toEqual(expect.arrayContaining(expected));
        expect(result.length).toBe(6);
        expect(result[0].length).toBe(4); // string len = 4
    });
    test('2. empty strings', () => {
        expect(findLcs('', '')).toEqual(['']);
        expect(findLcs('ABC', '')).toEqual(['']);
    });

    test('3. one common char', () => {
        expect(findLcs('ABC', 'ADE')).toEqual(['A']);
        expect(findLcs('ABC', 'XYZ')).toEqual(['']);
    });

    test('4. simple case with several LCS', () => {
        const result = findLcs('ABCD', 'ACBD');
        expect(result).toContain('ABD');
        expect(result).toContain('ACD');
        expect(result.length).toBe(2);
    });
});