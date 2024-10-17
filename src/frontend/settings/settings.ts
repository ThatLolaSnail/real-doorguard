import {Application, Request, Response} from "express";
import {controller} from "./controller";
import {input} from "./input";
import {output} from "./output";

export function settings(app: Application) {
    app.get("/settings", (req: Request, res: Response) => {
        res.render("settings/settings", {});
    });

    app.get("/settings/advanced", (req: Request, res: Response) => {
        res.render("settings/advanced-settings", {});
    });

    controller(app);
    input(app);
    output(app);

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