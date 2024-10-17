import {Application, Request, Response} from "express";
import {Api} from "../../api/api";
import {Container} from "typedi";
import {Input} from "../../business/input/input";

export function input(app: Application) {
    var api = Container.get(Api);
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
        if (input) {
            res.render("settings/input-edit", {input: input, types: api.inputType});
        } else {
            res.render("settings/input-edit", {input: new Input("new"), types: api.inputType});
        }
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
        input.settings = req.body.settings;
        input.description = req.body.description;

        res.redirect("/settings/input");
    });
}