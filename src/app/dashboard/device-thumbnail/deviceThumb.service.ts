/**
 * Created by skylele on 3.3.17.
 */
import { Injectable } from '@angular/core';
import { Http,Response, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Device, DeviceEvent, DeviceCapability} from "./deviceThumb.metadata";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {devicesUrl} from "../../configuration"

@Injectable()
export class DeviceThumbService {

    private devicesUrl = devicesUrl;  // URL to web api
    eventsNotSearched: Boolean = true; //Optimalization in deviceEventsList searches
    capabilitiesNotSearched: Boolean = true; //Optimalization in deviceCapabilitiesList searches
    deviceEventsList: Observable<DeviceEvent[]>;
    deviceCapabilitiesList: Observable<DeviceCapability[]>;
    devices: Observable<Device[]>;
    private devicesList: Observable < Device[] > = this.http.get(this.devicesUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      // .do(console.log(Response))
      // .do(console.log("yea"))
      .publishReplay(1)
      .refCount();


    constructor(private http: Http) { }

    getList(): Observable<Device[]> {
        return this.devicesList;
    }

    getDevices(filter: any): Observable<Device[]> {
      // console.log(filter);
      // console.log(filter.device_vendor);
      // console.log(filter.address);
      if(filter != "") { //no filter causes error in "toLowerCase" + optimalization
        var deviceVendorFilter = filter.device_vendor.toLowerCase();
        var addressFilter = filter.address.toLowerCase();
        var systemInfoFilter = filter.system_info.toLowerCase();
        var devices = this.getList();


        //filter device vendor
        if(deviceVendorFilter !== "") //if filter does not exist, dont lose time worrying about it
          devices = devices
                      .map(devices => devices.filter(item =>
                      item != null &&
                      item.device_vendor != null && //if item is null, toLowerCase() would cause error
                      item.device_vendor.toLowerCase().indexOf(deviceVendorFilter) !== -1));

        //filter address
        if(addressFilter !== "") //if filter does not exist, dont lose time worrying about it
          devices = devices
            .map(devices => devices.filter(item =>
            item != null &&
            item.adress != null && //if item is null, toLowerCase() would cause error
            item.adress.toLowerCase().indexOf(addressFilter) !== -1));

        //filter system info
        if(systemInfoFilter !== "" && systemInfoFilter !== "all") //if filter does not exist, dont lose time worrying about it
          devices = devices
            .map(devices => devices.filter(item =>
            item != null &&
            item.system_info != null && //if item is null, toLowerCase() would cause error
            item.system_info.toLowerCase().indexOf(systemInfoFilter) !== -1));


       return devices;
    }
      return this.getList();
    }


    getDevice(id: number) {
        const url = `${this.devicesUrl}/${id}`;
        return this.http.get(url)
            .map((response:Response) => response.json());
    }



  getDeviceCapabilities(id: number | string, filter: any = "") {

    if(this.capabilitiesNotSearched) {
      this.capabilitiesNotSearched = false;
      const url = `${this.devicesUrl}/${id}/capabilities`;
      return this.deviceCapabilitiesList = this.http.get(url)
        .map((response:Response) => response.json()).filter(item => item != null);
    }



  }

    getDeviceEventsList() {
      return this.deviceEventsList.filter(item => item != null);
    }


  getDeviceEvents(id: number| string, filter: any = "") {

    if(this.eventsNotSearched) {
      this.eventsNotSearched = false;
      const url = `${this.devicesUrl}/${id}/events`;
      return this.deviceEventsList = this.http.get(url)
        .map((response:Response) => response.json()).filter(item => item != null);
    }


    var deviceEvents: Observable<DeviceEvent[]>;

    if(filter) { //no filter causes error in "toLowerCase" + optimalization
      var statusMessageFilter: string = filter.event_message.toLowerCase();
      deviceEvents = this.getDeviceEventsList();


      if(statusMessageFilter !== "") //if filter does not exist, dont lose time worrying about it
        deviceEvents = deviceEvents
          .map(events => events.filter(item =>
          item != null &&
          item.event_message != null &&
          item.event_message.toLowerCase().indexOf(statusMessageFilter) !== -1
          ));



      return deviceEvents;
    }
    return this.getDeviceEventsList();

  }




  deleteDevice(deviceId: number|string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer + token');

    const url = `${this.devicesUrl}${deviceId}`;
    return this.http.delete(url, {
      headers: headers
    })
      .map(res => res.json());
  }


}
