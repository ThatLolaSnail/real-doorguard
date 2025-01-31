import {Request, Response} from "express";
import {settings} from "./settings/settings";
import {log} from "./log/log";
import {singleton} from "tsyringe";

@singleton()
export class Ui {
    private port: number = 8080;
    private express = require("express");
    private readonly app = this.express();

    constructor() {

        this.app.set('view engine', 'ejs');

        const os = require('os');
        const osType: string = os.type();
        const osRelease: string = os.release();
        const osPlatform: string = os.platform();
        const osIsRaspberry: boolean = os.release().includes("rpi");

        this.app.get("/", (req: Request, res: Response) => {
            res.render("index", {raspberry: osIsRaspberry});
        });

        this.app.get("/about", (req: Request, res: Response) => {

            res.render("about", {type: osType, release: osRelease, platform: osPlatform, raspberry: osIsRaspberry });
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
