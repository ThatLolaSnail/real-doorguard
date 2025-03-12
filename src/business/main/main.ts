import {ControllerDictionary} from "../controller/controllerDictionary";
import {InputDictionary} from "../input/inputDictionary";
import {OutputDictionary} from "../output/outputDictionary";
import {container, singleton} from "tsyringe";
import {Time} from "../tools/time";
import {Input, InputType} from "../input/input";
import {Controller} from "../controller/controller";
import {Output, OutputType} from "../output/output";
import {IdService} from "../tools/idService";
import {DatabaseDoorGuard} from "../database/database";


@singleton()
export class Main {
    public controllers = new ControllerDictionary();
    public inputs = new InputDictionary();
    public outputs = new OutputDictionary();
    private idService = container.resolve(IdService);
    private db = container.resolve(DatabaseDoorGuard);

    constructor() {
    }

    public revertToDefaultData(){
        const description = "default Description";
        const enabled = true;
        const from = new Time(0,0);
        const to = new Time(23,59);

        //delete old data
        this.inputs.deleteAll();
        this.controllers.deleteAll();
        this.outputs.deleteAll();

        this.inputs.set("1", new Input("1", "Button 1", from, to, enabled, description, InputType.HARDWARE, "IN1"));
        this.inputs.set("2", new Input("2", "Button 2", from, to, enabled, description, InputType.HARDWARE, "IN2"));
        this.inputs.set("3", new Input("3", "Button 3", from, to, enabled, description, InputType.VIRTUAL));

        const inputs = ["1","2","3"];
        this.controllers.set("4", new Controller("4", "name", from, to, enabled, description, inputs, ["6","7","10"], 1, 3));
        this.controllers.set("5", new Controller("5", "name", from, to, enabled, description, inputs, ["8","9","10"], 3, 0));

        const repeat = 1;
        const duration = 250;
        this.outputs.set("6", new Output("6", "quiet Sound", from, to, enabled, description, OutputType.AUDIO, "bell.wav", "", repeat, duration));
        this.outputs.set("7", new Output("7", "mechanical Bell", from, to, enabled, description, OutputType.HARDWARE, "", "OUT1", repeat, duration));
        this.outputs.set("8", new Output("8", "loud Sound", from, to, enabled, description, OutputType.AUDIO, "long.wav", "", repeat, duration));
        this.outputs.set("9", new Output("9", "actual Buzzer", from, to, enabled, description, OutputType.HARDWARE, "", "OUT2", repeat, 4*duration));
        this.outputs.set("10", new Output("10", "Unmute", from, to, enabled, "Turn on audio amplifier", OutputType.HARDWARE, "", "UNMUTE", 1, 4000));

        this.idService.registerId("9");

        this.db.insertEvent({ type: 'revertToDefaultData', timestamp: new Date() });
    }
}