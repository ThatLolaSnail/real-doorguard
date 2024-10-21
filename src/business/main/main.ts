import {Service} from "typedi";
import {ControllerDictionary} from "../controller/controllerDictionary";
import {InputDictionary} from "../input/inputDictionary";
import {OutputDictionary} from "../output/outputDictionary";


@Service()
export class Main {
    public controllers = new ControllerDictionary();
    public inputs = new InputDictionary();
    public outputs = new OutputDictionary();

    constructor() {
    }
}