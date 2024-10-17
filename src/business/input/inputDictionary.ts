import {Input, InputType} from "./input";
import {Container} from "typedi";
import {IdService} from "../tools/idService";

export class InputDictionary extends Map<string,Input> {
    private idService = Container.get(IdService);

    constructor() {
        super();

        // TODO: Read inputs from database
        let id = this.idService.getNewId();
        let input = new Input(id);
        input.name = "Input One"
        super.set(id, input);

        id = this.idService.getNewId();
        input = new Input(id);
        input.name = "Input Two"
        super.set(id, input);

        id = this.idService.getNewId();
        input = new Input(id);
        input.name = "Input Three"
        input.type = InputType.HARDWARE;
        input.settings = "42";
        super.set(id, input);

        //super.set won't add things to the database
        //this.idService.registerId(id);

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
