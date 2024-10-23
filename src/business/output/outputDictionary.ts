import {Output, OutputType} from "./output";
import {IdService} from "../tools/idService";
import {container} from "tsyringe";

export class OutputDictionary extends Map<string,Output> {
    private idService = container.resolve(IdService);

    constructor() {
        super();

        // TODO: Read outputs from database

        let id = this.idService.getNewId();
        let output = new Output(id);
        output.name = "My Great Doorbell"
        output.type = OutputType.AUDIO;
        output.settings = "bell.wav";
        super.set(id, output);

        id = this.idService.getNewId();
        output = new Output(id);
        output.name = "My Great Doorbell 2"
        output.type = OutputType.HARDWARE;
        output.pin = "OUT1";
        output.repeat = 2;
        output.duration = 250;
        super.set(id, output);

        id = this.idService.getNewId();
        output = new Output(id);
        output.name = "Door Buzzer"
        output.type = OutputType.HARDWARE;
        output.pin = "OUT2";
        output.repeat = 1;
        output.duration = 2000;
        super.set(id, output);

        id = this.idService.getNewId();
        output = new Output(id);
        output.name = "Secret Boobietrap";
        super.set(id, output);

        id = this.idService.getNewId();
        output = new Output(id);
        output.name = "Long Bell"
        output.type = OutputType.AUDIO;
        output.settings = "long.wav";
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
