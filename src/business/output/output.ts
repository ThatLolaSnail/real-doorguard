import {doorguardObject} from "../doorguardObject/doorguardObject";
import {container} from "tsyringe";
import {Hardware} from "../hardware/hardware";

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

    private _pin: string  = "";
    private _repeat: number = 1;
    private _duration: number = 250;

    private _channel: string = "";
    private _message: string = "";

    private player = require('play-sound')();
    private hardware = container.resolve(Hardware);

    constructor(id: string) {
        super(id);
        this.eventHandler.addListener("ring", (id: string) => {
            if (this.id == id){
                this.fireIf(this.checkTime());
            }
        });
    }

    public fire() {
        super.fire();

         switch (this.type){
             case OutputType.VIRTUAL:
                 break;
             case OutputType.AUDIO:
                 this.player.play("audio/" + this.settings);
                 break;
             case OutputType.HARDWARE:
                 this.hardware.output(this.pin, this.repeat, this.duration);
                 break;
             case OutputType.DISCORD:
                 // discord.output(this.channel, this.message)
                 break;
         }
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
    public set pin(settings: string) {
        // TODO: Change in Database
        this._pin = settings;
    }
    public get pin(): string {
        return this._pin;
    }
    public set repeat(settings: number | string) {
        if (typeof settings !== "number"){
            settings = parseInt(settings);
        }
        // TODO: Change in Database
        this._repeat = settings;
    }
    public get repeat(): number {
        return this._repeat;
    }
    public set duration(settings: number) {
        // TODO: Change in Database
        this._duration = settings;
    }
    public get duration(): number {
        return this._duration;
    }
    public set channel(settings: string) {
        // TODO: Change in Database
        this._channel = settings;
    }
    public get channel(): string {
        return this._channel;
    }
    public set message(settings: string) {
        // TODO: Change in Database
        this._message = settings;
    }
    public get message(): string {
        return this._message;
    }

}