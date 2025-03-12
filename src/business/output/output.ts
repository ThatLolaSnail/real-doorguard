import {doorguardObject} from "../doorguardObject/doorguardObject";
import {container} from "tsyringe";
import {Hardware} from "../hardware/hardware";
import {Time} from "../tools/time";
import {constrainNumber} from "../tools/tools";

export enum OutputType {
    VIRTUAL = "virtual",
    AUDIO = "audio",
    HARDWARE = "hardware",
}
function isOutputType(value: string): value is OutputType {
    return Object.values(OutputType).includes(value as OutputType);
}

export class Output extends doorguardObject {
    protected doorguardObjectType = "output";

    private _type: OutputType;

    private _wave: string;
    private _volume: number;

    private _pin: string;
    private _repeat: number;
    private _duration: number;

    private player = require('play-sound')();
    private hardware = container.resolve(Hardware);

    private readonly eventHandlerCallback : (id:string) => void;

    constructor(id?: string, name?: string, timeFrom?: Time, timeTo?: Time, enabled?: boolean, description?: string, type?: OutputType, wave?: string, volume?: number, pin?: string, repeat?: number, duration?: number) {
        super(id, name, timeFrom, timeTo, enabled, description);
        this._type = type ?? OutputType.VIRTUAL;
        this._wave = wave ?? "";
        this._pin = pin ?? "";
        this._repeat = repeat ?? 1;
        this._duration = duration ?? 250;
        this._volume = volume ?? 100;

        this.eventHandlerCallback = (id: string) => this.handleRingEvent(id);
        this.eventHandler.addListener("ring", this.eventHandlerCallback);
    }

    destructor(): void {
        if (this.eventHandlerCallback){
            this.eventHandler.removeListener("ring", this.eventHandlerCallback);
        }
    }

    private handleRingEvent(id:string): void {
        if (this.id == id){
            this.fireIfEnabledAndInTimeframe();
        }
    }

    public fire() {
        super.fire();

         switch (this.type){
             case OutputType.VIRTUAL:
                 break;
             case OutputType.AUDIO:
                 this.player.play("audio/" + this.wave, {mplayer:['-volume',this.volume]});
                 break;
             case OutputType.HARDWARE:
                 this.hardware.output(this.pin, this.repeat, this.duration);
                 break;
         }
    }

    public set type(type: any) {
        if (isOutputType(type)) {
            this._type = type;
        } else {
            this._type = OutputType.VIRTUAL;
        }
    }
    public get type(): string {
        return this._type;
    }
    public set wave(wave: string) {
        this._wave = wave.replace(/[\\/]/g, "-");
    }
    public get wave(): string {
        return this._wave;
    }
    public set volume(vol: number) {
        this._volume = constrainNumber(vol, 0, 100);
    }
    public get volume(): number {
        return this._volume;
    }
    public set pin(settings: string) {
        this._pin = settings;
    }
    public get pin(): string {
        return this._pin;
    }
    public set repeat(repeat: number) {
        this._repeat = constrainNumber(repeat, 1, Hardware.MAX_REPEAT);
    }
    public get repeat(): number {
        return this._repeat;
    }
    public set duration(duration: number) {
        this._duration = constrainNumber(duration, 0, Hardware.MAX_DURATION);
    }
    public get duration(): number {
        return this._duration;
    }
}