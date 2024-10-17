import 'reflect-metadata';
import {Main} from "./business/main/main";
import {Ui} from "./frontend/ui";
import {Container} from "typedi";

Container.get(Main)
Container.get(Ui)
