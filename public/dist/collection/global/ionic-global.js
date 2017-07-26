import { createConfigController } from './config-controller';
import { detectPlatforms, PLATFORM_CONFIGS } from './platform-configs';
// create the Ionic global (if one doesn't exist)
var Ionic = window['Ionic'] = window['Ionic'] || {};
// create the Ionic.config from raw config object (if it exists)
// and convert Ionic.config into a ConfigApi that has a get() fn
Ionic.config = createConfigController(Ionic.config, detectPlatforms(window.location.href, window.navigator.userAgent, PLATFORM_CONFIGS, 'core'));
// get the mode via config settings and set it to
// both Ionic and the Core global
Core.mode = Ionic.mode = Ionic.config.get('mode', 'md');
// used to store the queued controller promises to
// be resolved when the controller finishes loading
var queuedCtrlResolves = {};
// create a container for all of the controllers that get loaded
Ionic.controllers = {};
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
Ionic.loadController = function (ctrlName, ctrl) {
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
