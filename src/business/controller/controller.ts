import {clearTimeout} from "node:timers";
import {doorguardObject} from "../doorguardObject/doorguardObject";

export class Controller extends doorguardObject {
    protected doorguardObjectType = "controller";
    public DELAY = 1000;
    private _inputs : string[] = ["4","5"];
    private _outputs : string[] = ["7"];
    private _conditionFrom = 1;
    private _conditionTo = 3;

    private numberOfPresses = 0;
    private lastPressTimer: NodeJS.Timeout | undefined;

    constructor(id: string) {
        super(id);
        this.eventHandler.addListener("input", (id: string) => {
            if (this.inputs.includes(id)){
                this.handleInput();
            }
        });
    }

    private handleInput(): void {
        // since the button was pressed, we need to cancel the last timeout, we'll create a new one at the end
        clearTimeout(this.lastPressTimer);
        this.numberOfPresses++;

        // if we have no upper limit, we don't need to wait for the timeout
        if (this.conditionTo == 0 && this.conditionFrom == this.numberOfPresses) {
            this.fireIf(this.checkTime());
        }
        // if we have an upper limit, we have to make sure a timeout has passed before checking it.
        this.lastPressTimer = setTimeout(()=>{
            if (this.numberOfPresses < this.conditionTo && this.numberOfPresses >= this.conditionFrom){
                this.fireIf(this.checkTime());
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

    public set inputs(inputs: string[]) {
        // TODO: Change in Database
        this._inputs = inputs;
    }
    public get inputs() {
        return this._inputs;
    }
    public set outputs(outputs: string[]) {
        // TODO: Change in Database
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
        // TODO: Change in Database
        this._conditionFrom = from > 0 ? from : 0;
    }
    public set conditionTo(to: number) {
        // TODO: Change in Database
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