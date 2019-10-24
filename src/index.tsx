import React, { ComponentType } from "react";
import ReactDOM from "react-dom";
import declare from "dojo/_base/declare";
import WidgetBase from "dijit/_WidgetBase";

export interface EditorProps {
    onChange: (value: any) => void;
    readOnly?: boolean;
    value: any;
}

export const asEditorWidget = (WrappedComponent: ComponentType<EditorProps>): unknown => {
    return declare([WidgetBase], {
        class: "dijitInline",
        handleChange: function (value: any) {
            this.onFocus();
            this.set("value", value);
            this.onChange(value);
        },
        uninitialize: function () {
            ReactDOM.unmountComponentAtNode(this.domNode);
        },
        _setValueAttr: function (value: any) {
            this.value = value;
            ReactDOM.render(
                <WrappedComponent
                    onChange={this.handleChange.bind(this)}
                    readOnly={this.readOnly}
                    value={value}
                />,
                this.domNode
            );
        }
    });
};
