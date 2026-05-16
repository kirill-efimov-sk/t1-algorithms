type GroupedNames = Record<number, string[]>;
type FormatFn = (name: string) => string;

const formatName = (value: string): string => {
    const name = value.trim();
    if (!name) return "";

    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const appendUniqueName = (
    acc: GroupedNames,
    id: number,
    name: string,
): GroupedNames => {
    const currentGroup = acc[id] ?? [];

    if (currentGroup.includes(name)) return acc;

    // return immutable obj
    return {
        ...acc,
        [id]: [...currentGroup, name],
    };
};

export const groupName = (arr: string[], formatFunction: FormatFn) => {
    if (!arr || arr.length === 0) return {};

    return arr.reduce((acc, item) => {
        const [name, idDefault] = item.trim().split(/\s+/);

        if (!idDefault) return acc;
        const id = Number(idDefault);

        if (isNaN(id)) return acc;

        const formattedName = formatFunction(name);
        return appendUniqueName(acc, id, formattedName);
    }, {} as GroupedNames);
};

console.log(
    groupName(
        ["вася 5", "ИВАН 5", "иван 5", "мАшА 1", "Тото", "Тося 3"],
        formatName,
    ), // groupName is Higher-Order Function (OCP)
);

/*  RESULT
 *   {1: Array(1), 3: Array(1), 5: Array(2)}
 *   1 = ['Маша']
 *   3 = ['Тося']
 *   5 = ['Вася', 'Иван']
 *
 */

// other variations
console.log(
    groupName([], formatName),
    groupName(["вася", "Тося"], formatName),
    groupName(["    ВАСЯ    8", "ТОсЯ 15"], formatName),
);
