import { LinkedList } from "./linkedList";

describe("LinkedList", () => {
    let list: LinkedList<number>;

    beforeEach(() => {
        list = new LinkedList<number>();
    });

    describe("addFirst", () => {
        test("addFirst in list", () => {
            const element = list.addFirst(10);
            expect(list.get(element)).toBe(10);

            list.addFirst(10);
            expect(list.indexOf(10)).toBe(0);
        });
    });
    describe("addLast", () => {
        test("addLast in list", () => {
            list.addLast(20);
            expect(list.indexOf(20)).toBe(0);
        });
    });

    describe("insertAfter", () => {
        test("insert after element in the middle", () => {
            const first = list.addLast(10);
            list.addLast(30);
            list.insertAfter(first, 20);

            expect(list.indexOf(10)).toBe(0);
            expect(list.indexOf(20)).toBe(1);
            expect(list.indexOf(30)).toBe(2);
        });

        test("insert after the first element", () => {
            const first = list.addFirst(10);
            list.insertAfter(first, 20);
            list.addFirst(5);

            expect(list.indexOf(5)).toBe(0);
            expect(list.indexOf(10)).toBe(1);
            expect(list.indexOf(20)).toBe(2);
        });

        test("insert after the last element", () => {
            const last = list.addLast(10);
            list.insertAfter(last, 20);

            expect(list.indexOf(20)).toBe(1);
        });
    });

    describe("contains / indexOf", () => {
        beforeEach(() => {
            list.addLast(10);
            list.addLast(20);
            list.addLast(30);
        });

        test("search for existing value", () => {
            expect(list.contains(20)).toBe(true);
            expect(list.indexOf(20)).toBe(1);
        });

        test("search in an empty list", () => {
            const emptyList = new LinkedList<number>();
            expect(emptyList.contains(10)).toBe(false);
            expect(emptyList.indexOf(10)).toBe(-1);
        });

        test("negative test: search for a non-existent value", () => {
            expect(list.contains(100)).toBe(false);
            expect(list.indexOf(100)).toBe(-1);
        });
    });

    describe("removeFirst / removeLast", () => {
        beforeEach(() => {
            list.addLast(10);
            list.addLast(20);
            list.addLast(30);
        });

        test("deleting from the beginning", () => {
            list.removeFirst();
            expect(list.indexOf(10)).toBe(-1);
            expect(list.indexOf(20)).toBe(0);
        });

        test("removing from end", () => {
            list.removeLast();
            expect(list.indexOf(30)).toBe(-1);
            expect(list.indexOf(20)).toBe(1);
        });
    });

    describe("get / set", () => {
        let element: any;

        beforeEach(() => {
            element = list.addLast(10);
            list.addLast(20);
        });

        test("get element", () => {
            expect(list.get(element)).toBe(10);
        });

        test("set element", () => {
            list.set(element, 100);
            expect(list.get(element)).toBe(100);
            expect(list.indexOf(100)).toBe(0);
        });
    });
});
