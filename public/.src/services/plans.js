import axios from "axios";
import { getQueryString } from "../functions";

export default class Plans {
    constructor( URL ) {
        this.url = URL;
        this.payload = {
            action: 'force-alarm-services'
        }
    }
    getPlans( body = {}) {
        const payload = {
            ...this.payload,
            ...body
        }
        
        return axios({
            method: 'post',
            url: this.url,
            data: this.getQueryString( payload ),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then( res => res.data );
    }
    getQueryString( params ) {
        return getQueryString( params );
    }
}