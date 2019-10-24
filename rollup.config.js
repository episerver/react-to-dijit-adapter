import babel from "rollup-plugin-babel";

export default {
    input: "src/index.tsx",
    output: {
        file: "dist/bundle.js",
        format: "esm"
    },
    external: [
        "dijit/_WidgetBase",
        "dojo/_base/declare",
        "react",
        "react-dom"
    ],
    plugins: [
        babel({
            extensions: [".tsx"],
            presets: [
                "@babel/env",
                "@babel/react",
                "@babel/typescript"
            ]
        })
    ]
};
