var Reflux = require('reflux');
var Actions = require('../actions');


var ModalStore = Reflux.createStore({

    listenables: [Actions],

    onShowModal: function(modalCfg) {
        this.modalCfg = modalCfg || this.modalCfg;
        this.modalCfg._open = true;
        this.trigger(modalCfg);
    },

    onHideModal: function() {
        this.modalCfg._open = false;
        this.trigger(this.modalCfg);
    },

    getDefaultData: function() {
        this.modalCfg = {
            _open: false,
            content: 'this is content',
            header: 'Modal header',
            btns: [
                {text: '确定'},
                {text: '取消'}
            ],
            size: "big"
        };
        return this.modalCfg;
    }

});

module.exports = ModalStore;
