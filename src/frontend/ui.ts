import {Request, Response} from "express";
import {Controller} from "../business/controller/controller";
import {Main} from "../business/main/main.component";

export class Ui {
    private port: number = 8080;
    private express = require("express");
    private readonly app = this.express();
    constructor(private main: Main) {

        this.app.set('view engine', 'ejs');

        this.app.get("/", (req: Request, res: Response) => {
            res.render("index", {});
        });

        this.app.get("/log", (req: Request, res: Response) => {
            res.render("log", {});
        });

        this.app.get("/settings", (req: Request, res: Response) => {
            res.render("settings/settings", {});
        });

        this.app.get("/settings/advanced", (req: Request, res: Response) => {
            res.render("settings/advanced-settings", {});
        });

        this.app.get("/settings/controller", (req: Request, res: Response) => {
            res.render("settings/controller", {controllers:this.main.controllers});
        });

        this.app.get("/settings/controller/edit", (req: Request, res: Response) => {
            const controller = main.controllers.getFromQuery(req.query);
            if (controller) {
                console.log(controller.name);
                res.render("settings/controller-edit", {controller: controller});
            } else {
                console.log("new");
                res.render("settings/controller-edit", {controller: new Controller("new")});
            }
        });

        this.app.get("/settings/input", (req: Request, res: Response) => {
            res.status(501).render("work-in-progress", {});
        });

        this.app.get("/settings/input/edit", (req: Request, res: Response) => {
            res.status(501).render("work-in-progress", {});
        });

        this.app.get("/settings/output", (req: Request, res: Response) => {
            res.status(501).render("work-in-progress", {});
        });

        this.app.get("/settings/output/edit", (req: Request, res: Response) => {
            res.status(501).render("work-in-progress", {});
        });

        this.app.use((req: Request, res: Response) => {
            res.status(404).render("404", {});
        });

        this.app.listen(this.port, () => {
            console.log(`Server started on http://localhost:${this.port}`);
        });
    }
}
