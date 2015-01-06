/** @jsx React.DOM */

var React = require('react');
var socket = require('./../public/js/clientIO');

module.exports = ChatView = React.createClass({
  getInitialState: function() {
    return {
      inputMsg: '',
      messages: []
    };
  },
  componentDidMount: function() {
    var self = this;
    socket.on('chat message', function (data) {
        self.addMsg(data);
    });
  },
  addMsg: function(msg) {
    console.log('addMsg');
    var nextMsgs = this.state.messages.concat([msg]);
    this.setState({
      messages: nextMsgs
    });
  },
  handleChange: function(e) {
    this.setState({inputMsg: e.target.value});
  },
  sendMessage: function(e) {
    e.preventDefault();
    var nextMsgs = this.state.messages.concat([this.state.inputMsg]);
    //todo send msg
    socket.emit('chat message', {
      to: this.props.to,
      msg: this.state.inputMsg
    });
    this.setState({
      messages: nextMsgs, inputMsg: ''
    });
  },

  render: function() {
    var messages = this.state.messages.map(function(item ,i) {
      return (
        <li 
          key= {i}>
          {item}
        </li>
      )
    });
    return (
      <div>
        Chat capuchino
        <ul className='clear-list'>
          {messages}
        </ul>
        <form onSubmit={this.sendMessage}>
          <input 
            type="text" 
            value={this.state.inputMsg}
            onChange={this.handleChange} /> 
        </form>
      </div>
    )
  }
});