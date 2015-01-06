/** @jsx React.DOM */

var React = require('react');
var ChatView = require('./chat.react');

module.exports = ChatManagerView = React.createClass({
  render: function() {
    var chats = this.props.chatsTo.map(function(item ,i) {
      return (
        <li 
          key= {i}>
          <ChatView to={item} />
        </li>
      )
    },this);
  
    return (
      <ul>
        {chats}
      </ul>
    );
  }
});