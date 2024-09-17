import {Controller} from "../controller/controller.component";

export class Main {
    public controllers = new Map<string,Controller>;

    constructor(
        controllerSettings?: string[],
        inputSettings?: string[],
        outputSettings?: string[]

    ) {
        for (let e of controllerSettings??[]){
            this.addController(e);
        }
        for (let e of inputSettings??[]){
            this.addController(e);
        }
        for (let e of controllerSettings??[]){
            this.addController(e);
        }
    }

    addController(id: string): void {
        this.controllers.set(id, new Controller(id));
    }

    removeController(id: string): void {
        this.controllers.delete(id);
    }

    getController(id: string): Controller | undefined {
        return this.controllers.get(id);
    }

    loadSettings(){
        // TODO: Load from Database
        return [
            {id: "1", inputs: ["1"], outputs: ["1"]},
            {id: "2", inputs: ["2","3"], outputs: ["2","3"]},
            {id: "3", inputs: ["3","4","5"], outputs: ["3","4","5"]},
        ];
    }
}