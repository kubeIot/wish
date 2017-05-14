/**
 * Created by skylele on 13.4.17.
 */
/**
 * Created by skylele on 18.3.17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {applicationsUrl} from "../../configuration"


@Injectable()
export class NewApplicationService {
  private applicationsUrl = applicationsUrl;  // URL to web api
  constructor(private _http: Http) {
  }


  putApplication(data: string, id: string | number) {

    var params = JSON.stringify(data);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    // console.log(params);
    return this._http.put(this.applicationsUrl + id, params, {
      headers: headers
    })
      .map(res => res.json());

  }


  postApplication(data: string) {
    console.log(data);
    var params = JSON.stringify(data);
    var headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

    // console.log(params);
    return this._http.post(this.applicationsUrl, params, {
      headers: headers
    })
      .map(res => res.json());
  }

}
