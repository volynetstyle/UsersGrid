/* eslint-disable @typescript-eslint/no-explicit-any */

type Falsy = false | 0 | "" | null | undefined;

interface BooleanConstructor {
  new <T>(value: T | Falsy): value is T;
  <T>(value: T | Falsy): value is T;
  readonly prototype: boolean;
}

type NoneToVoidFunction = () => void;
type NoneToUnknownFunction = () => unknown;
type NoneToAnyFunction = () => any;

type AnyLiteral = Record<string, any>;
type AnyClass = new (...args: any[]) => any;
type AnyFunction = (...args: any[]) => any;
type AnyToVoidFunction = (...args: any[]) => void;
type NoneToAnyFunction = (...args: any[]) => any;

type Nullable<T = null> = T | null;
type NonNullable<T> = T extends null | undefined ? never : T;