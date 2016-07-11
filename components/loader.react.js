var React = require('react');

module.exports = Loader = React.createClass({
  render: function(){
    return (
      <div className={"loader " + (this.props.show ? "" : "hide")}>
        <img src="public/svg/loader.svg" />
      </div>
    )
  }
});
