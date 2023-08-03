import 'react-hot-loader/patch';
import React from "react";
import reactDom from "react-dom";
import App from "./app";

const render = component => {
    reactDom.render(component,document.getElementById("app"));
}

if(module.hot) {
    module.hot.accept("./app.js", () => {
        let App = require("./app.js").default;
        render(App, document.getElementById("app"));
    });
}
render(<App/>);