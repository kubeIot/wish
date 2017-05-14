/**
 * Created by skylele on 18.3.17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {devicesUrl} from "../../configuration"

@Injectable()
export class NewDeviceService {

  private devicesUrl = devicesUrl;  // URL to web api
    constructor (private _http: Http) {
    }



  postDevice(data:string) {

    var params=JSON.stringify(data);
    var headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

    // console.log(params);
    return this._http.post(this.devicesUrl, params, {
      headers: headers
    })
      .map(res => res.json());
  }

  putDevice(data:string, id: string | number) {
    var params= JSON.stringify(data);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    // console.log(params);
    return this._http.put(this.devicesUrl, params, {
      headers: headers
    })
      .map(res => res.json());

  }


}
