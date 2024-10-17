import {doorguardObject} from "../doorguardObject/doorguardObject";

export enum InputType {
    VIRTUAL = "virtual",
    HARDWARE = "hardware",
    DISCORD = "discord",
}
function isInputType(value: string): value is InputType {
    return Object.values(InputType).includes(value as InputType);
}

export class Input extends doorguardObject {
    protected doorguardObjectType = "input";
    private _type: InputType = InputType.VIRTUAL;
    private _settings: string = "";

    constructor(id: string) {
        super(id);
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
}