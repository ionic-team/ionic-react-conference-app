export function createConfigController(configObj, platforms) {
    configObj = configObj || {};
    function get(key, fallback) {
        if (configObj[key] !== undefined) {
            return configObj[key];
        }
        var settings = null;
        for (var i = 0; i < platforms.length; i++) {
            settings = platforms[i]['settings'];
            if (settings && settings[key] !== undefined) {
                return settings[key];
            }
        }
        return fallback !== undefined ? fallback : null;
    }
    function getBoolean(key, fallback) {
        var val = get(key);
        if (val === null) {
            return fallback !== undefined ? fallback : false;
        }
        if (typeof val === 'string') {
            return val === 'true';
        }
        return !!val;
    }
    function getNumber(key, fallback) {
        var val = parseFloat(get(key));
        return isNaN(val) ? (fallback !== undefined ? fallback : NaN) : val;
    }
    return {
        get: get,
        getBoolean: getBoolean,
        getNumber: getNumber
    };
}
