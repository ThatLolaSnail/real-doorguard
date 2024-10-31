import {Time} from "../../tools/time";

export interface ControllerIface {
    id: string;
    name: string;
    timeFrom: Time;
    timeTo: Time;
    enabled: boolean;
    description: string;

    inputs: string;
    outputs: string;
    conditionsFrom: number;
    conditionsTo: number;
}