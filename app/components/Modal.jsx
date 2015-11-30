var React = require('react');
var Reflux = require('reflux');
var ModalStore = require('../store/ModalStore');
var Actions = require('../actions');
var cx = require('classnames');
module.exports = React.createClass({

    mixins: [Reflux.listenTo(ModalStore, 'onModalUpdate')],
    getInitialState: function() {
        return {
            modal: ModalStore.getDefaultData()
        };
    },
    onModalUpdate: function(newModalState) {
        this.setState({
            modal: newModalState
        });
        console.log(this.state);
        if(this.state.modal._open) {
            $('#bigModal').openModal();
        } else {
            $('#bigModal').closeModal();
        }
    },
    btnCallback: function(btn) {
        btn.callback && btn.callback();
        if(btn.close !== false) {
            Actions.hideModal();
        }
    },
    render: function () {
        var that = this;
        var mdclasses = cx('modal', 'modal-fixed-footer', this.state.modal.size)
        return (
            <div id="bigModal" className={mdclasses}>
                <div className="modal-content">
                    <h4>{this.state.modal.head}</h4>
                    {this.state.modal.body}
                </div>
                <div className="modal-footer">
                {
                    this.state.modal.btns.map(function(btn, i) {
                        return (
                            <a key={i} onClick={that.btnCallback.bind(that, btn)} href="javascript:;" className="waves-effect waves-light btn">{btn.text}</a>
                        );
                    })
                }
                </div>
            </div>
        )
    }
})