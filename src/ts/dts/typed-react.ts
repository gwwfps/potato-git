declare module 'typed-react' {
  class Component<P, S> extends Mixin<P, S> implements React.ComponentSpec<P, S> {
    render(): React.ReactElement<any>;
  }

  function createClass<P, S>(clazz: {
    new (): Component<P, S>;
  }, mixins?: React.Mixin<P, S>[]): React.ComponentClass<P>;

  function createMixin<P, S>(clazz: {
    new (): Mixin<P, S>;
  }): React.Mixin<P, S>;

  function extractPrototype<T>(clazz: {
    new (): T;
  }): T;

  class Mixin<P, S> implements React.Mixin<P, S> {
    refs: {
      [key: string]: React.Component<any, any>;
    };
    props: P;
    state: S;
    getDOMNode(): Element;
    setState(nextState: S, callback?: () => void): void;
    replaceState(nextState: S, callback?: () => void): void;
    forceUpdate(callback?: () => void): void;
    isMounted(): boolean;
    setProps(nextProps: P, callback?: () => void): void;
    replaceProps(nextProps: P, callback?: () => void): void;
  }

  class NotImplementedError implements Error {
    name: string;
    message: string;
    constructor(methodName: string);
  }
}
