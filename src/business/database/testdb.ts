import {DatabaseDoorGuard} from "./database";
import {container} from "tsyringe";

import 'reflect-metadata';
import {Time} from "../tools/time";
import {Controller} from "../controller/controller"; // Necessary if using dependency injection libraries like tsyringe
import { Input, InputType } from "../input/input";
import {Output, OutputType } from "../output/output";

function logTestResult(description: string, result: any): void {
    console.log(`${description}:`, result);
}

export function dbTest(): void {
    const db = container.resolve(DatabaseDoorGuard);

    // Dgevent
    const dgevent1 = { type: 'bellring', timestamp: new Date() };
    const dgevent2 = { type: 'door', timestamp: new Date() };
    const dgevent3 = { type: 'error', timestamp: new Date() };

    const dgeventIds = [dgevent1, dgevent2, dgevent3].map(event => db.insertEvent(event));
    logTestResult('Dgevent IDs', dgeventIds);

    const singleDgevent = db.getEvent(dgeventIds[0]);
    logTestResult('Single Dgevent', singleDgevent);

    const allDgevents = db.getEvents();
    logTestResult('All Dgevents', allDgevents);

    // Setting
    const setting1 = { key: 'doorkey', value: 'square' };
    const setting2 = { key: 'cat', value: 'dark' };
    const setting3 = { key: 'music', value: 'metal' };

    [setting1, setting2, setting3].forEach(setting => db.insertSetting(setting));
    logTestResult('All Settings', db.getSettings());

    const singleSetting = db.getSetting('cat');
    logTestResult('Single Setting', singleSetting);

    // Controller
    const controller1 = new Controller(
        'controller1',
        'Main Controller',
        new Time(8, 0),
        new Time(18, 0),
        true,
        'controller 1 description',
        ['Input1', 'Input2'],
        ['Output1'],
        1,
        5
    );
    const controller2 = new Controller(
        'controller2',
        'Backup Controller',
        new Time(20, 0),
        new Time(6, 0),
        false,
        'controller 1 description',
        ['Input3', 'Input4'],
        ['Output2'],
        2,
        10
    );

    const controllerIds = [controller1, controller2].map(controller => db.insertController(controller));
    logTestResult('Controller IDs', controllerIds);

    const singleController = db.getController(controllerIds[0]);
    logTestResult('Single Controller', singleController);

    const allControllers = db.getControllers();
    logTestResult('All Controllers', allControllers);

    // Input
    const input1 = new Input(
        'input1',
        'Virtual Input',
        new Time(9, 0),
        new Time(17, 0),
        true,
        'descriptiooooon',
        InputType.VIRTUAL,
        '4'
    );
    const input2 = new Input(
        'input2',
        'Hardware IOnput',
        new Time(0, 0),
        new Time(23, 59),
        true,
        'description',
        InputType.HARDWARE,
        '5'
    );

    [input1, input2].forEach(input => db.insertInput(input));
    logTestResult('All Inputs', db.getInputs());

    const singleInput = db.getInput(1); // Example ID
    logTestResult('Single Input', singleInput);

    // Output
    const output1 = new Output(
        'output1',
        'Virtual Output',
        new Time(9, 0),
        new Time(17, 0),
        true,
        'Virtual OutPut Description',
        OutputType.VIRTUAL,
        '',
        '6',
        1,
        250
    );
    const output2 = new Output(
        'output2',
        'Hardware Output',
        new Time(18, 0),
        new Time(22, 0),
        true,
        'Hardware Output Descriptin',
        OutputType.HARDWARE,
        '',
        '5',
        3,
        500
    );

    [output1, output2].forEach(output => db.insertOutput(output));
    logTestResult('All Outputs', db.getOutputs());

    const singleOutput = db.getOutput(1); // Example ID
    logTestResult('Single Output', singleOutput);

    db.dropAllTables();
    db.close();

}