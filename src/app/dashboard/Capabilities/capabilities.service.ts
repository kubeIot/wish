/**
 * Created by skylele on 13.4.17.
 */

import { Injectable } from '@angular/core';
import { Http,Response, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Capability } from "./capabilities.metadata";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {capabilitiesUrl} from "../../configuration"


@Injectable()
export class CapabilitiesService {

  private capabilitiesUrl = capabilitiesUrl;  // URL to web api

  private capabilitiesList: Observable < Capability[] > = this.http.get(this.capabilitiesUrl, {
    headers:this.getHeaders()
  })
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    // .do(console.log(Response))
    // .do(console.log("yea"))
    .publishReplay(1)
    .refCount();


  constructor(private http: Http) { }



  getCapabilities(Capabilityfilter: any = "") {
    var capabilities = this.getList();


    if(Capabilityfilter != "") { //no filter causes error in "toLowerCase" + optimalization
      var nameFilter: string = Capabilityfilter.name.toLowerCase();
      var protocolFilter: string = Capabilityfilter.protocol.toLowerCase();
      var peripherialFilter: string = Capabilityfilter.peripherial_device.toLowerCase();

      //filter name
      if(nameFilter !== "") //if filter does not exist, dont lose time worrying about it
        capabilities = capabilities
          .map(capabilities => capabilities.filter(item =>
          item != null &&
          item.name != null && //if item is null, toLowerCase() would cause error
          item.name.toLowerCase().indexOf(nameFilter) !== -1));


      //filter protocol
      if(protocolFilter !== "") //if filter does not exist, dont lose time worrying about it
        capabilities = capabilities
          .map(capabilities => capabilities.filter(item =>
          item != null &&
          item.protocol != null && //if item is null, toLowerCase() would cause error
          item.protocol.toLowerCase().indexOf(protocolFilter) !== -1));

      //filter protocol
      if(peripherialFilter !== "") //if filter does not exist, dont lose time worrying about it
        capabilities = capabilities
          .map(capabilities => capabilities.filter(item =>
          item != null &&
          item.peripherial_device != null && //if item is null, toLowerCase() would cause error
          item.peripherial_device.toLowerCase().indexOf(peripherialFilter) !== -1));


    }
    return capabilities;

  }

  getCapability(capabilityId: number | string) {
    const url = `${this.capabilitiesUrl}${capabilityId}`;
    return this.http.get(url, {
      headers:this.getHeaders()
    })
      .map((response:Response) => response.json());
  }

  getList() : Observable<Capability[]>{
    return this.capabilitiesList;

  }



  deleteCapability(capabilityId: number|string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

    const url = `${this.capabilitiesUrl}${capabilityId}`;
    return this.http.delete(url, {
      headers: headers
    })
      .map(res => res.json());
  }


  getHeaders(): Headers {
    var headers = new Headers()
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    return headers;
  }
}
