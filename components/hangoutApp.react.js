var React = require('react');

var FriendListView = require('./friendList.react');
var ChatManagerView = require('./chatManager.react');
var socket = require('./../public/js/clientIO');
var utils = require('./../utils');

module.exports = HangoutApp = React.createClass({
  getInitialState: function() {
    var user = this.props.initialState.user;
    var chatsTo = user.friends.slice(0);
    for (var i = 0; i < chatsTo.length; i++) {
      chatsTo[i].close = true;
    };
    var userData = {
      email: user.email,
      name: user.name,
      picture: user.picture
    }
    return {
      chatsTo: chatsTo,
      user: userData
    }
  },
  componentDidMount: function() {
    var self = this;
    socket.emit('add user', this.state.user.email);
    socket.on('open chat', function(email) {
      console.log('openChat', email);
      self.addChatTo(email);
    })
  },
  addChatTo: function(email) {
    var idx = utils.searchElement(this.state.chatsTo, email,
      'email');
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
  closeChat: function(email) {
    this.toggleChat(email, true);
  },
  openChat: function(email) {
    this.toggleChat(email, false);
  },
  toggleChat: function(email, status) {
    var idx = utils.searchElement(this.state.chatsTo, email,
                                  'email');
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
          friends={this.props.initialState.user.friends} 
          addChatTo={this.addChatTo}/>
        <ChatManagerView 
          from= {this.state.user.email}
          pictureFrom = {this.state.user.picture}
          chatsTo={this.state.chatsTo}
          closeChat= {this.closeChat}
          openChat= {this.openChat} />
      </div>
    )
  }
});
