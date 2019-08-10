import axios from "axios";
import { getQueryString } from "../functions";

export default class Orders {
    constructor( URL ) {
        this.url = URL;
        this.action = 'force-alarm-orders';
        this.axios = axios.create({
            baseURL: URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // this.payload = {
        //     action: 'force-alarm-orders'
        // }
    }
    sendOrder( body = {} ) {
        console.log("%c Sending to wordpress", "font-size:2em", body );
        // const url = `?${this.getQueryString({ action: this.action })}`;
        return this.axios({
            method: "POST",
            params: {
                action: this.action
            },
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        });

        return axios({
            method: 'POST',
            url: this.url + '?' + this.getQueryString({ action: this.action }),
            data: { data: body },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( res => res.data );
    }
    getQueryString( params ) {
        return getQueryString( params );
    }
}
