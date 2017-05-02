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
import {applicationsUrl, imagesUrl} from "../../configuration"


@Injectable()
export class ApplicationService {

    private applicationsUrl = applicationsUrl;  // URL to web api
  private imagesUrl = imagesUrl;  // URL to web api


  private applicationsList: Observable < Application[] > = this.http.get(this.applicationsUrl)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))

        .publishReplay(1)
        .refCount();

  private imagesList: Observable < any[] > = this.http.get(this.imagesUrl)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    // .do(console.log(Response))
    // .do(console.log("yea"))
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

    getApplication(applicationsId: number | string) {

        const url = `${this.applicationsUrl}${applicationsId}`;
        return this.http.get(url)
            .map((response:Response) => response.json());

    }

  getImages(): Observable<any[]> {//Todo create image structure
    // console.log("devices - search: ", text);
    return this.imagesList
      .map(images => images);
  }



    // getApplication(id: number) {
    //     const url = `${this.applicationsUrl}/${id}`;
    //     return this.http.get(url)
    //         .map((response:Response) => response.json());
    // }




}
