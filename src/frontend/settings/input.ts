import {Application, Request, Response} from "express";
import {Api} from "../../api/api";
import {Input} from "../../business/input/input";
import {container} from "tsyringe";
import {DatabaseDoorGuard} from "../../business/database/database";
import {Time} from "../../business/tools/time";

export function input(app: Application) {
    var api = container.resolve(Api);
    var bodyParser = require("body-parser");
    var urlencodedParser = bodyParser.urlencoded({extended: false})
    const db = container.resolve(DatabaseDoorGuard);

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
        input.name = String(req.body.name);
        input.type = String(req.body.type);
        input.pin = String(req.body.pin);
        input.description = String(req.body.description);
        input.timeFrom = Time.fromString(String(req.body.timeFrom));
        input.timeTo = Time.fromString(String(req.body.timeTo));
        input.enabled = req.body.enabled === "enabled";
        db.updateInput(input);

        res.redirect("/settings/input");
    });
}