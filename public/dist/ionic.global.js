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

    // create the Ionic global (if one doesn't exist)
    var Ionic = window.Ionic = window.Ionic || {};
    // used to store the queued controller promises to
    // be resolved when the controller finishes loading
    var queuedCtrlResolves = {};
    // create a container for all of the controllers that get loaded
    Ionic.controllers = {};
    // create the public method to load controllers
    Ionic.controller = function (ctrlName, opts) {
        // loading a controller is always async so return a promise
        return new Promise(function (resolve) {
            // see if we already have the controller loaded
            var ctrl = Ionic.controllers[ctrlName];
            if (ctrl) {
                // we've already loaded this controller
                // resolve it immediately
                resolveController(ctrl, resolve, opts);
            }
            else {
                // oh noz! we haven't already loaded this controller yet!
                var ctrlResolveQueue = queuedCtrlResolves[ctrlName];
                if (ctrlResolveQueue) {
                    // cool we've already "started" to load the controller
                    // but it hasn't finished loading yet, so let's add
                    // this one also to the queue of to-be resolved promises
                    ctrlResolveQueue.push(resolve, opts);
                }
                else {
                    // looks like we haven't even started the request yet,
                    // let's add the component to the DOM and create
                    // a queue for this controller
                    queuedCtrlResolves[ctrlName] = [resolve, opts];
                    // create our controller element
                    // and append it to the body
                    document.body.appendChild(document.createElement("ion-" + ctrlName + "-controller"));
                }
            }
        });
    };
    // create the method controllers will call once their instance has loaded
    Ionic.registerController = function (ctrlName, ctrl) {
        // this method is called when the singleton
        // instance of our controller initially loads
        // add this controller instance to our map of controller singletons
        Ionic.controllers[ctrlName] = ctrl;
        // check for to-be resolved controller promises
        var pendingCtrlResolves = queuedCtrlResolves[ctrlName];
        if (pendingCtrlResolves) {
            for (var i = 0; i < pendingCtrlResolves.length; i += 2) {
                // first arg is the original promise's resolve
                // which still needs to be resolved
                // second arg was the originally passed in options
                resolveController(ctrl, pendingCtrlResolves[i], pendingCtrlResolves[i + 1]);
            }
            // all good, go ahead and remove from the queue
            delete queuedCtrlResolves[ctrlName];
        }
    };
    function resolveController(ctrl, resolve, opts) {
        if (opts) {
            // if the call had options passed in then
            // it should run the controller's load() method
            // and let the controller's load() do the resolve
            // which then will resolve the user's promise
            ctrl.load(opts).then(resolve);
        }
        else {
            // no options passed in, so resolve with
            // the actual controller instance
            resolve(ctrl);
        }
    }
    // create the Ionic.config from raw config object (if it exists)
    // and convert Ionic.config into a ConfigApi that has a get() fn
    Ionic.config = createConfigController(Ionic.config, detectPlatforms(window.location.href, window.navigator.userAgent, PLATFORM_CONFIGS, 'core'));
    // get the mode via config settings and set it to
    // both Ionic and the Core global
    Core.mode = Ionic.mode = Ionic.config.get('mode', 'md');
})(publicPath);
})("Ionic","/dist/ionic/");