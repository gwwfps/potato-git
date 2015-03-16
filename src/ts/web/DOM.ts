import _ = require('lodash');
import React = require('react');
import Utils = require('./Utils');

const DOM = React.DOM;

const tag = (name: string, ...args): React.ReactElement<any> => {
  const attributes = Utils.shiftProps(args);
  var tagArgs = [attributes];
  tagArgs.concat(args);
  return DOM[name].apply(this, tagArgs);
};

const bindTag = (name: string) => {
  return tag.bind(this, name);
};

var tags = {};
_.keys(DOM).forEach(name => tags[name] = bindTag(name));

export = tags;
