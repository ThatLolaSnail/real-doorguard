import {Controller} from "../controller/controller.component";

export class Main {
    controllers = new Map<string,Controller>;

    constructor() {
        let settings = this.loadSettings();
        for (let e of settings){
            this.addController(e.id, e.inputs, e.outputs);
        }
    }

    addController(id: string, inputs: string[], outputs: string[]): void {
        this.controllers.set(id, new Controller(inputs, outputs));
    }

    removeController(id: string): void {
        this.controllers.delete(id);
    }

    getController(id: string): Controller | undefined {
        return this.controllers.get(id);
    }

    loadSettings(){
        return [
            {id: "1", inputs: ["1"], outputs: ["1"]},
            {id: "2", inputs: ["2","3"], outputs: ["2","3"]},
            {id: "3", inputs: ["3","4","5"], outputs: ["3","4","5"]},
        ];
    }
}