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
}
