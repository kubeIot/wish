/**
 * Created by skylele on 3.3.17.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let devices = [
            {
                adress: "127.0.0.1",
                applications: [ "first app", "second app", "third app"],
                device_vendor: "Rpi",
                device_version: "3.0.0",
                id: "1",
                installed_capabilities: ["teplomer"],
                kernel_version: "vmlinuz-2.4.20-6",
                number_of_applications: 2,
                os_distribution: "ubuntu core",
                owner: 1,
                system_info: "vsechny informace zde",
                used_capabilities: ["teplomer"],
            },
            {
                adress: "127.0.0.2",
                applications: [ "second app", "third app"],
                device_vendor: "Rpi",
                device_version: "3.0.0",
                id: "2",
                installed_capabilities: ["teplomer"],
                kernel_version: "vmlinuz-2.4.20-6",
                number_of_applications: 2,
                os_distribution: "ubuntu core",
                owner: 1,
                system_info: "vsechny informace zde",
                used_capabilities: ["teplomer"],
            },            {
                adress: "127.0.0.3",
                applications: [ "third app", "second app"],
                device_vendor: "Rpi",
                device_version: "3.0.0",
                id: "3",
                installed_capabilities: ["teplomer"],
                kernel_version: "vmlinuz-2.4.20-6",
                number_of_applications: 2,
                os_distribution: "ubuntu core",
                owner: 1,
                system_info: "vsechny informace zde",
                used_capabilities: ["teplomer"],
            },            {
                adress: "127.0.0.4",
                applications: [ "forth app", "second app", "third app"],
                device_vendor: "Rpi",
                device_version: "3.0.0",
                id: "4",
                installed_capabilities: ["teplomer"],
                kernel_version: "vmlinuz-2.4.20-6",
                number_of_applications: 2,
                os_distribution: "ubuntu core",
                owner: 1,
                system_info: "vsechny informace zde",
                used_capabilities: ["teplomer"],
            },
        ];

        return {devices};
    }

}

