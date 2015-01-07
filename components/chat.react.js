/** @jsx React.DOM */

var React = require('react');
var socket = require('./../public/js/clientIO');

module.exports = ChatView = React.createClass({
  getInitialState: function() {
    return {
      inputMsg: '',
      messages: [],
      writeStatus: ''
    };
  },
  componentDidMount: function() {
    var self = this;
    socket.on('chat message', function(data) {
      if (data.from === self.props.to.email) {
        self.open();
        self.addMsg(data.msg, self.props.to.email);
      }
    });
    socket.on('on writing', function(data) {
      if (data.from === self.props.to.email) {
        self.setState({
          writeStatus: 'escribiendo'
        });
      }
    })
    socket.on('off writing', function(data) {
      console.log('off writing', data)
      if (data.from === self.props.to.email) {
        self.setState({
          writeStatus: ''
        });
      }
    })
  },
  open: function() {
    this.props.openChat(this.props.to.email);
  },
  addMsg: function(msg, who) {
    var nextMsgs = this.state.messages.concat([{
      msg: msg,
      who: who
    }]);
    this.setState({
      messages: nextMsgs
    }, function () {
      this.props.scroll();
    }.bind(this));
  },
  handleChange: function(e) {
    var value = e.target.value;
    var typeEvent = 'off';
    if (value && value.length) {
      typeEvent = 'on'; 
    }
    typeEvent +=' writing';
    console.log('send writing', this.props.to.email, this.props.from);
    socket.emit(typeEvent, {
        to: this.props.to.email,
        from: this.props.from
      });
    this.setState({inputMsg: e.target.value});
  },
  sendMessage: function(e) {
    e.preventDefault();
    socket.emit('chat message', {
      to: this.props.to.email,
      msg: this.state.inputMsg,
      from: this.props.from
    });
    socket.emit('off writing', {
      to: this.props.to.email,
      from: this.props.from
    });
    this.addMsg(this.state.inputMsg, 'me');
    this.setState({
      inputMsg: ''
    });
  },
  render: function() {
    var messages = this.state.messages.map(function(item ,i) {
      var orientation = 'break-text';//(item.who == 'me') ? 'text-right': 'text-left';
      return (
        <li
          className={orientation}
          key= {i}>
          {item.msg}
        </li>
      )
    });
    var blockClass = 'chat-block ';
      blockClass += this.props.close ? 'hide': '';

    return (
      <div className={blockClass}>
        <div className='title clickable'>
          <div className='receiver pull-left'>{this.props.to.name}</div>
          <div className='options pull-right'>
            <div onClick={this.props.closeChat.bind(null, this.props.to.email)}>
              c
            </div>
          </div>
        </div>

        <div className='messages-wrapper'>
          <ul className='clear-list'>
            {messages}
          </ul>
          <div 
            className='writting-status'>
            {this.state.writeStatus}
          </div>
        </div>
        <form 
          className='form-msg'
          onSubmit={this.sendMessage}>
          <input 
            type="text" 
            value={this.state.inputMsg}
            name='inputMsg'
            onChange={this.handleChange} /> 
        </form>
        
      </div>
    )
  }
});