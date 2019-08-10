import axios from "axios";
import { getQueryString } from "../functions";

export default class Orders {
    constructor( URL ) {
        this.url = URL;
        this.action = "force-alarm-orders";
        this.axios = axios.create({
            baseURL: URL,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    sendOrder( body = {} ) {
        console.log("%c Sending to wordpress", "font-size:2em", body );

        return this.axios({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: this.getFormDataFromObject( body )
        });
    }
    getQueryString( params ) {
        return getQueryString( params );
    }
    getFormDataFromObject( object ) {
        var formData = new FormData();
        formData.append("action", this.action);
        formData.append("data", JSON.stringify( object ));
        return formData;
    }
}
