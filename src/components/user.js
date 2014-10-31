/** @jsx React.DOM */

var React = require('react'),
    listenTo = require('reflux').listenTo,
    userStore = require('../stores/userstore'),
    UserField = require('./userfield');

var User = React.createClass({
  mixins: [listenTo(userStore,"getUserData","getUserData")],
  getInitialState: function(){return {};},
  getUserData: function(users){
    var user = users[this.props.params.username];
    if (user){
      this.setState({found:true,user:user});
    } else {
      this.setState({found:false});
    }
  },
  render: function(){
    var name = this.props.params.username,
        user = this.state && this.state.user || {},
        repo = user.repo;
    return this.state && this.state.found ? (
      <div>
        <h3>{name}</h3>
        <dl className='dl-horizontal'>
          <dt>Logins:</dt><dd>{user.logins}</dd>
          <dt>Chats:</dt><dd>{user.chats}</dd>
          <dt>Description:</dt>
          <dd>
            <UserField username={name} path="desc"/>
          </dd>
          <dt>repo name:</dt>
          <dd>
            <UserField username={name} path="repo"/>
            {repo ? (
              <span>
                {' '}<a href={'http://github.com/'+name+"/"+repo}>code</a>
                {' '}<a href={'https://'+name+'.github.io/'+repo+"/dist"}>app</a>
              </span>
            ) : ""}
          </dd>
        </dl>
      </div>
    ) : <p>Couldn't find user {name}.</p>;
  }
});

module.exports = User;
