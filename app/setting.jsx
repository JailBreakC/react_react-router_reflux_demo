var React = require('react');
var cx = require('classnames');
var Actions = require('./actions');

var PathForm = React.createClass({
    propTypes: {
        col: React.PropTypes.string, //传入栅格数，如s1/s6/s12
        dataStruct: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return this.props.dataStruct;
    },
    getDefaultProps: function() {
        return {
            col: 's12'
        };
    },
    handleInput: function(e) {
        this.state[e.target.name] = e.target.value;
        this.props.handleInputChange(this.state);
    },
    render: function() {
        var classes = cx('col', this.props.col);
        var that = this;
        return (
            <div className={classes}>
                <section className="card hoverable">
                    <header className="title">
                        路径设定：
                    </header>
                    <div className="card-content row">
                        <div className="input-field col s12">
                            <input required="required" className="validate" type="text" id="eventNameInput" name="eventname" onChange={that.handleInput}/>
                            <label htmlFor="eventNameInput">视频事件名称 eventname &#40;text&#41;</label>
                        </div>
                        <div className="input-field col s12">
                            <input required="required" className="validate" type="text" id="postNameInput" name="postname" onChange={that.handleInput}/>
                            <label htmlFor="postNameInput">事件片段名称 postname &#40;text&#41;</label>
                        </div>
                    </div>
                </section>
                <section className="card hoverable img-card">
                    <header className="title">
                        如何填写？ 
                    </header>
                    <div className="card-content">
                        <div className="row">
                            <img className="materialboxed col s12" src="/public/images/event/help.png" alt="help"/>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
});

var DataForm = React.createClass({
    propTypes: {
        col: React.PropTypes.string, //传入栅格数，如s1/s6/s12
        dataStruct: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return this.props.dataStruct;
    },
    getDefaultProps: function() {
        return {
            col: 's12'
        };
    }, 
    handleInput: function(e) {
        var names = e.target.name.split('_')
        var ll = names.length;
        if(ll == 1) {
            this.state[names[0]] = e.target.value;
        }
        if(ll == 2) {
            this.state[names[0]] || (this.state[names[0]] = {});
            this.state[names[0]][names[1]] = e.target.value;
        }
        if(ll == 3) {
            this.state[names[0]] || (this.state[names[0]] = {});
            this.state[names[0]][names[1]] || (this.state[names[0]][names[1]] = {});
            this.state[names[0]][names[1]][names[2]] = e.target.value;
        }
        if(ll > 3) {
            console.err('对象深度不能大于3');
        }
        this.props.handleInputChange(this.state);
    },
    render: function() {
        var classes = cx('col', this.props.col);
        var that = this;
        return (
            <div className={classes}>
                <section className="card hoverable">
                    <header className="title">页面信息</header>
                    <div className="card-content row">                        
                        <div className="input-field col s12">
                            <input required="required" className="validate" name="title" id="title" type="text" onChange={that.handleInput}/>
                            <label htmlFor="title">标签标题 title &#40;text&#41; </label>
                        </div>
                        <div className="input-field col s12">
                            <input required="required" className="validate" name="data_title" id="data_title" type="text" onChange={that.handleInput}/>
                            <label htmlFor="data_title">页面标题 data.title &#40;text&#41; </label>
                        </div>
                        <div className="input-field col s12">
                            <input required="required" className="validate" name="data_time" id="data_time" type="text" onChange={that.handleInput}/>
                            <label htmlFor="data_time">创建时间 data.time &#40;text&#41; </label>
                        </div>
                        <div className="input-field col s12">
                            <input required="required" className="validate" name="data_discrib" id="data_discrib" type="text" onChange={that.handleInput}/>
                            <label htmlFor="data_discrib">视频简介 data.discrib &#40;text&#41; </label>
                        </div>
                        <div className="input-field col s12">
                            <input required="required" className="validate" name="data_poster" id="data_poster" type="text" onChange={that.handleInput}/>
                            <label htmlFor="data_poster">视频封面图 data.poster &#40;png&#41; </label>
                        </div>

                        <div className="input-field col s12">
                            <input required="required" className="validate" name="data_video_name" id="data_video_name" type="text" onChange={that.handleInput}/>
                            <label htmlFor="data_video_name"> 视频文件 data.video.name &#40;mp4&#41; </label>
                        </div>
                                                            
                        <div className="input-field col s12">
                            <input required="required" className="validate" name="data_share_wechat" id="data_share_wechat" type="text" onChange={that.handleInput}/>
                            <label htmlFor="data_share_wechat">微信分享图 data.share.wechat &#40;png&#41; </label>
                        </div>
                        <div className="input-field col s12">
                            <input required="required" className="validate" name="data_share_summary" id="data_share_summary" type="text" onChange={that.handleInput}/>
                            <label htmlFor="data_share_summary">分享介绍 data.share.summary &#40;text&#41; </label>
                        </div>
                    </div>
                </section>
                <CommitBtns handleSubmit={this.props.handleSubmit}/>
            </div>
        );
    }
})

var CommitBtns = React.createClass({
    propTypes: {
        handleSubmit: React.PropTypes.func.isRequired
    },
    handleSubmit: function(type) {
        this.props.handleSubmit(type);
    },
    render: function() {
        var that = this;
        return (
            <div className="row">
                <button id="release" className="right waves-effect waves-light btn" onClick={that.handleSubmit.bind(this, 'save')}> 保存静态</button>
                <button id="perview" className="right waves-effect waves-light btn" style={{marginRight:'20px'}} onClick={that.handleSubmit.bind(this, 'preview')}>预览页面</button>
            </div>
        );
    }
})
var Setting = React.createClass({
    getInitialState: function() {
        return {
            formData: {
                "eventname": "",
                "postname": "",
                "title": "",
                "data": {
                    "time": "",
                    "title": "",
                    "discrib": "", 
                    "video":{           
                        "name": ""
                    },
                    "poster": "",
                    "share":{
                        "wechat": "",
                        "summary": ""
                    }
                }
            }
        }
    },
    handleInputChange: function(formData) { 
        $.extend(this.state.formData, formData);
        console.log(this.state);
        this.setState(this.state);
    },
    handleSubmit: function(type) {
        if(type === 'save') {
            var cfg = {
                head: '确定？',
                size: 'small',
                body: (
                    <div>
                        <p>确定生成静态页面?</p>
                    </div>
                ),
                btns: [
                    {
                        text: '确定',
                        callback: function() {
                            console.log('callllllll');
                        }
                    }
                ]
            }
        }
        if(type === 'preview') {
            var cfg = {
                head: '预览页面',
                body: (
                    <div>
                        <p>预览地址:<a href="www.insta360.com" target="_blank">v.insta360.com/post/index.html</a></p>
                    </div>
                ),
                btns: [
                    {
                        text: '确定',
                        callback: function() {
                            console.log('callllllll');
                        }
                    }
                ]
            }
        }
        Actions.showModal(cfg);

    },
    render: function() {
        return (
            <div className="wrap">
                
                <div className="row">
                    <div className="col s12">
                        <h5 className="card-panel teal white-text hoverable">创建事件 </h5>
                    </div>
                    <PathForm col="s6" handleInputChange={this.handleInputChange} dataStruct={this.state.formData} />
                    <DataForm col="s6" handleInputChange={this.handleInputChange} dataStruct={this.state.formData} handleSubmit={this.handleSubmit} />
                </div>
             </div>
        );
    }
});

module.exports = Setting;