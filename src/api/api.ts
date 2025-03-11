import {Main} from "../business/main/main";
import {InputType} from "../business/input/input";
import {OutputType} from "../business/output/output";
import {singleton} from "tsyringe";
import {Hardware} from "../business/hardware/hardware";


@singleton()
export class Api {
    private readonly fs = require('fs');
    public readonly _waves: string[];
    constructor(private main: Main) {
        this._waves = this.fs.readdirSync("audio") as string[];
    }

    public get controllers(){
        return this.main.controllers;
    }
    public get inputs(){
        return this.main.inputs;
    }
    public get inputType(){
        return InputType;
    }
    public get hardwareInputPins(){
        return Hardware.INPUT_PINS;
    }
    public get outputs(){
        return this.main.outputs;
    }
    public get outputType(){
        return OutputType;
    }
    public get hardwareOutputPins(){
        return Hardware.OUTPUT_PINS;
    }
    public get allWaves() {
         return this._waves;
    }
    public revertToDefaultData(){
        this.main.revertToDefaultData();

    }
}