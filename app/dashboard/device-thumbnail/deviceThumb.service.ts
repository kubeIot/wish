/**
 * Created by skylele on 3.3.17.
 */
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Device } from "./deviceThumb.metadata";

@Injectable()
export class DeviceThumbService {
    private devicesUrl = 'http://127.0.0.1:8080/device';  // URL to web api

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