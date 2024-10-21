import {Request, Response} from "express";
import {Service} from "typedi";
import {settings} from "./settings/settings";
import {log} from "node:util";

@Service()
export class Ui {
    private port: number = 8080;
    private express = require("express");
    private readonly app = this.express();

    constructor() {

        this.app.set('view engine', 'ejs');

        this.app.get("/", (req: Request, res: Response) => {
            res.render("index", {});
        });

        settings(this.app);
        log(this.app);

        this.app.use((req: Request, res: Response) => {
            res.status(404).render("404", {});
        });

        this.app.listen(this.port, () => {
            console.log(`Server started on http://localhost:${this.port}`);
        });
    }
}
