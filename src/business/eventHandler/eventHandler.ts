import EventEmitter from "node:events";
import {container, singleton} from "tsyringe";
import {DatabaseDoorGuard} from "../database/database";

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
        //console.log("EventHandler emit: ", eventName, args);
        return super.emit(eventName, ...args);
    }
    public addListener(eventName: string, listener: (...args: any[]) => void): this {
        console.log("EventHandler listen:",eventName);
        return super.addListener(eventName, listener);
    }
    public removeListener(eventName: string, listener: (...args: any[]) => void): this {
        console.log("EventHandler removed:", eventName);
        return super.removeListener(eventName, listener);
    }
}