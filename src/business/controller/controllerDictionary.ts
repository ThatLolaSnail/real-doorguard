import {Controller} from "./controller";
import {IdService} from "../tools/idService";
import {container} from "tsyringe";
import { DatabaseDoorGuard } from "../database/database";

export class ControllerDictionary extends Map<string,Controller> {
    private idService = container.resolve(IdService);
    private db = container.resolve(DatabaseDoorGuard);

    constructor() {
        super();
        console.log("ControllerDictionary constructor");

        // Read controllers from database
        let controllers = this.db.getControllers();
        for (let controller of controllers){
            super.set(controller.id, controller); //super.set won't add things to the database
            this.idService.registerId(controller.id);
        }
    }

    public set(key: string, value: Controller): this {
        super.set(key,value);
        this.db.insertController(value)

        return this;
    }

    public delete(key: string){
        this.db.deleteController(key);
        super.get(key)?.destructor();

        return super.delete(key);
    }

    public deleteAll():void{
        for (let controler of this.keys()){
            this.delete(controler);
        }
    }

    public createNew(){
        const id = this.idService.getNewId();
        const controller = new Controller(id);
        this.set(id, controller);
        return controller;
    }
}
