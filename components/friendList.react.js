/** @jsx React.DOM */

var React = require('react');
var FriendView = require('./friend.react');
var socket = require('./../public/js/clientIO');
var utils = require('./../utils');

module.exports = FriendListView = React.createClass({
  getInitialState: function() {
    var friends = this.props.friends || [];
    return {
      friends: friends
    }
  },
  componentDidMount: function() {
    var self = this;
    socket.on('user joined', function(username) {
      self.connectUser(username);
    });
    socket.on('user left', function(username) {
      console.log('left', username);
      self.disconectUser(username);
    });
  },
  disconectUser: function(username) {
    var friends = this.state.friends;
    var idx = utils.searchElement(friends, username, 'name');
    friends[idx].online = false;
    this.setState({
      friends: friends
    });
  },
  connectUser: function(username) {
    var friends = this.state.friends;
    var idx = utils.searchElement(friends, username, 'name');
    friends[idx].online = true;
    this.setState({
      friends: friends
    });
  },
  render: function() {
    var friends = this.state.friends.map(function(item ,i) {
      var txt = item.online? 'on': 'off';
      return (
        <li 
          key= {i}
          onClick={this.props.addChatTo.bind(null, item.name)}>
          {item.name} | {txt}
        </li>
      )
    }.bind(this));
    return (
      <div>friends
        <ul>
          {friends}
        </ul>
      </div>
    );
  }
});