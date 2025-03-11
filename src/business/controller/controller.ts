import {clearTimeout} from "node:timers";
import {doorguardObject} from "../doorguardObject/doorguardObject";
import {Time} from "../tools/time";
import {container} from "tsyringe";
import {Testing} from "../../testing";

export class Controller extends doorguardObject {
    protected doorguardObjectType = "controller";
    public DELAY = 1000;
    private _inputs : string[];
    private _outputs : string[];
    private _conditionFrom: number;
    private _conditionTo: number;

    private numberOfPresses = 0;
    private lastPressTimer: NodeJS.Timeout | undefined;

    private testing = container.resolve(Testing);

    private readonly eventHandlerCallback : (id:string) => void;

    constructor(id?: string, name?: string, timeFrom?: Time, timeTo?: Time, enabled?: boolean, description?: string, inputs?: string[], outputs?: string[], conditionFrom?: number, conditionTo?: number) {
        super(id, name, timeFrom, timeTo, enabled, description);
        this._inputs = inputs ?? [];
        this._outputs = outputs ?? [];
        this._conditionFrom = conditionFrom ?? 1;
        this._conditionTo = conditionTo ?? 0;
        //console.log("created controller", this.id);

        this.eventHandlerCallback = (id: string) => this.handleInput(id);
        this.eventHandler.addListener("input", this.eventHandlerCallback);
    }

    destructor(): void {
        if (this.eventHandlerCallback){
            this.eventHandler.removeListener("input", this.eventHandlerCallback);
        }
    }

    private handleInput(id:string): void {
        if (!this.inputs.includes(id)){
            return;
        }
        // since the button was pressed, we need to cancel the last timeout, we'll create a new one at the end
        clearTimeout(this.lastPressTimer);
        this.numberOfPresses++;

        // if we have no upper limit, we don't need to wait for the timeout
        if (this.conditionTo == 0 && this.conditionFrom == this.numberOfPresses) {
            this.fireIfEnabledAndInTimeframe();
        }
        // if we have an upper limit, we have to make sure a timeout has passed before checking it.
        this.lastPressTimer = setTimeout(()=>{
            if (this.numberOfPresses < this.conditionTo && this.numberOfPresses >= this.conditionFrom){
                this.fireIfEnabledAndInTimeframe();
            }

            // after the timeout when the button has been evaluated, reset the counter.
            this.numberOfPresses = 0;
        }, this.DELAY);
    }

    public fire(){
        super.fire();
        for (let output of this.outputs){

            this.eventHandler.emit("ring", output);
        }
    }

    public set inputs(inputs: string[] | string) {
        if (typeof inputs === "string") {
            inputs = inputs.split(",");
        }
        this._inputs = inputs;
    }
    public get inputs() {
        return this._inputs;
    }
    public set outputs(outputs: string[] | string) {
        if (typeof outputs === "string") {
        outputs = outputs.split(",");
    }
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
        this._conditionFrom = from > 0 ? from : 0;
    }
    public set conditionTo(to: number) {
        this._conditionTo = to > 0 ? to : 0;
    }
    public get conditionFrom() {
        return this._conditionFrom;
    }
    public get conditionTo() {
        return this._conditionTo;
    }
    public getConditionAsString(){
        const from = this.conditionFrom.toString();
        const to = this.conditionTo == 0 ? "∞" : this.conditionTo.toString();
        return from + "≤n<" + to;
    }
}