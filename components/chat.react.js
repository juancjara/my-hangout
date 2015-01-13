/** @jsx React.DOM */

var React = require('react');
var socket = require('./../public/js/clientIO');
var utils = require('./../utils');
var Loader = require('./loader.react');

module.exports = ChatView = React.createClass({
  getInitialState: function() {
    var from = this.props.from;
    var to =  this.props.to.email;
    var emails = '';
    if (from > to) {
      emails = from + to;
    } else {
      emails = to + from;
    }
    return {
      inputMsg: '',
      messages: [],
      writeStatus: '',
      emails: emails,
      waitingPrevious: false
    };
  },
  getPreviousMsgs: function(time) {
    if (this.state.waitingPrevious) {
      return;
    }
    var _this = this;
    var data = {
      emails: this.state.emails,
      limit: 8,
      lastUpdate: time
    }
    this.setState({
      waitingPrevious: true
    }, function() {
      setTimeout(function(){
        utils.api.consume('getMessages', data, function(err, data) {
          if (err || data.err){
            console.log('getMessages', err);
            _this.setState({
              waitingPrevious: false
            });
          }
          else {
            _this.bulkMsgAppend(data.messages);
          }
        });
      }, 1000);
    });
  },
  componentDidMount: function() {
    var self = this;
    var messageElm = this.refs.messageWrapper.getDOMNode();
    $(messageElm).on('scroll', function(e) {
      if (!this.scrollTop) {
        self.getPreviousMsgs(self.state.messages[0].dateTime);
      }
    })
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
      if (data.from === self.props.to.email) {
        self.setState({
          writeStatus: ''
        });
      }
    })
    var data = {
      emails: this.state.emails,
      limit: 14,
      lastUpdate: Date.now()
    }
    utils.api.consume('getMessages', data, function(err, data) {
      if (err || data.err) console.log('getMessages', err);
      else {
        self.bulkAddMsg(data.messages);
      }
    });
  },
  open: function() {
    this.props.openChat(this.props.to.email);
  },
  bulkMsgAppend: function(msgs) {
    var elm = this.refs.messageWrapper.getDOMNode();
    var lastScroll = elm.scrollHeight;
    var nextMsgs = this.state.messages;
    _this = this;
    nextMsgs = msgs.reverse().concat(nextMsgs);
    this.setState({
      messages: nextMsgs,
      waitingPrevious: false
    }, function() {
      elm.scrollTop = elm.scrollHeight - lastScroll;
    });
  },
  bulkAddMsg: function(msgs) {
    var nextMsgs = this.state.messages;
    var elm = this.refs.messageWrapper.getDOMNode();
    nextMsgs = nextMsgs.concat(msgs.reverse());
    this.setState({messages: nextMsgs}, function () {
      elm.scrollTop = elm.scrollHeight;
    });
  },
  addMsg: function(msg, who) {
    var nextMsgs = this.state.messages.concat([{
      msg: msg,
      who: who
    }]);
    var elm = this.refs.messageWrapper.getDOMNode();
    this.setState({
      messages: nextMsgs
    }, function () {
      elm.scrollTop = elm.scrollHeight + 18;
    }.bind(this));
  },
  handleChange: function(e) {
    var value = e.target.value;
    var typeEvent = 'off';
    if (value && value.length) {
      typeEvent = 'on'; 
    }
    typeEvent +=' writing';
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
      from: this.props.from,
      emails: this.state.emails
    });
    socket.emit('off writing', {
      to: this.props.to.email,
      from: this.props.from
    });
    this.addMsg(this.state.inputMsg, this.props.from);
    this.setState({
      inputMsg: ''
    });
  },
  render: function() {
    var len = this.state.messages.length;
    var messages = this.state.messages.map(function(item ,i) {
      var orientation = '';
      var myPicture;
      var hisPicture;
      var sameWriter = false;
      var isMeWriting = item.who == this.props.from;
      var isMeWritingNext = false;
      if (i > 0) {
        sameWriter = item.who === this.state.messages[i-1].who;  
      }
      if (i+1 < len) {
        isMeWritingNext = this.state.messages[i+1].who === this.props.from;
      }
      orientation += sameWriter ? '': ' space-msg';
      if (!sameWriter) {
         if (!isMeWriting) {
          hisPicture = <img className='picture' src={this.props.to.picture}></img>;
        }
      }
      if (isMeWriting && !isMeWritingNext) {
        myPicture = <img className='picture' src={this.props.pictureFrom}></img>;
      }

      if (!myPicture && !hisPicture) {
        orientation += isMeWriting ? ' right-msg': ' left-msg'
      }
      var msgClass = 'msg-text break-text ';
      msgClass += isMeWriting ? 'top': 'bottom';
      
      return (
        <li
          className={orientation}
          key= {i}>
          {hisPicture}
          <div className={msgClass}>
            {item.msg}
          </div>
          {myPicture}
        </li>
      )
    }.bind(this));
    var blockClass = 'chat-block ';
      blockClass += this.props.close ? 'hide': '';

    return (
      <div className={blockClass}>
        <div className='title clickable'>
          <div className='receiver pull-left'>{this.props.to.name}</div>
          <div className='options pull-right'>
            <div 
              onClick={this.props.closeChat.bind(null, this.props.to.email)}>
              X
            </div>
          </div>
        </div>

        <div className='messages-wrapper' ref='messageWrapper'>
          <Loader 
            show={this.state.waitingPrevious} />
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