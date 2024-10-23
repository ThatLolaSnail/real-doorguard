import {singleton} from "tsyringe";
import {InputWatcher} from "./inputWatcher";

@singleton()
export class Hardware {

    // use `cat /sys/kernel/debug/gpio` to find out the pin numbers of your specific hardware.
    public static OUTPUT_PINS = new Map<string, number>([
        ["OUT1", 516],   // GPIO4
        ["OUT2", 529],   // GPIO17
        ["UNMUTE", 518], // GPIO6
    ]);
    public static INPUT_PINS = new Map<string, number>([
        ["IN1", 514], // GPIO2
        ["IN2", 515], // GPIO3
    ]);

    private outputs = new Map<string, any>();
    private inputs = new Map<string, any>();

    private isPi: any = require('detect-rpi');
    private onoff: any = null;


    constructor() {
        if (this.isPi()) {
            this.onoff = require('onoff');
            for (let [name, pin] of Hardware.OUTPUT_PINS) {
                const p = new this.onoff.Gpio(pin, 'out');
                this.outputs.set(name, p);
                p.writeSync(0);
            }
            for (let [name, pin] of Hardware.INPUT_PINS) {
                const p = new InputWatcher(name, pin);
                this.inputs.set(name, p);
            }

            process.on('SIGINT', _ => {
                for (let [_, p] of this.outputs) {
                    p.unexport();
                }
                for (let [_, p] of this.inputs) {
                    p.unexport();
                }
            });
        }
    }


    public output(pin: string, repeat: number, duration: number) {
        let p = this.outputs.get(pin);
        if (!this.isPi() || p === undefined || repeat <= 0 || duration <= 0) {
            return;
        }

        p.writeSync(1);
        const ringing = setInterval(_ => {
            p.writeSync(p.readSync() ^ 1);
        }, duration);
        setTimeout(_ => {
            clearInterval(ringing);
            p.writeSync(0);
        }, (duration*2-1)*repeat);
    }
}