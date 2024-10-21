import 'reflect-metadata';
import {Main} from "./business/main/main";
import {Ui} from "./frontend/ui";
import {container} from "tsyringe";

container.resolve(Main);
container.resolve(Ui);