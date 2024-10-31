import {Time} from "../../tools/time";

export interface OutputIface {
    id: string;
    name: string;
    timeFrom: Time;
    timeTo: Time;
    enabled: boolean;
    description: string;

    type: string;
    settings: string;
    pin: string;
    repeat: number;
    duration: number;
}