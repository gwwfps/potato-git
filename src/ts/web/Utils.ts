import _ = require('lodash');
import React = require('react');


export function shiftProps(args: any[]) {
  var props = {};
  if (args.length && _.isPlainObject(args[0])) {
    props = args.shift();
  }
  return props;
}

export const toEl = (ComponentClass: React.ComponentClass<any>, ...children) => {
  var props = shiftProps(children);
  var args = [ComponentClass, props];
  args = args.concat(children);
  return React.createElement.apply(React, args);
};
