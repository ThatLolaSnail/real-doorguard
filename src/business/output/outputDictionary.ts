import {Output, OutputType} from "./output";
import {Container} from "typedi";
import {IdService} from "../tools/idService";

export class OutputDictionary extends Map<string,Output> {
    private idService = Container.get(IdService);

    constructor() {
        super();

        // TODO: Read outputs from database
        let id = this.idService.getNewId();
        let output = new Output(id);
        output.name = "Output One"
        super.set(id, output);

        id = this.idService.getNewId();
        output = new Output(id);
        output.name = "Output Two"
        output.type = OutputType.AUDIO;
        output.settings = "test.wav";
        super.set(id, output);

        id = this.idService.getNewId();
        output = new Output(id);
        output.name = "Output Three"
        output.type = OutputType.HARDWARE;
        output.settings = "42";
        super.set(id, output);

        //super.set won't add things to the database
        //this.idService.registerId(id);

    }

    public set(key: string, value: Output): this {
        super.set(key,value);
        // TODO: Add output to database

        return this;
    }
    public delete(key: string){
        // TODO: Remove output from database

        return super.delete(key);
    }

    public createNew(){
        const id = this.idService.getNewId();
        const output = new Output(id);
        this.set(id, output);
        return output;
    }
}
