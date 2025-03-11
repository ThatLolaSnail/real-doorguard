import {Output, OutputType} from "./output";
import {IdService} from "../tools/idService";
import {container} from "tsyringe";
import {DatabaseDoorGuard} from "../database/database";

export class OutputDictionary extends Map<string,Output> {
    private idService = container.resolve(IdService);
    private db = container.resolve(DatabaseDoorGuard);

    constructor() {
        super();
        console.log("OutputDictionary constructor");

        // Read outputs from database
        let outputs = this.db.getOutputs();
        for (let output of outputs){
            super.set(output.id, output); //super.set won't add things to the database
            this.idService.registerId(output.id);
        }
    }

    public set(key: string, value: Output): this {
        super.set(key,value);
        this.db.insertOutput(value)

        return this;
    }
    public delete(key: string){
        this.db.deleteOutput(key);

        return super.delete(key);
    }

    public createNew(){
        const id = this.idService.getNewId();
        const output = new Output(id);
        this.set(id, output);
        return output;
    }
}
