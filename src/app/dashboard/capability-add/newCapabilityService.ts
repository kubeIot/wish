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