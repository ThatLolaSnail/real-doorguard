import {doorguardObject} from "../doorguardObject/doorguardObject";
import {Time} from "../tools/time";

export enum InputType {
    VIRTUAL = "virtual",
    HARDWARE = "hardware",
}
function isInputType(value: string): value is InputType {
    return Object.values(InputType).includes(value as InputType);
}

export class Input extends doorguardObject {
    protected doorguardObjectType = "input";
    private _type: InputType;
    private _pin: string;

    constructor(id?: string, name?: string, timeFrom?: Time, timeTo?: Time, enabled?: boolean, description?: string, type?: InputType, pin?: string) {
        super(id, name, timeFrom, timeTo, enabled, description);
        this._type = type ?? InputType.VIRTUAL;
        this._pin = pin ?? "";

        this.eventHandler.addListener("hardwareInput", (pin: string) => {
            if (this.type === InputType.HARDWARE && pin === this.pin){
                this.fireIfEnabledAndInTimeframe();
            }
        });
    }

    public set type(type: string) {
        if (isInputType(type)) {
            this._type = type;
        } else {
            this._type = InputType.VIRTUAL;
        }
    }
    public get type() {
        return this._type;
    }
    public set pin(settings: string) {
        this._pin = settings;
    }
    public get pin():string {
        return this._pin;
    }
}