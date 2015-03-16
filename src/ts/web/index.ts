import React = require('react');
import Utils = require('./Utils');
import MainInterface = require('./components/MainInterface');


React.render(Utils.toEl(MainInterface), document.getElementById('main'));
