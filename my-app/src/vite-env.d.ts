/// <reference types="vite/client" />

declare module '*.css' {
      interface IClassNames {
        [className: string]: string
      }
      const classNames: IClassNames
      export = classNames
    }

declare module "*.svg" {
      import React = require('react');
      export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
      const src: string;
      export default src;
    }

declare module "*.png" {
      const value: string;
      export default value;
    }
