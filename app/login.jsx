var React = require('react');
var Reflux = require('reflux');
var History = require('react-router').History;
var AuthStore = require('./store/AuthStore');

var Login = React.createClass({
    
    mixins: [ History, Reflux.listenTo(AuthStore) ],

    componentWillMount: function() {
        if(AuthStore.loggedIn()) {
            this.history.replaceState(null, '/');
        }
    },
    getInitialState: function() {
        return {
            username: '',
            password: '',
            error: false
        }
    },
    login: function(e) {
        e.preventDefault()
        AuthStore.login(this.refs.username.value, this.refs.password.value, (msg) => {
            console.log(msg);
            if(!msg.authenticated) {
                return this.setState({error: true});
            }
            var location = this.props.location;
            console.log('location')
            console.log(location);
            if (location.state && location.state.nextPathname) {
                this.history.replaceState(null, location.state.nextPathname);
            } else {
                this.history.replaceState(null, '/');
            }
        })
    },
    handleInput: function(e) {
        this.state[e.target.name] = e.target.value;
        this.setState(this.state);
    },
    render : function() {
        var that = this;
        return (
            <div className="wrap login-page">
                <div className="container">
                    <div className="row">
                        <div className="col s6 offset-s3">
                            <form onSubmit={this.login}>
                                <div className="card hoverable">
                                    <header className="title">用户登录</header>

                                    <div className="card-content row">                        
                                        <div className="input-field col s12">
                                            <input ref="username" className="validate" onChange={that.handleInput} id="email" name="username" type="email" />
                                            <label data-error="邮箱格式错误" htmlFor="email">输入用户邮箱</label>
                                        </div>
                                                            
                                        <div className="input-field col s12">
                                            <input ref="password" className="validate" min="6" max="20" onChange={that.handleInput} id="password" name="password" type="password" />
                                            <label data-error="密码长度错误!" htmlFor="password">输入密码</label>
                                        </div>
                                    </div>

                                    <div className="row" style={{textAlign:"center"}}>
                                        <div className="col s6">
                                            <button className="waves-effect waves-light btn">登录 </button>
                                        </div>
                                        <div className="col s6">
                                            <button className="waves-effect waves-green btn-flat" type="reset">重置 </button>
                                        </div>
                                    </div>
                                </div>
                            </form>    
                        </div>  
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Login;