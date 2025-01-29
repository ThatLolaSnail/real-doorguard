import {Input, InputType} from "./input";
import {IdService} from "../tools/idService";
import {container} from "tsyringe";
import {DatabaseDoorGuard} from "../database/database";

export class InputDictionary extends Map<string,Input> {
    private idService = container.resolve(IdService);
    private db = container.resolve(DatabaseDoorGuard);

    constructor() {
        super();

        // Read inputs from database
        let inputs = this.db.getInputs();
        for (let input of inputs) {
            super.set(input.id, input); //super.set won't add things to the database
            this.idService.registerId(input.id);
        }
    }

    public set(key: string, value: Input): this {
        super.set(key,value);
        this.db.insertInput(value)

        return this;
    }
    public delete(key: string){
        this.db.deleteInput(key);

        return super.delete(key);
    }

    public createNew(){
        const id = this.idService.getNewId();
        const input = new Input(id);
        this.set(id, input);
        return input;
    }
}
