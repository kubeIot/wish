/**
 * Created by skylele on 13.4.17.
 */
/**
 * Created by skylele on 3.3.17.
 */
import { Injectable } from '@angular/core';
import { Http,Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Application } from "./applications.metadata";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class ApplicationService {
    private applicationsUrl = 'http://127.0.0.1:8080/application';  // URL to web api
    private applicationsList: Observable < Application[] > = this.http.get(this.applicationsUrl)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))

        .publishReplay(1)
        .refCount();
    constructor(private http: Http) { }

    getList(): Observable<Application[]> {
        return this.applicationsList;
    }

    getApplications(text: string): Observable<Application[]> {
        const lowerCaseText = text.toLowerCase();
        return this.getList()
            .map(applications => applications.filter(item => item.name.toLowerCase().indexOf(lowerCaseText) !== -1));
    }


    // getApplication(id: number) {
    //     const url = `${this.applicationsUrl}/${id}`;
    //     return this.http.get(url)
    //         .map((response:Response) => response.json());
    // }




}