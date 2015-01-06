/** @jsx React.DOM */

var React = require('react');
var FriendListView = require('./friendList.react');
var ChatManagerView = require('./chatManager.react');
var socket = require('./../public/js/clientIO');

module.exports = HangoutApp = React.createClass({
  getInitialState: function(props) {
    props = props || this.props;
    return {
      chatsTo: [],
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
    if (this.state.chatsTo.indexOf(username) != -1) {
      return;
    }
    console.log('aca', username);
    var nextChatsTo = this.state.chatsTo.concat([username]);
    this.setState({
      chatsTo: nextChatsTo
    });
  },
  render: function() {
    return (
      <div>
        <FriendListView 
          friends={this.props.initialState.friends} 
          addChatTo={this.addChatTo}/>
        <ChatManagerView chatsTo={this.state.chatsTo}/>
      </div>
    )
  }
});