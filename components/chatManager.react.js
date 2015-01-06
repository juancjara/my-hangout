/** @jsx React.DOM */

var React = require('react');
var ChatView = require('./chat.react');

module.exports = ChatManagerView = React.createClass({
  render: function() {
    var chats = this.props.chatsTo.map(function(item ,i) {
      return (
        <li 
          className='same-line'
          key= {i}>
          <ChatView to={item} />
        </li>
      )
    },this);
  
    return (
      <ul className='clear-list chat-manager'>
        {chats}
      </ul>
    );
  }
});