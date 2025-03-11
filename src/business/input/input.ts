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
    private eventHandlerCallback: (pin: string) => void;

    constructor(id?: string, name?: string, timeFrom?: Time, timeTo?: Time, enabled?: boolean, description?: string, type?: InputType, pin?: string) {
        super(id, name, timeFrom, timeTo, enabled, description);
        this._type = type ?? InputType.VIRTUAL;
        this._pin = pin ?? "";
        console.log("created input", this.id);

        this.eventHandlerCallback = (pin: string) => this.handleInput(pin);
        this.eventHandler.addListener("hardwareInput", this.eventHandlerCallback);
    }

    destructor(): void {
        if (this.eventHandlerCallback){
            this.eventHandler.removeListener("hardwareInput", this.eventHandlerCallback);
        }
    }

    private handleInput(pin: string): void {
        if (this.type === InputType.HARDWARE && pin === this.pin){
            this.fireIfEnabledAndInTimeframe();
        }
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