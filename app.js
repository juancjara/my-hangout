var React = require('react');
var ReactDom = require('react-dom');

var HangoutApp = require('./components/hangoutApp.react');

var state = document.getElementById('initial-state').innerHTML;
state = state.replace(/&quot;/g, '"');
console.log(state);
var initialState = JSON.parse(state);
// React.render(
//   <HangoutApp initialState={initialState} />,
//   document.getElementById('react-app')
// );

// var App = React.createClass({
//   render: function () {
//     return (
//       <div>
//         Hi
//       </div>
//     );
//   }
// });

// ReactDom.render(<App />, document.getElementById('react-app'));
ReactDom.render(
    <HangoutApp initialState={initialState} />,
  document.getElementById('react-app')
);
