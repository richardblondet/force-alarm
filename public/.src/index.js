import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

let loadedStates = ['complete', 'loaded', 'interactive'];

console.log(window.FA_GLOBALS);

if(! window.FA_GLOBALS ) {
    window.FA_GLOBALS = {
        AJAX_URL: "http://localhost:8888/forcealarm/wp-admin/admin-ajax.php",
        NONCE: "48f7944606"
    };
}

function run() {
    let app_container = document.getElementById("fd_app");
    let globals = window.FA_GLOBALS;
    
    if( app_container ) {
        ReactDOM.render(
            <App globals={globals} />, app_container
        );
    }
}
if( loadedStates.includes(document.readyState) && document.body ) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}