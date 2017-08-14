/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
(function(appNamespace,publicPath){"use strict";
(function(publicPath){
    /** Ionic global **/

    function createConfigController(configObj, platforms) {
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

    var IPAD = 'ipad';
    var IPHONE = 'iphone';
    var IOS = 'ios';
    var WINDOWS_PHONE = ['windows phone'];
    // order from most specifc to least specific
    var PLATFORM_CONFIGS = [
        {
            name: IPAD,
            isMatch: function (url, userAgent) { return isPlatformMatch(url, userAgent, IPAD, [IPAD], WINDOWS_PHONE); }
        },
        {
            name: IPHONE,
            isMatch: function (url, userAgent) { return isPlatformMatch(url, userAgent, IPHONE, [IPHONE], WINDOWS_PHONE); }
        },
        {
            name: IOS,
            settings: {
                mode: IOS,
            },
            isMatch: function (url, userAgent) { return isPlatformMatch(url, userAgent, IOS, [IPHONE, IPAD, 'ipod'], WINDOWS_PHONE); }
        },
        {
            name: 'android',
            settings: {
                activator: 'ripple',
                mode: 'md',
            },
            isMatch: function (url, userAgent) { return isPlatformMatch(url, userAgent, 'android', ['android', 'silk'], WINDOWS_PHONE); }
        },
        {
            name: 'windows',
            settings: {
                mode: 'wp'
            },
            isMatch: function (url, userAgent) { return isPlatformMatch(url, userAgent, 'windows', WINDOWS_PHONE, []); }
        },
        {
            name: 'core',
            settings: {
                mode: 'md'
            }
        },
    ];
    function detectPlatforms(url, userAgent, platforms, defaultPlatform) {
        // bracket notation to ensure they're not property renamed
        var validPlatforms = platforms.filter(function (p) { return p.isMatch && p.isMatch(url, userAgent); });
        if (!validPlatforms.length) {
            validPlatforms = platforms.filter(function (p) { return p.name === defaultPlatform; });
        }
        return validPlatforms;
    }
    function isPlatformMatch(url, userAgent, platformName, userAgentAtLeastHas, userAgentMustNotHave) {
        var queryValue = queryParam(url, 'ionicplatform');
        if (queryValue) {
            return queryValue === platformName;
        }
        if (userAgent) {
            userAgent = userAgent.toLowerCase();
            for (var i = 0; i < userAgentAtLeastHas.length; i++) {
                if (userAgent.indexOf(userAgentAtLeastHas[i]) > -1) {
                    for (var j = 0; j < userAgentMustNotHave.length; j++) {
                        if (userAgent.indexOf(userAgentMustNotHave[j]) > -1) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    }
    function queryParam(url, key) {
        key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
        var results = regex.exec(url);
        return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : null;
    }

    var Ionic = window.Ionic = window.Ionic || {};
    // create the Ionic.config from raw config object (if it exists)
    // and convert Ionic.config into a ConfigApi that has a get() fn
    Context.config = createConfigController(Ionic.config, detectPlatforms(window.location.href, window.navigator.userAgent, PLATFORM_CONFIGS, 'core'));
    // get the mode via config settings and set it to
    // both Ionic and the Core global
    Context.mode = Context.config.get('mode', 'md');
})(publicPath);
})("Ionic","/dist/ionic/");