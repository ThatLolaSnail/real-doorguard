import 'reflect-metadata';
import {Main} from "./business/main/main";
import {Ui} from "./frontend/ui";
import {Api} from "./api/api";
import {Container} from "typedi";

Container.get(Main)
Container.get(Api)
Container.get(Ui)
