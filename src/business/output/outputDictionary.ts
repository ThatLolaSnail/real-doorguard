import {Output} from "./output";
import {IdService} from "../tools/idService";
import {container} from "tsyringe";
import {DatabaseDoorGuard} from "../database/database";

export class OutputDictionary extends Map<string,Output> {
    private idService = container.resolve(IdService);
    private db = container.resolve(DatabaseDoorGuard);

    constructor() {
        super();

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
        super.get(key)?.destructor();

        return super.delete(key);
    }

    public deleteAll():void{
        for (let output of this.keys()){
            this.delete(output);
        }
    }

    public createNew(){
        const id = this.idService.getNewId();
        const output = new Output(id);
        this.set(id, output);
        return output;
    }
}
