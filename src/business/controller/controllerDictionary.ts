import {Controller} from "./controller";
import {IdService} from "../tools/idService";
import {container} from "tsyringe";

export class ControllerDictionary extends Map<string,Controller> {
    private idService = container.resolve(IdService);

    constructor() {
        super();

        // TODO: Read controllers from database
        let id = this.idService.getNewId();
        let controller = new Controller(id);
        controller.name = "only a few times";
        controller.setCondition(1,3);
        controller.inputs = ["4","5","6"];
        controller.outputs = ["7","8"];
        controller.setTimeFromStrings("06:00","23:59");
        super.set(id, controller);

        id = this.idService.getNewId();
        controller = new Controller(id);
        controller.name = "more than 3 times => unlock";
        controller.setCondition(3,0);
        controller.inputs = ["4","5","6"];
        controller.outputs = ["9","11"];
        controller.setTimeFromStrings("06:00","23:59");
        super.set(id, controller);

        id = this.idService.getNewId();
        controller = new Controller(id);
        controller.name = "a lot (must be my friend)";
        controller.setCondition(7,0);
        controller.inputs = ["4","5","6"];
        controller.outputs = ["10"];
        controller.setTimeFromStrings("00:00","23:59");
        super.set(id, controller);

        //super.set won't add things to the database
        //this.idService.registerId(id);

    }

    public set(key: string, value: Controller): this {
        super.set(key,value);
        // TODO: Add controller to database

        return this;
    }
    public delete(key: string){
        // TODO: Remove controller from database

        return super.delete(key);
    }

    public createNew(){
        const id = this.idService.getNewId();
        const controller = new Controller(id);
        this.set(id, controller);
        return controller;
    }
}
