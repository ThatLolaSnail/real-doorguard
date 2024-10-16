export class Controller {
    private _id: string;
    private _name = "New Controller";
    private _inputs = "[]";
    private _outputs = "[]";
    private _conditionFrom = 1;
    private _conditionTo = 3;
    private _timeFrom = "06:00";
    private _timeTo = "21:59";
    private _enabled = true;
    private _description = "Please edit this controller's settings to your liking.";

    constructor(id: string) {
        this._id = id;
    }

    public fire(){
        console.log("Controller " + this.id + " was fired.");
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
    public set inputs(inputs: string) {
        this._inputs = inputs;
    }
    public get inputs() {
        return this._inputs;
    }
    public set outputs(outputs: string) {
        this._outputs = outputs;
    }
    public get outputs() {
        return this._outputs;
    }
    public setCondition(from: number, to: number) {
        this.conditionFrom = from;
        this.conditionTo = to;
    }
    public set conditionFrom(from: number) {
        this._conditionFrom = from;
    }
    public set conditionTo(to: number) {
        this._conditionTo = to;
    }
    public get conditionFrom() {
        return this._conditionFrom;
    }
    public get conditionTo() {
        return this._conditionTo;
    }
    public setTime(from: string, to: string) {
        this.timeFrom = from;
        this.timeTo = to;
    }
    public set timeFrom(from: string) {
        this._timeFrom = from;
    }
    public set timeTo(to: string) {
        this._timeTo = to;
    }
    public getTime(){
        return {from: this.timeFrom, to: this.timeTo};
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