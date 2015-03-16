/// <references src="react.d.ts" />

declare module 'material-ui' {
  var Toolbar: React.ComponentClass<any>;

  interface ToolbarGroupProps {
    float: string;
  }
  var ToolbarGroup: React.ComponentClass<ToolbarGroupProps>;

  var FontIcon: React.ComponentClass<any>;
  var DropDownMenu: React.ComponentClass<any>;
}
