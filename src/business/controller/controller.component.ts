export class Controller {
    constructor(
        public inputs: string[],
        public outputs: string[]) {
        console.log("constructor controller " + this.inputs.toString());
    }
}