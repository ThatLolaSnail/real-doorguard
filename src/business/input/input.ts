import {doorguardObject} from "../doorguardObject/doorguardObject";

export enum InputType {
    VIRTUAL = "virtual",
    HARDWARE = "hardware",
}
function isInputType(value: string): value is InputType {
    return Object.values(InputType).includes(value as InputType);
}

export class Input extends doorguardObject {
    protected doorguardObjectType = "input";
    private _type: InputType = InputType.VIRTUAL;
    private _settings: string = "";
    private _pin: string = "";

    constructor(id: string) {
        super(id);
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
        // TODO: Change in Database
    }
    public get type() {
        return this._type;
    }
    public set settings(settings: string) {
        // TODO: Change in Database
        this._settings = settings;
    }
    public get settings() {
        return this._settings;
    }
    public set pin(settings: string) {
        // TODO: Change in Database
        this._pin = settings;
    }
    public get pin():string {
        return this._pin;
    }
}