import {doorguardObject} from "../doorguardObject/doorguardObject";

export enum OutputType {
    VIRTUAL = "virtual",
    AUDIO = "audio",
    HARDWARE = "hardware",
    DISCORD = "discord",
}
function isOutputType(value: string): value is OutputType {
    return Object.values(OutputType).includes(value as OutputType);
}

export class Output extends doorguardObject {
    protected doorguardObjectType = "output";
    private _type: OutputType = OutputType.VIRTUAL;
    private _settings: string = "";

    constructor(id: string) {
        super(id);
        this.eventHandler.addListener("ring", (id: string) => {
            if (this.id == id){
                this.fireIf(this.checkTime());
            }
        });
    }

    public set type(type: string) {
        if (isOutputType(type)) {
            this._type = type;
        } else {
            this._type = OutputType.VIRTUAL;
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