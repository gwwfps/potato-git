import React = require('react');
import TypedReact = require('typed-react');
import MainInterface = require('./components/MainInterface');


React.render(React.createElement(TypedReact.createClass(MainInterface)), document.getElementById('main'));
