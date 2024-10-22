import EventEmitter from "node:events";
import {singleton} from "tsyringe";

@singleton()
export class EventHandler extends EventEmitter {
    public emit(eventName: string | symbol, ...args: any): boolean {
        console.log("EventHandler emit: ", eventName, args);
        return super.emit(eventName, ...args);
    }
    public addListener(eventName: string, listener: (...args: any[]) => void): this {
        console.log("EventHandler added:",eventName);
        return super.addListener(eventName, listener);
    }
    public removeListener(eventName: string, listener: (...args: any[]) => void): this {
        console.log("EventHandler removed:", eventName);
        return super.removeListener(eventName, listener);
    }
}

/*
    Types of events:

    input         - an input was fired, the time was checked. This can be used by the controllers
    controller    - a controller was fired, n is correct, time was checked.
    output        - an output was fired, the time was checked.
    log           - useful info to be logged, for example a controller check status
    ring          - a controller is telling an output to fire, the output will do its own checks if neccesary.
    hardwareInput - a hardware input telling the input module that it was activated
 */