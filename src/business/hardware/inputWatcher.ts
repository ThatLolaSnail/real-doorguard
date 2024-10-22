import {container} from "tsyringe";
import {EventHandler} from "../eventHandler/eventHandler";

export class InputWatcher {
    static readonly DEBOUNCE_TIME: number = 44; //longest delay between individual pulses (because the optocoupler uses AC)
    static readonly MIN_RISES: number = 5; //button has to be pressed for min this amount of AC sinewaves, so we don't trigger on single pulses

    protected eventHandler = container.resolve(EventHandler);

    private rise: number = 0;
    private last_rise: Date = new Date();
    private onoff: any;
    private gpio: any;

    constructor(private readonly name: string, private readonly pin: number) {

        this.onoff = require('onoff');
        this.gpio = new this.onoff.Gpio(pin, 'in', 'rising');
        this.gpio.watch(() => {
            const now: Date = new Date();
            if (now.getTime() - this.last_rise.getTime() > InputWatcher.DEBOUNCE_TIME) {
                this.rise = 1;
            } else {
                this.rise += 1;
            }

            if (this.rise == InputWatcher.MIN_RISES) {
                this.eventHandler.emit("hardwareInput", name);
            }

            this.last_rise = now;

        });
    }

    public unexport(){
        this.gpio.unexport();
    }

}