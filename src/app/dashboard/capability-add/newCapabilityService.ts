/**
 * Created by skytzi on 6.5.17.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class NewCapabilityService {

  private _url: string = "http://date.jsontest.com";
  constructor (private _http: Http) {
  }



  postCapability(data:string) {
    //console.log(data);
    var json = JSON.stringify(data)

    var params=json;
    var headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer + token');

    console.log(params);
    return this._http.post('http://localhost:8080/capability', params, {
      headers: headers
    })
      .map(res => res.json());
  }
}
