/**
 * Created by skytzi on 14.12.16.
 */
"use strict";
var DeviceThumbService = (function () {
    function DeviceThumbService() {
    }
    DeviceThumbService.prototype.getItem = function () {
        return ["../img/120x120.png", "A101", "RPi 3.0", "Kitchen"];
    };
    DeviceThumbService.prototype.getItems = function () {
        return [
            {
                img: "../img/120x120.png",
                room: "A101",
                building: "RPi 3.0",
                people: "Kitchen",
            },
            {
                img: "../img/120x120.png",
                room: "A101",
                building: "RPi 3.0",
                people: "Kitchen",
            },
            {
                img: "../img/120x120.png",
                room: "A101",
                building: "RPi 3.0",
                people: "Kitchen",
            },
            {
                img: "../img/120x120.png",
                room: "A101",
                building: "RPi 3.0",
                people: "Kitchen",
            },
            {
                img: "../img/120x120.png",
                room: "A101",
                building: "RPi 3.0",
                people: "Kitchen",
            },
        ];
    };
    return DeviceThumbService;
}());
exports.DeviceThumbService = DeviceThumbService;
//# sourceMappingURL=deviceThumb.service.js.map