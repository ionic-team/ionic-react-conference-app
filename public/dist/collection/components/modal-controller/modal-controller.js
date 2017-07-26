var ModalController = (function () {
    function ModalController() {
        this.ids = 0;
        this.modalResolves = {};
        this.modals = [];
    }
    ModalController.prototype["componentDidLoad"] = function () {
        this.appRoot = document.querySelector('ion-app') || document.body;
        Ionic.loadController('modal', this);
    };
    ModalController.prototype.load = function (opts) {
        var _this = this;
        // create ionic's wrapping ion-modal component
        var modal = document.createElement('ion-modal');
        var id = this.ids++;
        // give this modal a unique id
        modal.id = "modal-" + id;
        modal.style.zIndex = (10000 + id).toString();
        // convert the passed in modal options into props
        // that get passed down into the new modal
        Object.assign(modal, opts);
        // append the modal element to the document body
        this.appRoot.appendChild(modal);
        // store the resolve function to be called later up when the modal loads
        return new Promise(function (resolve) {
            _this.modalResolves[modal.id] = resolve;
        });
    };
    ModalController.prototype.viewDidLoad = function (ev) {
        var modal = ev.modal;
        var modalResolve = this.modalResolves[modal.id];
        if (modalResolve) {
            modalResolve(modal);
            delete this.modalResolves[modal.id];
        }
    };
    ModalController.prototype.willPresent = function (ev) {
        this.modals.push(ev.modal);
    };
    ModalController.prototype.willDismiss = function (ev) {
        var index = this.modals.indexOf(ev.modal);
        if (index > -1) {
            this.modals.splice(index, 1);
        }
    };
    ModalController.prototype.escapeKeyUp = function () {
        var lastModal = this.modals[this.modals.length - 1];
        if (lastModal) {
            lastModal.dismiss();
        }
    };
    return ModalController;
}());
export { ModalController };
