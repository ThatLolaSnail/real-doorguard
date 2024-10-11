import {Controller} from "./controller";

export class ControllerDictionary extends Map<string,Controller> {
    constructor() {
        super();
        this.set("0", new Controller("0"));
        this.set("1", new Controller("1"));
        this.set("4", new Controller("4"));
    }
    public set(key: string, value: Controller): this {
        value ??= new Controller(key);
        super.set(key,value);
        // TODO: Add controller to database

        return this;
    }
    public delete(key: string){
        // TODO: Remove controller from database

        return super.delete(key);
    }
    public get(key: string): Controller | undefined {
        return super.get(key);
    }
    public getFromQuery(query: any | null | undefined): Controller | null {
        if (typeof query.id === 'string'){
            return this.get(query.id) || null;
        } else {
            return null;
        }
    }
}
