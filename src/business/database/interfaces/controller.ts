import {Time} from "../../tools/time";

export interface Controller {
    id?: number;
    name: string;
    timeFrom: Time;
    timeTo: Time;
    enabled: boolean;
    description: string;

    inputs: string; // Array?
    outputs: string; // Array?
    conditionsFrom: number;
    conditionsTo: number;
}