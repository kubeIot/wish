/**
 * Created by skylele on 10.4.17.
 */
export interface Application {
    base_image: number;
    capabilities: number[];
    device_id: number;
    id: number;
    name: string;
    ports: string[];
    service_ip: string;
    status: number;
    status_message: string;
}