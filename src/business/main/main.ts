import {ControllerDictionary} from "../controller/controllerDictionary";
import {InputDictionary} from "../input/inputDictionary";
import {OutputDictionary} from "../output/outputDictionary";
import {singleton} from "tsyringe";


@singleton()
export class Main {
    public controllers = new ControllerDictionary();
    public inputs = new InputDictionary();
    public outputs = new OutputDictionary();

    constructor() {
    }
}