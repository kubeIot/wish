/**
 * Created by skylele on 13.4.17.
 */

import { Injectable } from '@angular/core';
import { Http,Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Capability } from "./capabilities.metadata";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {capabilitiesUrl} from "../../configuration"


@Injectable()
export class CapabilitiesService {

  private capabilitiesUrl = capabilitiesUrl;  // URL to web api


  constructor(private http: Http) { }



  getCapability(capabilityId: number | string) {

    const url = `${this.capabilitiesUrl}${capabilityId}`;
    return this.http.get(url)
      .map((response:Response) => response.json());

  }

}
