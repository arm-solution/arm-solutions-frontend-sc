// check 2 arrays if equals
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

// checking 2 objects if equals
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

export function compareIfExist(array1, array2) {
    return array2.some(obj2 => 
      array1.some(obj1 => 
        obj1.product_id === obj2.product_id
      )
    );
  }

  export const getModifiedAndNewItems = (baseCollection, data) => {
    return data.filter(item2 => {
      // Check if item has no id (new item)
      if (!item2.id) return true;
  
      // Find corresponding item in data1 based on id
      const item1 = baseCollection.find(item => item.id === item2.id);
  
      // Check if the item is modified
      if (item1) {
        return (
          item1.title !== item2.title ||
          item1.amount_type !== item2.amount_type ||
          item1.percentage !== item2.percentage ||
          item1.item_total !== item2.item_total ||
          item1.option_type !== item2.option_type
        );
      }
  
      // If item1 not found (shouldn't happen here), treat it as new
      return false;
    });
  };

  export const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }