import {Time} from "../tools/time";
import {EventHandler} from "../eventHandler/eventHandler";
import {container} from "tsyringe";
import {IdService} from "../tools/idService";

export class doorguardObject {
    protected doorguardObjectType: string = "object";
    protected eventHandler = container.resolve(EventHandler);
    protected idService = container.resolve(IdService);

    private readonly _id: string;
    private _name: string;
    private _timeFrom: Time;
    private _timeTo: Time;
    private _enabled: boolean;
    private _description: string;


    constructor(id?: string, name?: string, timeFrom?: Time, timeTo?: Time, enabled?: boolean, description?: string) {
        this._id = id ?? this.idService.getNewId();
        this._name = name ?? "New Object";
        this._timeFrom = timeFrom ?? new Time(0, 0);
        this._timeTo = timeTo ?? new Time(23,59);
        this._enabled = enabled ?? true;
        this._description = description ?? "Please edit this Object's settings to your liking.";
    }

    public destructor(): void {
        // removes all listeners so that this object doesn't do anything anymore
        // and the Garbage Collector can delete this object.
    }

    public fire(){
        this.eventHandler.emit(this.doorguardObjectType, this.id);
    }

    protected fireIfEnabledAndInTimeframe(): void{
        const enabled = this.enabled;
        const timeMatches = this.checkTime();
        if(enabled && timeMatches) {
            this.fire();
        }
    }

    protected checkTime(){
        const now = new Date();
        const time = new Time( now.getHours(), now.getMinutes());
        return time.isInInterval(this.timeFrom, this.timeTo);
    }

    public get id(): string {
        return this._id;
    }
    public set name(name: string) {
        this._name = name;
    }
    public get name() {
        return this._name;
    }
    public set timeFrom(from: Time) {
        this._timeFrom = from;
    }
    public set timeTo(to: Time) {
        this._timeTo = to;
    }
    public getTimeAsString(){
        return this.timeFrom.toString() + " - " + this.timeTo.toString();
    }
    public get timeFrom(){
        return this._timeFrom;
    }
    public get timeTo(){
        return this._timeTo;
    }
    public set enabled(enabled: boolean) {
        this._enabled = enabled;
    }
    public get enabled(){
        return this._enabled;
    }
    public set description(description: string) {
        this._description = description;
    }
    public get description(){
        return this._description;
    }
}