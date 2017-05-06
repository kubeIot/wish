/**
 * Created by skylele on 3.3.17.
 */
import { Injectable } from '@angular/core';
import { Http,Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Device } from "./deviceThumb.metadata";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {devicesUrl} from "../../configuration"

@Injectable()
export class DeviceThumbService {
  deviceVendorFilter: string = "";
  addressFilter: string = "";
  systemInfoFilter = "";

  devices: Observable<Device[]>;
     private devicesUrl = devicesUrl;  // URL to web api
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
        this.deviceVendorFilter = filter.device_vendor.toLowerCase();
        this.addressFilter = filter.address.toLowerCase();
        this.systemInfoFilter = filter.system_info.toLowerCase();
        this.devices = this.getList();


        //filter device vendor
        if(this.deviceVendorFilter !== "") //if filter does not exist, dont lose time worrying about it
          this.devices = this.devices
                      .map(devices => devices.filter(item =>
                      item.device_vendor != null && //if item is null, toLowerCase() would cause error
                      item.device_vendor.toLowerCase().indexOf(this.deviceVendorFilter) !== -1));

        //filter address
        if(this.addressFilter !== "") //if filter does not exist, dont lose time worrying about it
          this.devices = this.devices
            .map(devices => devices.filter(item =>
            item.adress != null && //if item is null, toLowerCase() would cause error
            item.adress.toLowerCase().indexOf(this.addressFilter) !== -1));

        //filter system info
        if(this.systemInfoFilter !== "" && this.systemInfoFilter !== "all") //if filter does not exist, dont lose time worrying about it
          this.devices = this.devices
            .map(devices => devices.filter(item =>
            item.system_info != null && //if item is null, toLowerCase() would cause error
            item.system_info.toLowerCase().indexOf(this.systemInfoFilter) !== -1));


       return this.devices;
    }
      return this.getList();
    }


    getDevice(id: number) {
        const url = `${this.devicesUrl}/${id}`;
        return this.http.get(url)
            .map((response:Response) => response.json());
    }




}
