function mergeEBVPArrays(primaryArray, secondaryArray, tertiaryArray) {
    const getKey = (obj, level = 3) => {
        return level === 3
            ? `${obj.EBVP_TOP_NODE}||${obj.EBVP_TOP_NODE_2}||${obj.EBVP_TOP_NODE_3}`
            : `${obj.EBVP_TOP_NODE}||${obj.EBVP_TOP_NODE_2}`;
    };

    const getSafeValue = (obj, key) => {
        return obj && obj[key] != null ? Number(obj[key]) : 0;
    };

    const sumColumn = (arr, col) =>
        arr.reduce((acc, obj) => acc + (getSafeValue(obj, col)), 0);

    const logSums = () => {
        console.log("🔹 Before Merge Totals:");
        console.log(" - HIRED_Q2:", sumColumn(primaryArray, 'HIRED_Q2'));
        console.log(" - OPEN_REQ:", sumColumn(secondaryArray, 'OPEN_REQ'));
        console.log(" - TARGET:", sumColumn(tertiaryArray, 'TARGET'));
    };

    logSums();

    const secMap3 = Object.fromEntries(secondaryArray.map(obj => [getKey(obj), obj]));
    const terMap3 = Object.fromEntries(tertiaryArray.map(obj => [getKey(obj), obj]));

    const secMap2 = Object.fromEntries(secondaryArray.map(obj => [getKey(obj, 2), obj]));
    const terMap2 = Object.fromEntries(tertiaryArray.map(obj => [getKey(obj, 2), obj]));

    const merged = primaryArray.map(item => {
        const key3 = getKey(item);
        const key2 = getKey(item, 2);

        const sec = secMap3[key3] || secMap2[key2];
        const ter = terMap3[key3] || terMap2[key2];

        return {
            ...item,
            OPEN_REQ: getSafeValue(sec, 'OPEN_REQ'),
            TARGET: getSafeValue(ter, 'TARGET')
        };
    });

    console.log("🔹 After Merge Totals:");
    console.log(" - HIRED_Q2:", sumColumn(merged, 'HIRED_Q2'));
    console.log(" - OPEN_REQ:", sumColumn(merged, 'OPEN_REQ'));
    console.log(" - TARGET:", sumColumn(merged, 'TARGET'));

    return merged;
}