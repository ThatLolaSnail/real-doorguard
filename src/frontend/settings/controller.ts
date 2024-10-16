import {Application, Request, Response} from "express";
import {Controller} from "../../business/controller/controller";
import {Api} from "../../api/api";
import {Container} from "typedi";

export function controller(app: Application) {
    var api = Container.get(Api);
    var bodyParser = require("body-parser");
    var urlencodedParser = bodyParser.urlencoded({extended: false})

    app.get("/settings/controller", (_req: Request, res: Response) => {
        res.render("settings/controller", {controllers:api.controllers});
    });

    app.get("/settings/controller/edit", (req: Request, res: Response) => {
        let controller: Controller | null = null;
        if (typeof req.query.id === 'string'){
            controller = api.controllers.get(req.query.id) || null;
        }
        if (controller) {
            res.render("settings/controller-edit", {controller: controller});
        } else {
            res.render("settings/controller-edit", {controller: new Controller("new")});
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
        controller.name = req.body.name;
        controller.inputs = req.body.inputs;
        controller.outputs = req.body.outputs;
        controller.setCondition(req.body.conditionFrom, req.body.conditionTo);
        controller.setTime(req.body.timeFrom, req.body.timeTo);
        controller.enabled = !!req.body.enabled;
        controller.description = req.body.description;

        res.redirect("/settings/controller");
    });
}