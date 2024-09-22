import {Request, Response} from "express";

export class Ui {
    private port: number = 8080;
    private express = require("express");
    private readonly app = this.express();
    constructor() {

        this.app.set('view engine', 'ejs');

        this.app.get("/", (req: Request, res: Response) => {
            res.render("index", {});
        });

        this.app.get("/log", (req: Request, res: Response) => {
            res.render("log", {});
        });

        this.app.get("/settings", (req: Request, res: Response) => {
            res.render("settings", {});
        });

        this.app.get("/settings/advanced", (req: Request, res: Response) => {
            res.render("advanced-settings", {});
        });

        this.app.get("/settings/controller", (req: Request, res: Response) => {
            res.render("advanced-settings", {});
        });

        this.app.get("/settings/controller/edit", (req: Request, res: Response) => {
            res.render("advanced-settings", {});
        });

        this.app.get("/settings/input", (req: Request, res: Response) => {
            res.render("advanced-settings", {});
        });

        this.app.get("/settings/input/edit", (req: Request, res: Response) => {
            res.render("advanced-settings", {});
        });

        this.app.get("/settings/output", (req: Request, res: Response) => {
            res.render("advanced-settings", {});
        });

        this.app.get("/settings/output/edit", (req: Request, res: Response) => {
            res.render("advanced-settings", {});
        });

        this.app.use((req: Request, res: Response) => {
            res.status(404).render("404", {});
        });

        this.app.listen(this.port, () => {
            console.log(`Server started on https://localhost:${this.port}`);
        });
    }
}
