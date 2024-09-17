import {Controller} from "../../business/controller/controller.component";

export class Controllers {
    private controllers = new Map<string,Controller>;
    constructor() {
    }
    public add(id: string){
        this.controllers.set(id,new Controller(id));
        // TODO: Add controller to database
    }
    public remove(id: string){
        this.controllers.delete(id);
        // TODO: Remove controller from database
    }
    public get(id: string): Controller | null {
        return this.controllers.get(id) ?? null;
    }
}
