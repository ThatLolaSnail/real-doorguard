import {Time} from "../../tools/time";

export interface InputIface {
    id: string;
    name: string;
    timeFrom: Time;
    timeTo: Time;
    enabled: boolean;
    description: string;

    type: string;
    pin: string;
}