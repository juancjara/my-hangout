/** @jsx React.DOM */

var React = require('react');
var HangoutApp = require('./components/hangoutApp.react');

var state = document.getElementById('initial-state').innerHTML;
state = state.replace(/&quot;/g, '"');
var initialState = JSON.parse(state);
React.render(
  <HangoutApp initialState={initialState} />,
  document.getElementById('react-app')
);
