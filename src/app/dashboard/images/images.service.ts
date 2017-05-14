/**
 * Created by skytzi on 14.5.17.
 */
/**
 * Created by skylele on 13.4.17.
 */
/**
 * Created by skylele on 3.3.17.
 */
import { Injectable } from '@angular/core';
import { Http,Response, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Image} from "./images.metadata";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {applicationsUrl, imagesUrl} from "../../configuration"

import * as _ from 'underscore';
import {AvailableCapabilities} from "../application-add/newApplication.metadata";


@Injectable()
export class ImagesService {

  private imagesUrl = imagesUrl;  // URL to web api

  private imagesList: Observable < Image[] > = this.http.get(this.imagesUrl, {
    headers: this.getHeaders()
  })
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    .publishReplay(1)
    .refCount();
  images: Image[];



  constructor(private http: Http) {
    this.imagesList.subscribe(imgs => this.images = imgs)
  }




  getImage(imageId: number | string) {

    const url = `${this.imagesUrl}${imageId}`;
    return this.http.get(url, {
      headers: this.getHeaders()
    })
      .map((response:Response) => response.json());

  }

  getImages(imageFilter:any = ""): Observable<Image[]> {
    // console.log("devices - search: ", text);
    var images = this.imagesList;


    if(imageFilter != "") { //no filter causes error in "toLowerCase" + optimalization
      var nameFilter: string = imageFilter.name.toLowerCase();
      var baseImageFilter:string = imageFilter.base_image.toLowerCase();
      var descriptionFilter:string = imageFilter.description.toLowerCase();

      //filter device vendor
      if(nameFilter !== "") //if filter does not exist, dont lose time worrying about it
        images = images
          .map(images => images.filter(item =>
            item != null &&
            item.name != null && //if item is null, toLowerCase() would cause error
            item.name.toLowerCase().indexOf(nameFilter) !== -1
          ));


      // filter base_image
      if(baseImageFilter !== "") //if filter does not exist, dont lose time worrying about it
        images = images
          .map(images => images.filter(item =>
            item != null &&
            item.base_image != null &&
            item.base_image.toLowerCase().indexOf(baseImageFilter) !== -1
          ));

      //filter system info
      if(descriptionFilter !== "") //if filter does not exist, dont lose time worrying about it
        images = images
          .map(images => images.filter(item =>
          item != null &&
          item.description != null && //if item is null, toLowerCase() would cause error
          item.description.toLowerCase().indexOf(descriptionFilter) !== -1));
    }

    return images
      .map(images => images);

  }


  //for add application purposes
  // getFilteredImages(filter: any = "",): Observable<Image[]> {
  //
  // if (capabilities != [] && filter && filter.device_id.indexOf(" — ") >= 0) {
  //   var filteringArray: String[] | Number[] = [];
  //   var splitValue = filter.device_id.split(" — ");
  //   var deviceFilter = splitValue[0];
  //   //gets available capabilies of selected device
  //   capabilities.forEach(item => {
  //     if(item.deviceId == deviceFilter)
  //       filteringArray = item.availableCapabilities;
  //   });
  //   //returns list of usable images on that device
  //   return this.imagesList
  //     .map((images) => {
  //     return images.filter((image) => image.required_capabilities.length == _.union(image.required_capabilities, <number[]>filteringArray).length)
  //     });
  // }
  //
  //
  // return this.imagesList;
  // }

  getBaseImageName(imageId: string | number) {
    return this.images.filter(
      image => image.id == imageId
    )[0].name;
  }




  getHeaders(): Headers {
    var headers = new Headers()
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    return headers;
  }



}
