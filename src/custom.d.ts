/* 
 The "d.ts" file is used to provide typescript type information about an API that's written in JavaScript.
 The idea is that you're using something like jQuery or underscore, an existing javascript library. 
 You want to consume those from your typescript code.
 Rather than rewriting jquery or underscore or whatever in typescript,
 you can instead write the d.ts file, which contains only the type annotations. 
 Then from your typescript code you get the typescript benefits of static type checking while still 
 using a pure JS library.

This works thanks to TypeScript's constraint of not letting you add the ".ts" extension at the end of 
the import statement. Because of that, when you reference some file, let's say, my-module.js, 
if there is a my-module.d.ts next to it, then TypeScript will include its content:
src/
  my-module.js
  my-module.d.ts
  index.ts
---------------------------------------------------------------------------------------------------------
my-module.js :

const thing = 42;

module.exports = { thing };
---------------------------------------------------------------------------------------------------------
my-module.d.ts :

export declare const thing: number;
---------------------------------------------------------------------------------------------------------
index.ts :

import { thing } from "./my-module"; // <- no extension

// runtime implementation of `thing` is taken from ".js"
console.log(thing); // 42

// type declaration of `thing` is taken from ".d.ts"
type TypeOfThing = typeof thing; // number
---------------------------------------------------------------------------------------------------------
*/

// To import .svg file type in component we declare it here and export
declare module "*.svg" {
  import React = require("react");

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// To import .png file type in component we declare it here and export
declare module "*.pdf" {
  const content: any;
  export default content;
}

// To import .png file type in component we declare it here and export
declare module "*.png" {
  const content: any;
  export default content;
}

// To import .mp4 file type in component we declare it here and export
declare module "*.mp4" {
  const content: any;
  export default content;
}

declare module "*.gif" {
  const content: any;
  export default content;
}

// To import .jpg file type in component we declare it here and export
declare module "*.jpg" {
  const content: any;
  export default content;
}

// index.d.ts
declare module "@mui/private-theming" {
  import type { Theme } from "@mui/material/styles";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
