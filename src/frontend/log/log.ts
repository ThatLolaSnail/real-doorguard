import {Application, Request, Response} from "express";
import {Api} from "../../api/api";
import {container} from "tsyringe";
import {DatabaseDoorGuard} from "../../business/database/database";

export function log(app: Application) {
    const api = container.resolve(Api);
    const bodyParser = require("body-parser");
    const urlencodedParser = bodyParser.urlencoded({extended: false});
    const db = container.resolve(DatabaseDoorGuard);

    app.get("/log", (req: Request, res: Response) => {
        let nr = NaN;
        if (typeof req.query.nr === 'string'){
            nr = parseInt(req.query.nr);
        }
        if (isNaN(nr)){
            res.redirect(`/log?nr=20`); //Default
            return;
        }
        const events = db.getEvents(nr);
        res.render("log", {nr: nr, events: events});
    });
}