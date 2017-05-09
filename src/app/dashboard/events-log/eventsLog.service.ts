/**
 * Created by skytzi on 8.5.17.
 */
/**
 * Created by skylele on 13.4.17.
 */

import { Injectable } from '@angular/core';
import { Http,Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {logUrl} from "../../configuration"


@Injectable()
export class LogService {

  private logUrl = logUrl;  // URL to web api

  private logList: Observable < any[] > = this.http.get(this.logUrl)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    // .do(console.log(Response))
    // .do(console.log("yea"))
    .publishReplay(1)
    .refCount();


  constructor(private http: Http) { }



  getLog(filter: any[]) {
    return this.getList();

  }

  getCapability(logId: number | string) {

    const url = `${this.logList}${logId}`;
    return this.http.get(url)
      .map((response:Response) => response.json());

  }

  getList() : Observable<any[]>{
    return this.logList;

  }
}
