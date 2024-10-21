import {singleton} from "tsyringe";

@singleton()
export class Hardware {
    public static OUTPUT_PINS = new Map<string, number>([
        ["OUT1", 4],
        ["OUT2", 17],
        //["UNMUTE", 6],
    ]);
    public static INPUT_PINS = new Map<string, number>([
        ["IN1", 2],
        ["IN2", 3],
    ]);
    private outputs = new Map<string, any>;

    private isPi: any = require('detect-rpi');
    constructor() {
        if (this.isPi()) {
/*
            let Gpio = require('onoff').Gpio;

            for (let [name, pin] of Hardware.OUTPUT_PINS) {
                let p = new Gpio(pin, 'out');
                p.writeSync(0);
                this.outputs.set(name, p);
            }*/
        }
    }

    public output(pin: string, repeat: number, duration: number) {
        /*
        let p = this.outputs.get(pin);
        if (!this.isPi() || p === undefined || repeat <= 0 || duration <= 0) {
            return;
        }
        console.log("HAAARDWARE OUUUUTTTT");
        const ringing = setInterval(_ => {
            p.writeSync(p.readSync() ^ 1);
        }, duration);
        setTimeout(_ => {
            clearInterval(ringing);
            p.writeSync(0);
            p.unexport();
        }, duration * (2 * repeat - 1));

         */
    }
}