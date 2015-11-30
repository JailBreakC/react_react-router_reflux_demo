var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;

var AuthStore = require('./store/AuthStore');
var Setting = require('./setting');
var List = require('./list');
var Login = require('./login')
var Modal = require('./components/Modal');
/**
 * 首页
 */
 var HeadNav = React.createClass({
    render: function() {
        return (
            <div className="navbar-fixed nav-header">
                 <nav className="teal">
                    <div className="nav-wrapper">
                      <a href="#/" className="brand-logo">控制面板</a>
                    </div>
                </nav>
            </div>
        );
    }
 })
var LeftNav = React.createClass({
    logout: function() {
        AuthStore.logout();
    },
    render: function() {
        return (
            <div className="left-nav">

                <a className="brand" href="http://www.insta360.com/"><img src="/public/images/v3/common/1x/v3-logo-beta-white.png" data-img-type="normal" alt="logo" height="28"/></a>  
                <ul className="menus">
                    <li><Link to={`/list`} activeClassName="active">事件列表</Link></li>
                    <li><Link to={`/setting`} activeClassName="active">添加事件</Link></li>
                </ul>   
                <ul className="actions">
                    <li className="logout" ><Link onClick={this.logout} to={`/login`} activeClassName="active">退出登录</Link></li>
                </ul>
            </div>
        );
    }
 })
var Index = React.createClass({
    render : function() {
        return (
            <div>
                <LeftNav />
                <HeadNav />
                {this.props.children}
                <Modal />
            </div>
        );
    }
});

function requireAuth(nextState, replaceState) {
  if (!AuthStore.loggedIn())
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
}
function requireNotAuth(nextState, replaceState) {
  if (AuthStore.loggedIn()) {
        replaceState({ nextPathname: nextState.location.pathname }, '/')
    }
}

const routeConfig = [
  { 
    path: '/',
    component: Index,
    onEnter: requireAuth,
    indexRoute: { 
        component: List 
    },
    childRoutes: [
      { 
        path: 'setting', 
        component: Setting 
      },
      { 
        path: 'list',
        component: List,
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    onEnter: requireNotAuth
  }
]

// //路由
// ReactDOM.render((
//     <Router>
//         <Route path="/" component={Index} onEnter={requireAuth} >
//             <IndexRoute component={List} />
//             <Route name="setting" path="setting" component={Setting} />
//             <Route name="list" path="list" component={List} />
//         </Route>
//       <Route name="login" path="login" component={Login} onEnter={requireNotAuth} />
//     </Router>
// ), document.getElementById('view'));

ReactDOM.render(<Router routes={routeConfig} />, document.getElementById('view'))