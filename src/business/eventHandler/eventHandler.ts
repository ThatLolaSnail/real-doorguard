import EventEmitter from "node:events";
import {singleton} from "tsyringe";

/*
    Types of events:
    Event name    - Argument      -     Sender -> Receiver    - logged - description
    --------------------------------------------------------------------------------
    hardwareInput -           pin -   hardware -> input      - X - raw hardware input
    input         -      input id -      input -> controller - X - doorguard input object fired (after time check)
    controller    - controller id - controller -> none       - X - doorguard controller object fired (after all checks)
    ring          -     output id - controller -> output     -   - The output event before final time check
    output        -     output id -     output -> none       - X - doorguard output object fired (after time check)

 */

@singleton()
export class EventHandler extends EventEmitter {
    public emit(eventName: string | symbol, ...args: any): boolean {
        return super.emit(eventName, ...args);
    }
    public addListener(eventName: string, listener: (...args: any[]) => void): this {
        return super.addListener(eventName, listener);
    }
    public removeListener(eventName: string, listener: (...args: any[]) => void): this {
        return super.removeListener(eventName, listener);
    }
}