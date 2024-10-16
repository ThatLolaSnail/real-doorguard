import {Service} from "typedi";
import {ControllerDictionary} from "../controller/controllerDictionary";


@Service()
export class Main {
    public controllers = new ControllerDictionary();
    // do the same for inputs
    // do the same for outputs

    constructor() {
    }
}