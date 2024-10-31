import {Time} from "../../tools/time";

export interface InputIface {
    id?: number;
    name: string;
    timeFrom: Time;
    timeTo: Time;
    enabled: boolean;
    description: string;

    type: string;
    settings: string;
    pin: string;
    channel: string;
    message: string;
}