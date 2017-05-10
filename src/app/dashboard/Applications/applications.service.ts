/**
 * Created by skylele on 13.4.17.
 */
/**
 * Created by skylele on 3.3.17.
 */
import { Injectable } from '@angular/core';
import { Http,Response, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Application, Image} from "./applications.metadata";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {applicationsUrl, imagesUrl} from "../../configuration"



@Injectable()
export class ApplicationService {

  nameFilter = "";
  baseImageFilter = "";
  statusFilter = "";
  applications: Observable<Application[]>;
  private applicationsUrl = applicationsUrl;  // URL to web api
  private imagesUrl = imagesUrl;  // URL to web api
  private applicationsList: Observable < Application[] > = this.http.get(this.applicationsUrl)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
        .publishReplay(1)
        .refCount();
  private imagesList: Observable < Image[] > = this.http.get(this.imagesUrl)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
        .publishReplay(1)
        .refCount();
  images: Image[];



  constructor(private http: Http) {
  this.imagesList.subscribe(imgs => this.images = imgs)
  }

    getList(): Observable<Application[]> {
        return this.applicationsList;
    }



    getApplications(applicationFilter: any): Observable<Application[]> {
    return this.applyApplicationsFilter(applicationFilter)
    }

  applyApplicationsFilter(applicationFilter: any): Observable<Application[]> {
    var applications = this.getList();

    if(applicationFilter != "") { //no filter causes error in "toLowerCase" + optimalization
      var nameFilter: string = applicationFilter.name.toLowerCase();
      var baseImageFilter:string = applicationFilter.base_image.toLowerCase();
      var statusFilter:string = applicationFilter.status_message.toLowerCase();

      //filter device vendor
      if(nameFilter !== "") //if filter does not exist, dont lose time worrying about it
        applications = applications
          .map(applications => applications.filter(item =>
          item != null &&
          item.name != null && //if item is null, toLowerCase() would cause error
          item.name.toLowerCase().indexOf(nameFilter) !== -1));


      // filter base_image
      if(baseImageFilter !== "") //if filter does not exist, dont lose time worrying about it
        applications = applications
          .map(applications => applications.filter(item =>
            item != null &&
            item.base_image != null &&
            this.getBaseImageName(item.base_image).toLowerCase().indexOf(baseImageFilter) !== -1
          ));

      //filter system info
      if(statusFilter !== "" && statusFilter !== "all") //if filter does not exist, dont lose time worrying about it
        applications = applications
          .map(applications => applications.filter(item =>
          item != null &&
          item.status_message != null && //if item is null, toLowerCase() would cause error
          item.status_message.toLowerCase().indexOf(statusFilter) !== -1));
    }
    return applications;
  }


    getApplication(applicationsId: number | string) {

        const url = `${this.applicationsUrl}${applicationsId}`;
        return this.http.get(url)
            .map((response:Response) => response.json());

    }

  getImage(imageId: number | string) {

    const url = `${this.imagesUrl}${imageId}`;
    return this.http.get(url)
      .map((response:Response) => response.json());

  }

  getImages(): Observable<Image[]> {
    // console.log("devices - search: ", text);
    return this.imagesList
      .map(images => images);
  }

  getFilteredImages(filter: any[]): Observable<Image[]> {
    // console.log("devices - search: ", text);
    return this.imagesList
      .map(images => images);
  }

  getBaseImageName(imageId: string | number) {
    return this.images.filter(
      image => image.id == imageId
    )[0].name;
  }







  deleteApplication(applicationId: number|string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer + token');

    const url = `${this.applicationsUrl}${applicationId}`;
    return this.http.delete(url,  {
      headers: headers
    })
      .map(res => res.json());
  }




  // getApplication(id: number) {
    //     const url = `${this.applicationsUrl}/${id}`;
    //     return this.http.get(url)
    //         .map((response:Response) => response.json());
    // }




}
