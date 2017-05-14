
/**
 * Created by skylele on 3.4.17.
 */
import {Component, Input} from '@angular/core';
import {ApplicationService} from "../Applications/applications.service";
import {Application} from "../Applications/applications.metadata";
@Component({
    moduleId: module.id,
    selector: 'application-thumb',
    templateUrl :  'applicationThumb.component.html' ,
    providers: [ApplicationService],
    styleUrls: ['../../../assets/css/device.css']
})

export class ApplicationThumbComponent {

    @Input() application: Application;
    @Input() baseImage: string;
}
