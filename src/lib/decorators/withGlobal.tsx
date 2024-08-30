import { ComponentType, FC } from "react";

//O - OwnProps, S - StateProps

type WrappedReturn<O extends object, S extends object> = (
  WrappedComponent: ComponentType<O & S>,
) => FC<O>;


export default function withGlobal<O extends object, S extends object>(
  mapStateProps: (props: O) => S,
): WrappedReturn<O, S> {
  return (WrappedComponent: ComponentType<O & S>): FC<O> => {
    const EnhancedComponent: FC<O> = (props) => {
      const stateProps = mapStateProps(props);
      return <WrappedComponent {...props} {...stateProps} />;
    };

    EnhancedComponent.displayName = `withGlobal(${WrappedComponent.displayName || WrappedComponent.name})`;

    return EnhancedComponent;
  };
}