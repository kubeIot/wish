/**
 * Created by skytzi on 9.2.17.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let devices = [
            {
                id: 1,
                img: "../img/120x120.png",
                room: "A101",
                building: "RPi 3.0",
            },
            {
                id: 2,
                img: "../img/120x120.png",
                room: "B202",
                building: "BlackBone",
            },
            {
                id: 3,
                img: "../img/120x120.png",
                room: "C303",
                building: "RPi 2.0",
            },
            {
                id: 4,
                img: "../img/120x120.png",
                room: "D404",
                building: "Something",
            },
            {
                id: 5,
                img: "../img/120x120.png",
                room: "E505",
                building: "Mock",
            },
        ];

        return {devices};
    }

}
