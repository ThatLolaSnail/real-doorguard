import {Application, Request, Response} from "express";
import {Api} from "../../api/api";
import {Container} from "typedi";
import {controller} from "./controller";

export function settings(app: Application) {
    var api = Container.get(Api);
    var bodyParser = require("body-parser");
    var urlencodedParser = bodyParser.urlencoded({extended: false})

    app.get("/settings", (req: Request, res: Response) => {
        res.render("settings/settings", {});
    });

    app.get("/settings/advanced", (req: Request, res: Response) => {
        res.render("settings/advanced-settings", {});
    });

    controller(app);

    app.get("/settings/input", (req: Request, res: Response) => {
        res.status(501).render("work-in-progress", {});
    });

    app.get("/settings/input/edit", (req: Request, res: Response) => {
        res.status(501).render("work-in-progress", {});
    });

    app.get("/settings/output", (req: Request, res: Response) => {
        res.status(501).render("work-in-progress", {});
    });

    app.get("/settings/output/edit", (req: Request, res: Response) => {
        res.status(501).render("work-in-progress", {});
    });
}