/**
 * Created by skylele on 3.3.17.
 */
import { Injectable } from '@angular/core';
import { Http,Response, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Device, DeviceEvent, DeviceCapability} from "./devices.metadata";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {devicesUrl} from "../../configuration"

@Injectable()
export class DevicesService {
    private devicesUrl = devicesUrl;  // URL to web api
    eventsNotSearched: Boolean = true; //Optimalization in deviceEventsList searches
    capabilitiesNotSearched: Boolean = true; //Optimalization in deviceCapabilitiesList searches
    deviceEventsList: Observable<DeviceEvent[]>;
    deviceCapabilitiesList: Observable<DeviceCapability[]>;
    devices: Observable<Device[]>;
    private devicesList: Observable < Device[] > = this.http.get(this.devicesUrl,{
      headers: this.getHeaders()
    })
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

    getDevices(filter: any = ""): Observable<Device[]> {


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
        return this.http.get(url, {
          headers: this.getHeaders()
        })
            .map((response:Response) => response.json());
    }



  getDeviceCapabilities(id: number | string, filter: any = "") {
    if(this.capabilitiesNotSearched) {


      this.capabilitiesNotSearched = false;
      const url = `${this.devicesUrl}/${id}/capabilities`;
      return this.deviceCapabilitiesList = this.http.get(url,{
        headers: this.getHeaders()
      })
        .map((response:Response) => response.json()).filter(item => item != null);
    }
    return this.deviceCapabilitiesList;



  }

    getDeviceEventsList() {
      return this.deviceEventsList.map(event => event.filter(item => item != null));

      // return this.deviceEventsList.filter(item => item != null);

    }


  getDeviceEvents(id: number| string, filter: any = "") {

    if(this.eventsNotSearched) {
      this.eventsNotSearched = false;
      const url = `${this.devicesUrl}/${id}/events`;
      return this.deviceEventsList = this.http.get(url,{
        headers: this.getHeaders()
      })
        .map((response:Response) => response.json()).filter(item => item != null);
    }





    var deviceEvents: Observable<DeviceEvent[]>;
    deviceEvents = this.getDeviceEventsList();

    if(filter) { //no filter causes error in "toLowerCase" + optimalization
      var statusMessageFilter: string = filter.event_message.toLowerCase();
      var typeFilter: string = filter.event_type.toLowerCase();
      var timeFromFilter;
      var timeToFilter;
      try {
        timeFromFilter = filter.time_from.jsdate.getTime();
      }
      catch (e) {
        timeFromFilter = "";
      }
      try {
        timeToFilter = filter.time_to.jsdate.getTime();
      }
      catch (e) {
        timeToFilter = "";
      }



      if(statusMessageFilter !== "") //if filter does not exist, dont lose time worrying about it
        deviceEvents = deviceEvents
          .map(events => events.filter(item =>
          item != null &&
          item.event_message != null &&
          item.event_message.toLowerCase().indexOf(statusMessageFilter) !== -1
          ));

      if(typeFilter !== "" && typeFilter != "all")
        deviceEvents = deviceEvents
          .map(events => events.filter(item =>
            item != null &&
            item.event_type != null &&
            item.event_type.toLowerCase().indexOf(typeFilter) !== -1
          ));

      if(timeFromFilter != "" && timeFromFilter != null) {
        deviceEvents = deviceEvents
          .map(events => events.filter(item =>
          item != null &&
          item.event_timestamp != null &&
          /^([0-9]+)$/.test(item.event_timestamp) &&
            timeFromFilter <= item.event_timestamp
          ));
      }

      if(timeToFilter != "" && timeToFilter != null) {
        deviceEvents = deviceEvents
          .map(events => events.filter(item =>
            item != null &&
            item.event_timestamp != null &&
            /^([0-9]+)$/.test(item.event_timestamp) &&
            timeToFilter >= item.event_timestamp
          ));
      }


      deviceEvents.subscribe(item =>
      console.log(item));

    }
    return deviceEvents;

  }




  deleteDevice(deviceId: number|string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

    const url = `${this.devicesUrl}${deviceId}`;
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
