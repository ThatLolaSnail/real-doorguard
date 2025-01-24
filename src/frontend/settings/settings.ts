import {Application, Request, Response} from "express";
import {controller} from "./controller";
import {input} from "./input";
import {output} from "./output";
import {container} from "tsyringe";
import {DatabaseDoorGuard} from "../../business/database/database";

export function settings(app: Application) {
    app.get("/settings", (req: Request, res: Response) => {
        res.render("settings/settings", {});
    });

    app.get("/settings/advanced", (req: Request, res: Response) => {
        res.render("settings/advanced-settings", {});
    });

    app.get("/settings/advanced/reset-database", (req: Request, res: Response) => {
        console.log("AAAAA");
        const newDb = container.resolve(DatabaseDoorGuard);
        newDb.dropAllTables();
        res.redirect("/settings/advanced");
    });

    controller(app);
    input(app);
    output(app);
}