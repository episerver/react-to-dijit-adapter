import React, { ComponentType } from "react";
import ReactDOM from "react-dom";
import declare from "dojo/_base/declare";
import WidgetBase from "dijit/_WidgetBase";

export interface EditorProps {
    [index: string]: any;
    onChange: (value: any) => void;
    readOnly?: boolean;
    value: any;
    params: any;
}

export const asEditorWidget = (WrappedComponent: ComponentType<EditorProps>): unknown => {
    return declare([WidgetBase], {
        class: "dijitInline",
        handleChange: function (value: any) {
            this.set("value", value);
            this.onChange(value);
        },
        postCreate: function () {
            this.domNode.addEventListener("focus", function (this: any) {
                this.onFocus();
            }.bind(this), true);
            this.domNode.addEventListener("blur", function (this: any) {
                this.onBlur();
            }.bind(this), true);
        },
        uninitialize: function () {
            ReactDOM.unmountComponentAtNode(this.domNode);
        },
        _setValueAttr: function (value: any) {
            this.value = value;
            ReactDOM.render(
                <WrappedComponent
                    {...this.editorProps}
                    onChange={this.handleChange.bind(this)}
                    readOnly={this.readOnly}
                    value={value}
                    params={this.params}
                />,
                this.domNode
            );
        }
    });
};
