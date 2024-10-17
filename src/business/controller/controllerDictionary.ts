import {Controller} from "./controller";
import {Container} from "typedi";
import {IdService} from "../tools/idService";

export class ControllerDictionary extends Map<string,Controller> {
    private idService = Container.get(IdService);

    constructor() {
        super();

        // TODO: Read controllers from database
        let id = this.idService.getNewId();
        let controller = new Controller(id);
        controller.name = "Controller One"
        controller.setTimeFromStrings("06:00","21:59");
        super.set(id, controller);

        id = this.idService.getNewId();
        controller = new Controller(id);
        controller.name = "Controller Two"
        controller.setCondition(3,5);
        controller.setTimeFromStrings("06:00","21:59");
        super.set(id, controller);

        id = this.idService.getNewId();
        controller = new Controller(id);
        controller.name = "Controller Three"
        controller.setCondition(5,0);
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
