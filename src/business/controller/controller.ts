export class Controller {
    public name: string;
    public inputs: string;
    public outputs: string;
    public conditionFrom: number;
    public conditionTo: number;
    public timeFrom: string;
    public timeTo: string;
    public enabled: boolean;
    public description: string;

    constructor(public id: string) {
        console.log("Controller Created: " + this.id);
        this.name = "Name " + this.id;
        this.inputs = "0";
        this.outputs = "0";
        this.conditionFrom = 1;
        this.conditionTo = 3;
        this.timeFrom = "06:00";
        this.timeTo = "21:59";
        this.enabled = true;
        this.description = "Test";
    }
}