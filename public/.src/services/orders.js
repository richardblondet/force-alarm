import AjaxService from "./";

export default class Orders extends AjaxService {
    sendOrder( body = {} ) {
        // console.log("%c Sending to wordpress", "font-size:2em", body );

        return this.axios({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: this.getFormDataFromObject( body )
        });
    }
    getTimesByDate(date = "" ) {
        const payload = {
            action: "force-alarm-get-orders-by-installation-date",
            date: date
        };
        // console.log( "%c this.getQueryString( payload )", "font-size:2em;", this.getQueryString( payload ));
        return this.axios({
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: this.getQueryString( payload )
        }).then( res => res.data );
    }
}
