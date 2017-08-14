var ModalController = (function () {
    function ModalController() {
        this.ids = 0;
        this.modalResolves = {};
        this.modals = [];
    }
    ModalController.prototype.create = function (opts) {
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
        var appRoot = document.querySelector('ion-app') || document.body;
        appRoot.appendChild(modal);
        // store the resolve function to be called later up when the modal loads
        return new Promise(function (resolve) {
            _this.modalResolves[modal.id] = resolve;
        });
    };
    ModalController.prototype.modalDidLoad = function (ev) {
        var modal = ev.detail.modal;
        var modalResolve = this.modalResolves[modal.id];
        if (modalResolve) {
            modalResolve(modal);
            delete this.modalResolves[modal.id];
        }
    };
    ModalController.prototype.modalWillPresent = function (ev) {
        this.modals.push(ev.detail.modal);
    };
    ModalController.prototype.modalWillDismiss = function (ev) {
        var index = this.modals.indexOf(ev.detail.modal);
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
