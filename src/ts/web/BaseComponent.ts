import _ = require('lodash');
import React = require('react');
import TypedReact = require("typed-react");


interface RenderNode<P> {
  tag: String|React.ComponentClass<P>|ComponentClass<P, any>;
  props?: P;
  children?: RenderNode<any>[];
}

interface ComponentClass<P, S> {
  new (): TypedReact.Component<P, S>;
}

const createElement = (node: RenderNode<any>): React.ReactElement<any> => {
  var tag = node.tag;
  if (tag instanceof TypedReact.Component) {    
    tag = TypedReact.createClass(<ComponentClass<any, any>> tag);
  }
  var args = [node.tag, node.props || {}];
  if (node.children) {
    args = args.concat(node.children.map((child) => {
      return createElement(child);
    }));
  }
  return React.createElement.apply(React, args);
};

class BaseComponent<P, S> extends TypedReact.Component<P, S> {
  render() {
    return createElement(this.renderTree());
  }

  renderTree(): RenderNode<any> {
    throw 'Not implemented';
  }
}

export = BaseComponent;
