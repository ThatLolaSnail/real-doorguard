import {Time} from "../../tools/time";

export interface Output {
    id?: number;
    name: string;
    timeFrom: Time;
    timeTo: Time;
    enabled: boolean;
    description: string;

    type: string; // ??
    settings: string;
    pin: string;
    repeat: number;
    duration: number;
    channel: string;
    message: string;
}