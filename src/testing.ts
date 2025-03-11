import {singleton} from "tsyringe";

@singleton()
export class Testing {
    private arg: string = "";

    constructor() {
        //console.log("TESTING object created");
    }

    public set(arg: string): void {
        this.arg = arg;
        //console.log("TESTING object set to " + arg);
    }

    public print(arg2: string): void {
        //console.log("TESTING " + arg2 + " - " + this.arg);
    }
}