var Reflux = require('reflux');

var Actions = Reflux.createActions([
    "showModal",
    "hideModal",

    "logout",
    "login",
    "getToken",
    "loggedIn"
]);


module.exports = Actions
