/**
 * Created by skylele on 3.3.17.
 */
import { Injectable } from '@angular/core';
import { Http,Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Device } from "./deviceThumb.metadata";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
@Injectable()
export class DeviceThumbService {
    private devicesUrl = 'http://127.0.0.1:8080/device';  // URL to web api
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

    getDevices(text: string): Observable<Device> {
        // console.log("devices - search: ", text);

        const lowerCaseText = text.toLowerCase();

        return this.getList()
            .map(devices => devices.filter(item => item.device_vendor.toLowerCase().indexOf(lowerCaseText) !== -1));
    }


    getDevice(id: number) {
        const url = `${this.devicesUrl}/${id}`;
        return this.http.get(url)
            .map((response:Response) => response.json());
    }




}