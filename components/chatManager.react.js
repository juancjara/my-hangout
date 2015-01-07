/** @jsx React.DOM */

var React = require('react');
var ChatView = require('./chat.react');

module.exports = ChatManagerView = React.createClass({
  getInitialState: function() {
    return {
      cont: null
    }
  },
  componentDidMount: function() {
    this.setState({
      cont: $('.messages-wrapper')
    })
  },
  scroll: function() {
    for(var i =0,len = this.state.cont.length; i < len; i++) {
      this.state.cont[i].scrollTop = 
        this.state.cont[i].scrollHeight + 18;
    }
  },
  render: function() {
    var chats = this.props.chatsTo.map(function(item ,i) {
      return (
        <li 
          className='same-line'
          key= {i}>
          <ChatView 
            from = {this.props.from}
            to = {item}
            close={item.close}
            closeChat={this.props.closeChat}
            openChat={this.props.openChat}
            scroll={this.scroll} />
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