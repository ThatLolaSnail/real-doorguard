import {Input, InputType} from "./input";
import {IdService} from "../tools/idService";
import {container} from "tsyringe";
import {DatabaseDoorGuard} from "../database/database";

export class InputDictionary extends Map<string,Input> {
    private idService = container.resolve(IdService);
    private db = container.resolve(DatabaseDoorGuard);

    constructor() {
        super();

        // TODO: Read inputs from database
        for (let input of this.db.getAllInputs()){
            super.set(input.id, input);
        }

    }

    public set(key: string, value: Input): this {
        super.set(key,value);
        // TODO: Add input to database

        return this;
    }
    public delete(key: string){
        // TODO: Remove input from database

        return super.delete(key);
    }

    public createNew(){
        const id = this.idService.getNewId();
        const input = new Input(id);
        this.set(id, input);
        return input;
    }
}
