import {Service} from "typedi";
import {Main} from "../business/main/main";

@Service()
export class Api {
    constructor(private main: Main) {

    }

    public get controllers(){
        return this.main.controllers;
    }
}