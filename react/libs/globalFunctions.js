export function arraySort(sortDirection, field) {
    if (sortDirection.toLowerCase() === 'asc') {
        return function (a, b) {
            if (a[field] < b[field])
                return -1;
            if (a[field] > b[field])
                return 1;
            return 0;
        };
    } else {
        return function (a, b) {
            if (a[field] > b[field])
                return -1;
            if (a[field] < b[field])
                return 1;
            return 0;
        };
    }
}
