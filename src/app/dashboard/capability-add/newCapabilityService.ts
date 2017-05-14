/**
 * Created by skytzi on 6.5.17.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {capabilitiesUrl} from "../../configuration"

@Injectable()
export class NewCapabilityService {


private capabilitiesUrl = capabilitiesUrl;  // URL to web api
  constructor (private _http: Http) {
  }



  postCapability(data:string) {

    var params=JSON.stringify(data);
    var headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

    // console.log(params);
    return this._http.post(this.capabilitiesUrl, params, {
      headers: headers
    })
      .map(res => res.json());
  }

  putCapability(data:string, id: string | number) {
      var params= JSON.stringify(data);
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      // console.log(params);
      return this._http.put(this.capabilitiesUrl, params, {
        headers: headers
      })
        .map(res => res.json());

     }
  }
