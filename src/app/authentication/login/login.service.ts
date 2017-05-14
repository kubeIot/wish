/**
 * Created by skytzi on 13.5.17.
 */
/**
 * Created by skylele on 13.4.17.
 */

import { Injectable } from '@angular/core';
import { Http,Response, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {loginUrl, registerUrl} from "../../configuration"


@Injectable()
export class LoginService {

  private loginUrl = loginUrl;  // url to login endpoint
  private registerUrl = registerUrl; //url to register endpoint


  constructor(private http: Http) { }



  postRegister(data:string) {
    var params=data;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(registerUrl, params, {
      headers: headers
    })
      .map(res => res.json());
  }

  postLogin(data:string) {
    var params=data;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(loginUrl, params, {
      headers: headers
    })
      .map(res => res.json());
  }


}
