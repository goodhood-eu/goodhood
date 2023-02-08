declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module 'react-load-script' {
  type ScriptProps = {
    url?: string;
    async?: boolean;
    onLoad?: () => void;
    onError?: () => void;
    onCreate?: () => void;
    attributes?: Omit<
    React.HTMLAttributes<HTMLScriptElement>,
    'onload' | 'onerror' | 'src'
    >;
  };

  const Script: React.ComponentType<ScriptProps>;
  export default DefaultIcon;
}

declare const nominalType: unique symbol;

type Nominal<Type, Identifier> = Type & {
  readonly [nominalType]: Identifier;
};
