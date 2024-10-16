import {Controller} from "./controller";
import {Container} from "typedi";
import {IdService} from "../tools/IdService";

export class ControllerDictionary extends Map<string,Controller> {
    private idService = Container.get(IdService);

    constructor() {
        super();

        // TODO: Read controllers from database
        for(let i = 0; i < 3; i++){
            const id = this.idService.getNewId();

            //super.set won't add things to the database
            this.idService.registerId(id);
            super.set(id, new Controller(id));
        }
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

    // public get(key: string): Controller | undefined {
    //     return super.get(key);
    // }

    public createNew(){
        const id = this.idService.getNewId();
        const controller = new Controller(id);
        this.set(id, controller);
        return controller;
    }
}
