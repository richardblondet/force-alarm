import axios from "axios";
import { getQueryString } from "../functions";

export default class AjaxService {
    constructor( ACTION, URL ) {
        this.url = URL;
        this.action = ACTION;
        this.axios = axios.create({
            baseURL: URL,
            headers: {
                "Content-Type": "application/json"
            }
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
