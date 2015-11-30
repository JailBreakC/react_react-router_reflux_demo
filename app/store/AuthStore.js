var Reflux = require('reflux');
var Actions = require('../actions');


var AuthStore = Reflux.createStore({

    listenables: [Actions],

    login: function(username, passoword, cb) {
        // debugger;
        // $.post('/api/auth').success(function(data) {
        //     console.log(data);
        // })
        if(username == 'admin@insta360.com' && passoword == '123456') {
            localStorage.token = Math.random().toString(36).substring(7);
            cb({
                authenticated: true,
                token: localStorage.token
            })
        } else {
            cb({
                authenticated: false
            })            
        }
    },
    logout: function() {
        delete localStorage.token
    },
    getToken: function() {
        return localStorage.token
    },
    loggedIn: function() {
        return !!localStorage.token
    }

});

module.exports = AuthStore;
