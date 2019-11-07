import React, { useContext } from 'react';
import { AppContext } from '../components/AppContext';
import { State } from '../models/State';

interface ConnectParams<TOwnProps, TStateProps, TDispatchProps> {
  mapStateToProps?: (state: State, props: TOwnProps) => TStateProps,
  mapDispatchToProps?: TDispatchProps,
  component: React.ComponentType<any>
};

export function connect<TOwnProps = any, TStateProps = any, TDispatchProps = any>({ mapStateToProps = () => ({} as TStateProps), mapDispatchToProps = {} as TDispatchProps, component }: ConnectParams<TOwnProps, TStateProps, TDispatchProps>): React.FunctionComponent<TOwnProps> {
  const Component = (ownProps: TOwnProps) => {
    const context = useContext(AppContext);

    const dispatchFuncs: { [key: string]: any } = {};
    Object.keys(mapDispatchToProps).forEach((key) => {
      const oldFunc = (mapDispatchToProps as any)[key];
      const newFunc = (...args: any) => {
        const dispatchFunc = oldFunc(...args);
        dispatchFunc(context.dispatch);
      }
      dispatchFuncs[key] = newFunc
    });

    const props = Object.assign({}, ownProps, mapStateToProps(context.state, ownProps), dispatchFuncs);

    return React.createElement<TOwnProps>(component, props);
  }
  return React.memo(Component as any);
}

interface ConnectProps {
  mapStateToProps?: (state: State) => {},
  mapDispatchToProps?: {},
  component: React.ComponentType<any>,
  ownProps: any;
}

const Connect2: React.FC<ConnectProps> = (
  { ownProps, mapStateToProps = () => {}, mapDispatchToProps = {}, component }
) => {

  const context = useContext(AppContext);

  const dispatchFuncs: { [key: string]: any } = {};
  Object.keys(mapDispatchToProps).forEach((key) => {
    const oldFunc = (mapDispatchToProps as any)[key];
    const newFunc = (...args: any) => {
      const dispatchFunc = oldFunc(...args);
      dispatchFunc(context.dispatch);
    }
    dispatchFuncs[key] = newFunc
  });

  const props = Object.assign({}, ownProps, mapStateToProps(context.state), dispatchFuncs);
  return React.createElement(component, props);
}

export const Connect = React.memo(Connect2);
// export const Connect = Connect2;