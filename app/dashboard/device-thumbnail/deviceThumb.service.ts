/**
 * Created by skylele on 3.3.17.
 */
import { Injectable } from '@angular/core';
import { Http,Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Device } from "./deviceThumb.metadata";
import 'rxjs/add/operator/map';
@Injectable()
export class DeviceThumbService {
    private devicesUrl = 'http://127.0.0.1:8080/device';  // URL to web api

    constructor(private http: Http) { }

    getDevices() {
        return this.http.get(this.devicesUrl)
            .map((response:Response) => response.json());
    }


    getDevice(id: number) {
        const url = `${this.devicesUrl}/${id}`;
        return this.http.get(url)
            .map((response:Response) => response.json());
    }




}