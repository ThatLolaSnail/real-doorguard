import {Application, Request, Response} from "express";
import {Api} from "../../api/api";
import {Input} from "../../business/input/input";
import {container} from "tsyringe";

export function input(app: Application) {
    var api = container.resolve(Api);
    var bodyParser = require("body-parser");
    var urlencodedParser = bodyParser.urlencoded({extended: false})

    app.get("/settings/input", (_req: Request, res: Response) => {
        res.render("settings/input", {inputs:api.inputs});
    });

    app.get("/settings/input/edit", (req: Request, res: Response) => {
        let input: Input | null = null;
        if (typeof req.query.id === 'string'){
            input = api.inputs.get(req.query.id) || null;
        }
        if (!input) {
            input = new Input("new");
        }
        res.render("settings/input-edit", {input: input, types: Object.values(api.inputType), pins: Array.from(api.hardwareInputPins.keys())});
    });

    app.get("/settings/input/delete", (req: Request, res: Response) => {
        if (typeof req.query.id === 'string'){
            api.inputs.delete(req.query.id);
        }
        res.redirect("/settings/input");
    });

    app.get("/settings/input/test", (req: Request, res: Response) => {
        let input: Input | null = null;
        if (typeof req.query.id === 'string'){
            input = api.inputs.get(req.query.id) || null;
        }
        if (input){
            input.fire();
        }
        res.redirect("/settings/input");
    });

    app.post("/settings/input/edit", urlencodedParser, (req: Request, res: Response) => {
        let input: Input | null = null;
        if (typeof req.body.id === 'string'){
            input = api.inputs.get(req.body.id) || null;
        }
        if (!input){
            input = api.inputs.createNew();
        }
        input.name = req.body.name;
        input.type = req.body.type;
        input.pin = req.body.pin;
        input.channel = req.body.channel;
        input.message = req.body.message;
        input.description = req.body.description;
        input.timeFrom = req.body.timeFrom;
        input.timeTo = req.body.timeTo;
        input.enabled = req.body.enabled === "enabled";

        res.redirect("/settings/input");
    });
}