import {Application, Request, Response} from "express";
import {Controller} from "../../business/controller/controller";
import {Api} from "../../api/api";
import {container} from "tsyringe";
import {DatabaseDoorGuard} from "../../business/database/database";
import {Time} from "../../business/tools/time";

export function controller(app: Application) {
    var api = container.resolve(Api);
    var bodyParser = require("body-parser");
    var urlencodedParser = bodyParser.urlencoded({extended: false})
    const db = container.resolve(DatabaseDoorGuard);

    app.get("/settings/controller", (_req: Request, res: Response) => {
        res.render("settings/controller", {controllers:api.controllers});
    });

    app.get("/settings/controller/edit", (req: Request, res: Response) => {
        let controller: Controller | null = null;
        if (typeof req.query.id === 'string'){
            controller = api.controllers.get(req.query.id) || null;
        }
        if (controller) {
            res.render("settings/controller-edit", {controller: controller, inputs: api.inputs, outputs: api.outputs});
        } else {
            res.render("settings/controller-edit", {controller: new Controller("new"), inputs: api.inputs, outputs: api.outputs});
        }
    });

    app.get("/settings/controller/delete", (req: Request, res: Response) => {
        if (typeof req.query.id === 'string'){
            api.controllers.delete(req.query.id);
        }
        res.redirect("/settings/controller");
    });

    app.get("/settings/controller/test", (req: Request, res: Response) => {
        let controller: Controller | null = null;
        if (typeof req.query.id === 'string'){
            controller = api.controllers.get(req.query.id) || null;
        }
        if (controller){
            controller.fire();
        }
        res.redirect("/settings/controller");
    });

    app.post("/settings/controller/edit", urlencodedParser, (req: Request, res: Response) => {
        let controller: Controller | null = null;
        if (typeof req.body.id === 'string'){
            controller = api.controllers.get(req.body.id) || null;
        }
        if (!controller){
            controller = api.controllers.createNew();
        }
        const from = parseInt(req.body.conditionFrom);
        const to = parseInt(req.body.conditionTo);
        controller.name = String(req.body.name);
        controller.inputs = String(req.body.inputs);
        controller.outputs = String(req.body.outputs);
        controller.conditionFrom = Number.isNaN(from) ? 1 : from;
        controller.conditionTo = Number.isNaN(to) ? 0 : to;
        controller.timeFrom = Time.fromString(String(req.body.timeFrom));
        controller.timeTo = Time.fromString(String(req.body.timeTo));
        controller.enabled = req.body.enabled === "enabled";
        controller.description = String(req.body.description);
        db.updateController(controller);

        res.redirect("/settings/controller");
    });
}