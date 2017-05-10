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
    var params=JSON.stringify(data);
    var headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer + token');

    // console.log(params);
    return this._http.post('http://localhost:8080/capability', params, {
      headers: headers
    })
      .map(res => res.json());
  }

  putCapability(data:string) {
    var params= JSON.stringify(data);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer + token');
    // console.log(params);
    return this._http.put('http://localhost:8080/capability', params, {
      headers: headers
    })
      .map(res => res.json());

  }
  }
