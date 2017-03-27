/**
 * Created by skylele on 5.3.17.
 */
/**
 * Created by skytzi on 6.2.17.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class testService {

    private _url: string = "http://127.0.0.1:8080/device/1";
    constructor (private _http: Http) {
    }

    getCurrentTime() {
        console.log("getting the time from " + this._url);
        return this._http.get(this._url)
            .map((response:Response) => response.json());
    }

    postJSON() {
        var json = JSON.stringify({ var1: 'test',  var2: 5})
        var params='json=' + json;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post('http://validate.jsontest.com', params, {
            headers: headers
        })
            .map(res => res.json());
    }

    postDevice(data:string) {
        var json = JSON.stringify(data)
        var params='json=' + json;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post('http://validate.jsontest.com', params, {
            headers: headers
        })
            .map(res => res.json());
    }
}