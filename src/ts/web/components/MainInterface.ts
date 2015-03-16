import React = require('react');
import TypedReact = require("typed-react");
import mui = require('material-ui');
import Utils = require('../Utils');
import DOM = require('../DOM');


class MainInterface extends TypedReact.Component<any, any> {
  render() {
    const options = [
      { payload: '1', text: 'Opt 1' },
      { payload: '2', text: 'Opt 2' },
      { payload: '3', text: 'Opt 3' }
    ];
    return React.DOM.div({ id: 'mainMenu' },
      Utils.toEl(mui.Toolbar,
        Utils.toEl(mui.ToolbarGroup, { float: 'left' },
          Utils.toEl(mui.DropDownMenu, { menuItems: options })
          )
        )
    );
  }
}

const mainInterface = TypedReact.createClass(MainInterface);
export = mainInterface;
