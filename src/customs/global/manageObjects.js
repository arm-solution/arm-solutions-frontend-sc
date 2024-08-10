export function shallowEqualArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        const keys1 = Object.keys(arr1[i]);
        const keys2 = Object.keys(arr2[i]);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (let key of keys1) {
            if (arr1[i][key] !== arr2[i][key]) {
                return false;
            }
        }
    }

    return true;
}


export function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true; // same object or primitive
    }

    if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
        return false; // not objects or one is null
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}