import {container} from "tsyringe";
import {EventHandler} from "../eventHandler/eventHandler";
import {DatabaseDoorGuard} from "./database";
import {ControllerDictionary} from "../controller/controllerDictionary";
import {InputDictionary} from "../input/inputDictionary";
import {OutputDictionary} from "../output/outputDictionary";

export class Logging {
    private db = container.resolve(DatabaseDoorGuard);
    private eventHandler = container.resolve(EventHandler);
    constructor(controllers: ControllerDictionary, inputs: InputDictionary, outputs: OutputDictionary) {
        //Add listeners to store events to database
        this.eventHandler.addListener("hardwareInput", (pin: string) => {
            this.db.insertEvent({type: "hardwareInput." + pin, timestamp: new Date()})
        });
        this.eventHandler.addListener("controller", (id: string) => {
            const name = controllers.get(id)?.name;
            this.db.insertEvent({type: "controller." + id + " " + name, timestamp: new Date()})
        });
        this.eventHandler.addListener("input", (id: string) => {
            const name = inputs.get(id)?.name;
            this.db.insertEvent({type: "input." + id + " " + name, timestamp: new Date()})
        });
        this.eventHandler.addListener("output", (id: string) => {
            const name = outputs.get(id)?.name;
            this.db.insertEvent({type: "output." + id + " " + name, timestamp: new Date()})
        });
    }

}