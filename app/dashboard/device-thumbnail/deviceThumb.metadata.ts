/**
 * Created by skylele on 3.3.17.
 */

export interface Device {
    adress: string;
    applications: string[];
    device_vendor: string;
    device_version: string;
    id: number;
    installed_capabilities: string[];
    kernel_version: string;
    number_of_applications: number;
    os_distribution: string;
    owner: number;
    system_info: string;
    used_capabilities: string[];
}
