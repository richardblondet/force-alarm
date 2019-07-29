import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

let loadedStates = ['complete', 'loaded', 'interactive'];

function run() {
    let app_container = document.getElementById("fd_app");
    
    if( app_container ) {
        ReactDOM.render(
            <App />, app_container
        );
    }
}
if( loadedStates.includes(document.readyState) && document.body ) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}

