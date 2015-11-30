var React = require('react');
var cx = require('classnames');
var data = require('./data');
var Loading = require('./components/Loading');
var Actions = require('./actions');
var ModalStore = require('./store/ModalStore');
var History = require('react-router').History;

var List = React.createClass({
    render : function() {
        return (
            <div className="wrap">
                <div className="row">
                    <div className="col s12">
                        <h5 className="card-panel teal white-text hoverable">事件控制</h5>
                    </div>
                    <div className="col s12">
                        <Event events={data.events}/>
                    </div>
                </div>
            </div>
        );
    }
});

var PostBtn = React.createClass({
    propTypes: {
        postId: React.PropTypes.number.isRequired,
    },
    openModal: function() {
        var cfg = {
            head: '提示',
            body: (
                <div>
                    <h5>确定要发布页面？</h5>
                    <p>预览地址:<a href="www.insta360.com" target="_blank">v.insta360.com/post/index.html</a></p>
                </div>
            ),
            btns: [
                {text: '取消'},
                {text: '确定'}
            ]
        }
        Actions.showModal(cfg);
    },
    render: function() {
        var that = this;
        console.log(this.props)
        return (
            <a className="modal-trigger waves-effect waves-light btn" onClick={that.openModal} href="javascript:;">{this.props.children}</a>
        )
    }
})

var Event = React.createClass({
    propTypes: {
        events: React.PropTypes.array.isRequired,
    },
    getInitialState: function() {
        return {
            events: this.props.events.map(function(event) {
                event.isOpened = false
                event.chached = false
                return event;
            }),
            posts: []
        };
    },
    togglePosts: function(index) {
        var event = this.state.events[index]
        var posts = [];
        event.isOpened = !event.isOpened;
        this.setState(this.state);
        console.log(index)
        console.log(event.isOpened)
        if(event.chached) {
            console.log('chached');
            return
        }
        setTimeout(function() {
            event.chached = true;
            this.state.posts[index] = data.posts;
            this.setState(this.state);
        }.bind(this), 500);
    },
    render: function() {
        var that = this;
        return (
            <section className="card">
                <header className="title">
                    事件列表
                </header>
                <div className="card-body">
                    <table className="u-full-width">
                      <thead>
                        <tr>
                            <th>事件名称</th>
                            <th>创建时间</th>
                            <th>描述</th>
                            <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>   
                        {   //jsx html语法只支持单个节点，所以这里采用双层map方法解决两个不同节点的交替返回
                            this.props.events.map(function(event, index) {
                                return (
                                    [
                                        <tr className="has-act" onClick={that.togglePosts.bind(that, index)}>
                                            <td>{event.name}</td>
                                            <td>{event.time}</td>
                                            <td>{event.discrib}</td>
                                            <td width="150">
                                                <a href="javascript:;" className="waves-effect waves-light btn">
                                                {that.state.events[index].isOpened ? '收起' : '展开'}
                                                </a>
                                            </td>
                                        </tr>,
                                        <Post posts={that.state.posts && that.state.posts[index]} isOpened={that.state.events[index].isOpened}/> 
                                    ]
                                );
                            }).map(function(ele) {
                                return ele;
                            })
                        }
                      </tbody>
                    </table>
                </div>
            </section>
        );
    }
});
var Post = React.createClass({
    mixin: [History],
    hideBtn: function(event) {
        event.currentTarget.lastChild.firstChild.style.display = "none"
    },
    showBtn: function(event) {
        event.currentTarget.lastChild.firstChild.style.display = "block"
    },
    edit: function(event, postid) {

    },
    render: function() {
        var that = this;
        var classes = cx({
            'sub-ct': true,
            'close': !this.props.isOpened
        });
        return (
            <tr className={classes}>
                <td colSpan="4">
                    <table className="sub-table u-full-width">
                      <thead>
                        <tr>
                            <th>片段名称</th>
                            <th>创建时间</th>
                            <th>描述</th>
                            <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                            this.props.posts ?
                            this.props.posts.map(function(post, index) {
                                return (
                                    <tr key={index} className="has-act" onMouseOver={that.showBtn} onMouseOut={that.hideBtn}>
                                        <td>{post.name}</td>
                                        <td>{post.time}</td>
                                        <td>{post.discrib}</td>
                                        <td width="235">
                                            <div className="btn-group-sm" style={{display:"none"}}>
                                                <a href="javascript:;" onClick={that.edit.bind(this, event, post)} className="waves-effect waves-light btn">编辑</a> 
                                                <PostBtn postId={post.id}>发布</PostBtn>
                                                <a href="javascript:;" className="waves-effect waves-light btn deep-orange">删除</a> 
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) : <tr><td colSpan="4"><Loading /></td></tr>
                        }
                      </tbody>
                    </table>
                </td>
            </tr>
        );
    }
});

module.exports = List;