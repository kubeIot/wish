/**
 * Created by skytzi on 14.12.16.
 */
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Device } from "./devices";

@Injectable()
export class DeviceThumbService {
    private devicesUrl = 'api/devices';  // URL to web api

    constructor(private http: Http) { }

    getDevices(): Promise<Device[]> {
        return this.http.get(this.devicesUrl)
            .toPromise()
            .then(response => response.json().data as Device[]);
    }

    getDevice(id: number): Promise<Device> {
        const url = `${this.devicesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Device);
    }



}


