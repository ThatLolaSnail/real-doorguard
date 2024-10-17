import {Service} from "typedi";
import {Main} from "../business/main/main";
import {InputType} from "../business/input/input";
import {OutputType} from "../business/output/output";

@Service()
export class Api {
    constructor(private main: Main) {

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
    public get outputs(){
        return this.main.outputs;
    }
    public get outputType(){
        return OutputType;
    }
}