# react-to-dijit-adapter

An adapter for react components to run as dijit widgets.

## Installation

**yarn**
```sh
yarn add @episerver/react-to-dijit-adapter
```

**npm**
```sh
npm install @episerver/react-to-dijit-adapter
```

## Usage

**Entry Point**

The `asEditorWidget` function will take care or rendering your react component inside of a dijit widget. You should set the result of this function as the default export of the entry point file for your custom editor.

```javascript
import React from "react";
import { asEditorWidget } from "@episerver/react-to-dijit-adapter";

const MyComponent = ({ onChange, value }) => {
    // Your component logic here...
};

export default asEditorWidget(MyComponent);
```

Your component will be passed the `onChange` and `value` props which should be used to render the value and to notify when the value changes and a new render should occur.

**Build**

In order to build and run the component in Episerver CMS you will need to configure your build to do two things:

1. Output the bundle as AMD format with the default export as the library export.
1. Mark `dojo/_base/declare` and `dijit/_WidgetBase` as external dependencies.

The following is an example of the changes needed in a webpack config. Similar changes should be done if using another bundling tool, e.g. rollup, or parcel.

```javascript
module.exports = {
    output: {
        libraryTarget: "amd",
        libraryExport: "default",
    },
    externals: [
        "dojo/_base/declare",
        "dijit/_WidgetBase"
    ]
};
```
