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

  export default React.FC<ScriptProps>;
}
