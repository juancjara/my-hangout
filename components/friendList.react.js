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
    socket.on('user joined', function(email) {
      self.connectUser(email);
    });
    socket.on('user left', function(email) {
      self.disconectUser(email);
    });
  },
  disconectUser: function(email) {
    var friends = this.state.friends;
    var idx = utils.searchElement(friends, email, 'email');
    friends[idx].online = false;
    this.setState({
      friends: friends
    });
  },
  connectUser: function(email) {
    var friends = this.state.friends;
    var idx = utils.searchElement(friends, email, 'email');
    if (idx != -1) {
      friends[idx].online = true;
      this.setState({
        friends: friends
      });
    }
  },
  render: function() {
    var friends = this.state.friends.map(function(item ,i) {
      var statusClass = 'status '
      statusClass += (item.online? 'online': 'offline');
      return (
        <li 
          className='friend-block clickable'
          key= {i}
          onClick={this.props.addChatTo.bind(null, item.email)}>
          <div className='picture-wrapper pull-left'>
            <img className='picture' src={item.picture}></img>
            <div className={statusClass}></div>
          </div>
          <div className='pull-left'>
            <div className='name'>{item.name}</div>
            <div className='last-msg'>Yo: xd</div>
          </div>
        </li>
      )
    }.bind(this));
    return (
      <div className="friend-list">
        <ul className="clear-list">
          {friends}
        </ul>
      </div>
    );
  }
});
