import {Application, Request, Response} from "express";
import {Api} from "../../api/api";
import {Container} from "typedi";

export function settings(app: Application) {
    var api = Container.get(Api);
    var bodyParser = require("body-parser");
    var urlencodedParser = bodyParser.urlencoded({extended: false})

    app.get("/log", (req: Request, res: Response) => {
        res.render("log", {});
    });
}