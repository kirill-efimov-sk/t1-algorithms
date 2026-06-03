import { MaskingParser } from './maskingParser';

describe('Test masking parser', () => {
    let parser: MaskingParser;

    beforeEach(() => {
        parser = new MaskingParser();
    });

    // ==================== Login ====================
    describe('Login masking', () => {
        test('masking a short login (<= 7 characters)', () => {
            const input = 'login=ivanov';
            const expected = 'login=i*****';
            expect(parser.parse(input)).toBe(expected);
        });

        test('masking a long login (> 7 characters)', () => {
            const input = 'login=testadmin';
            const expected = 'login=te***n';
            expect(parser.parse(input)).toBe(expected);
        });
    });

    // ==================== FIO ====================
    describe('Name masking', () => {
        test('masking a full name', () => {
            const input = 'name=Романов Алексей Сергеевич';
            const expected = 'name=Р****** Алексей Се***ч';
            expect(parser.parse(input)).toBe(expected);
        });

        test('masking a name with surname and name only (no patronymic)', () => {
            const input = 'name=Гогия Владимир';
            const expected = 'name=Г**** Владимир';
            expect(parser.parse(input)).toBe(expected);
        });
    });

    // ==================== Email ====================
    describe('Email masking', () => {
        test('masking an email username', () => {
            const input = 'email=admin@example.com';
            const expected = 'email=a***@example.com';
            expect(parser.parse(input)).toBe(expected);
        });
    });

    // ==================== Card number ====================
    describe('Card number masking', () => {
        test('masking a card number with spaces', () => {
            const input = 'card=4111 1111 1111 1234';
            const expected = 'card=4111 11** **** 1234';
            expect(parser.parse(input)).toBe(expected);
        });

        test('masking a card number without spaces', () => {
            const input = 'card=4111111111111234';
            const expected = 'card=4111 11** **** 1234';
            expect(parser.parse(input)).toBe(expected);
        });
    });

    // ==================== Tests with multiple fields ====================
    describe('Multiple fields masking', () => {
        test('masking all fields in random order', () => {
            const input = 'card=5555 6666 7777 8888 email=admin@company.com login=admin123 name=Петров Петр Петрович';
            const expected = 'card=5555 66** **** 8888 email=a***@company.com login=ad***3 name=П***** Петр Пе***ч';
            expect(parser.parse(input)).toBe(expected);
        });

        test('masking subset of fields', () => {
            const input = 'login=superuser name=Сидоров Александр card=1234 5678 9012 3456';
            const expected = 'login=su***r name=С****** Александр card=1234 56** **** 3456';
            expect(parser.parse(input)).toBe(expected);
        });
    });
});