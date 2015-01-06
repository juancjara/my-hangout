/** @jsx React.DOM */

var React = require('react');
var FriendListView = require('./friendList.react');
var ChatManagerView = require('./chatManager.react');
var socket = require('./../public/js/clientIO');
var utils = require('./../utils');

module.exports = HangoutApp = React.createClass({
  getInitialState: function(props) {
    props = props || this.props;
    var chatsTo = props.initialState.friends.slice(0);
    for (var i = 0; i < chatsTo.length; i++) {
      chatsTo[i].close = true;
    };
    return {
      chatsTo: chatsTo,
      username: props.initialState.username
    }
  },
  componentDidMount: function() {
    var self = this;
    socket.emit('add user', this.state.username);
    socket.on('open chat', function(username) {
      console.log('openChat', username);
      self.addChatTo(username);
    })
  },
  addChatTo: function(username) {
    var idx = utils.searchElement(this.state.chatsTo, username,
                                  'name');
    if (idx != -1) {
      var arr = this.state.chatsTo;
      arr[idx].close = false;
      this.setState({
        chatsTo: arr
      });
      return;
    }
    var nextChatsTo = this.state.chatsTo.concat([
      {
        username: username,
        close: false
      }
    ]);
    this.setState({
      chatsTo: nextChatsTo
    });
  },
  closeChat: function(username) {
    this.toggleChat(username, true);
  },
  openChat: function(username) {
    this.toggleChat(username, false);
  },
  toggleChat: function(username, status) {
    var idx = utils.searchElement(this.state.chatsTo, username,
                                  'name');
    var arr = this.state.chatsTo;
    arr[idx].close = status;
    this.setState({
      chatsTo: arr
    });
  },
  render: function() {
    return (
      <div>
        <FriendListView 
          friends={this.props.initialState.friends} 
          addChatTo={this.addChatTo}/>
        <ChatManagerView 
          from= {this.state.username}
          chatsTo={this.state.chatsTo}
          closeChat= {this.closeChat}
          openChat= {this.openChat} />
      </div>
    )
  }
});