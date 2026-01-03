function deepcopy(obj) {
    // Handle null or primitive values
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // Handle arrays
    if (Array.isArray(obj)) {
        return obj.map(item => deepcopy(item));
    }
    
    // Handle objects
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepcopy(obj[key]);
        }
    }
    
    return result;
}
