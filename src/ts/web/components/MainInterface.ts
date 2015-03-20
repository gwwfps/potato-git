import React = require('react');
import M = require('material-ui');

import StatelessComponent = require('../StatelessComponent');


class MainInterface extends StatelessComponent<{}> {
  renderTree() {
    const options = [
      { payload: '1', text: 'Opt 1' },
      { payload: '2', text: 'Opt 2' },
      { payload: '3', text: 'Opt 3' }
    ];

    return {
      tag: 'div', props: { id: 'mainMenu' }, children: [
        {
          tag: M.Toolbar, children: [
            {
              tag: M.ToolbarGroup, props: { float: 'left' }, children: [
                {
                  tag: M.DropDownMenu, props: { menuItems: options }
                }
              ]
            }
          ]
        }
      ]
    };
  }
}
export = MainInterface;
