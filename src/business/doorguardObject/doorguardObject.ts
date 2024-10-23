import {Time} from "../tools/time";
import {EventHandler} from "../eventHandler/eventHandler";
import {container} from "tsyringe";

export class doorguardObject {
    protected doorguardObjectType: string = "object";
    protected eventHandler = container.resolve(EventHandler);

    private readonly _id: string;
    private _name = "New Object";
    private _timeFrom = new Time(0, 0);
    private _timeTo = new Time(23,59);
    private _enabled = true;
    private _description = "Please edit this Object's settings to your liking.";


    constructor(id: string) {
        this._id = id;
    }

    public fire(){
        this.eventHandler.emit(this.doorguardObjectType, this.id);
    }

    protected fireIfEnabledAndInTimeframe(): void{
        const enabled = this.enabled;
        const timeMatches = this.checkTime();
        this.eventHandler.emit("log", this.doorguardObjectType, this.id, enabled, timeMatches);
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
        // TODO: Change in Database
        this._name = name;
    }
    public get name() {
        return this._name;
    }
    public setTimeFromStrings(from: String, to: String) {
        let fromArray = from.split(":");
        let toArray = to.split(":");

        if (fromArray.length == 2 && toArray.length == 2) {
            let fromH =parseInt(fromArray[0]);
            let fromMin =parseInt(fromArray[1]);
            let toH =parseInt(toArray[0]);
            let toMin =parseInt(toArray[1]);
            this.setTime(new Time(fromH,fromMin), new Time(toH, toMin));
        }
    }
    public setTime(from: Time, to: Time) {
        this.timeFrom = from;
        this.timeTo = to;
    }
    public set timeFrom(from: Time) {
        // TODO: Change in Database
        this._timeFrom = from;
    }
    public set timeTo(to: Time) {
        // TODO: Change in Database
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
        // TODO: Change in Database
        this._enabled = enabled;
    }
    public get enabled(){
        return this._enabled;
    }
    public set description(description: string) {
        // TODO: Change in Database
        this._description = description;
    }
    public get description(){
        return this._description;
    }
}