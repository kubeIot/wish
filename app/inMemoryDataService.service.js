"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var devices = [
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
        return { devices: devices };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=inMemoryDataService.service.js.map