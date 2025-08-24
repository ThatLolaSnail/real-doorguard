import {Application, Request, Response} from "express";
import {controller} from "./controller";
import {input} from "./input";
import {output} from "./output";
import {container} from "tsyringe";
import {Api} from "../../api/api";

export function settings(app: Application) {
    var api = container.resolve(Api);
    app.get("/settings", (req: Request, res: Response) => {
        res.render("settings/settings", {});
    });

    app.get("/settings/advanced", (req: Request, res: Response) => {
        res.render("settings/advanced-settings", {});
    });

    app.get("/settings/advanced/reset", (req: Request, res: Response) => {
        res.render("settings/reset", {});
    });

    app.get("/settings/advanced/database-reset", (req: Request, res: Response) => {
        api.revertToDefaultData();
        res.redirect("/");
    });

    controller(app);
    input(app);
    output(app);
}