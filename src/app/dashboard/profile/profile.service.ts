/**
 * Created by skytzi on 2.5.17.
 */
/**
 * Created by skylele on 3.3.17.
 */
import { Injectable } from '@angular/core';
import { Http,Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {userUrl} from "../../configuration"

@Injectable()
export class UserService {
  private userUrl = userUrl;  // URL to web api
  constructor(private http: Http) { }


  getUser(id: number) {
    const url = `${this.userUrl}/${id}`;
    return this.http.get(url)
      .map((response:Response) => response.json());
  }




}
