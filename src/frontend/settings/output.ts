import {Application, Request, Response} from "express";
import {Api} from "../../api/api";
import {Output} from "../../business/output/output";
import {container} from "tsyringe";

export function output(app: Application) {
    var api = container.resolve(Api);
    var bodyParser = require("body-parser");
    var urlencodedParser = bodyParser.urlencoded({extended: false})

    app.get("/settings/output", (_req: Request, res: Response) => {
        res.render("settings/output", {outputs:api.outputs});
    });

    app.get("/settings/output/edit", (req: Request, res: Response) => {
        let output: Output | null = null;
        if (typeof req.query.id === 'string'){
            output = api.outputs.get(req.query.id) || null;
        }
        if (!output) {
            output = new Output("new");
        }
        res.render("settings/output-edit", {output: output, types: Object.values(api.outputType), pins: Array.from(api.hardwareOutputPins.keys())});
    });

    app.get("/settings/output/delete", (req: Request, res: Response) => {
        if (typeof req.query.id === 'string'){
            api.outputs.delete(req.query.id);
        }
        res.redirect("/settings/output");
    });

    app.get("/settings/output/test", (req: Request, res: Response) => {
        let output: Output | null = null;
        if (typeof req.query.id === 'string'){
            output = api.outputs.get(req.query.id) || null;
        }
        if (output){
            output.fire();
        }
        res.redirect("/settings/output");
    });

    app.post("/settings/output/edit", urlencodedParser, (req: Request, res: Response) => {
        let output: Output | null = null;
        if (typeof req.body.id === 'string'){
            output = api.outputs.get(req.body.id) || null;
        }
        if (!output){
            output = api.outputs.createNew();
        }
        output.name = req.body.name;
        output.type = req.body.type;
        output.settings = req.body.settings;
        output.pin = req.body.pin;
        output.repeat = req.body.repeat;
        output.duration = req.body.duration;
        output.channel = req.body.channel;
        output.message = req.body.message;
        output.description = req.body.description;

        res.redirect("/settings/output");
    });
}