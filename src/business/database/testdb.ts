import {DatabaseDoorGuard} from "./database";
import {container} from "tsyringe";

import 'reflect-metadata';
import {Time} from "../tools/time";
import {Controller} from "../controller/controller"; // Necessary if using dependency injection libraries like tsyringe
import { Input, InputType } from "../input/input";
import {Output, OutputType } from "../output/output";
import {Setting} from "./interfaces/setting";

function logTestResult(description: string, result: any): void {
    console.log(`${description}:`, result);
}

export function dbTest(): void {
    const db = container.resolve(DatabaseDoorGuard);

    // Dgevent
    const event1 = { type: 'bellring', timestamp: new Date() };
    const event2 = { type: 'door', timestamp: new Date() };
    const event3 = { type: 'error', timestamp: new Date() };
    const events = [event1, event2, event3];

    try {
        // Insert multiple Events
        const eventIds = events.map(event => db.insertEvent(event));
        (events.length == eventIds.length) ? logTestResult('Insert Events', 'OK') : logTestResult('Insert Events:', 'ERROR!')

        // Get single Event
        const singleEvent = db.getEvent(eventIds[0]);
        (event1.type == singleEvent?.type) ? logTestResult('Get Event', 'OK') : logTestResult('Get Event:', 'ERROR!')

        // Update single Event
        //singleEvent?.type = 'door';


        // Get all Events
        const allEvents = db.getEvents();
        (events.length == allEvents.length) ? logTestResult('Get all Events', 'OK') : logTestResult('Get all Events:', 'ERROR!')

    }  catch (error: unknown) {
        logTestResult('ERROR Events', error);
    }

    // Setting
    const setting1 = { key: 'doorkey', value: 'square' };
    const setting2 = { key: 'cat', value: 'dark' };
    const setting3 = { key: 'music', value: 'metal' };
    const settings = [setting1, setting2, setting3];

    try {
        // Insert multiple Settings
        settings.forEach(setting => db.insertSetting(setting));
        (settings.length == db.getSettings().length) ? logTestResult('Insert Settings', 'OK') : logTestResult('Insert Settings:', 'ERROR!')

        // Get single Setting
        const singleSetting = db.getSetting(setting2.key);
        (setting2.key == singleSetting?.key) ? logTestResult('Get Setting', 'OK') : logTestResult('Get Setting:', 'ERROR!')

        // Update single Setting
        setting2.value = 'white';
        db.updateSetting(setting2);
        (setting2.value == db.getSetting(setting2.key)?.value)  ? logTestResult('Update Setting', 'OK') : logTestResult('Update Setting:', 'ERROR!')
    } catch (error: unknown) {
        logTestResult('ERROR Settings', error);
    }


    // Controller
    const controller1 = new Controller(
        '1',
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
        '2',
        'Backup Controller',
        new Time(20, 0),
        new Time(6, 0),
        false,
        'controller 1337 description',
        ['Input3', 'Input4'],
        ['Output2'],
        2,
        10
    );


    try {
        const controllerIds = [controller1, controller2].map(controller => db.insertController(controller));
        logTestResult('Controller IDs', controllerIds);

        const singleController = db.getController(controllerIds[1]);
        logTestResult('Single Controller', singleController);

        controller2.description = "666 description";
        db.updateController(controller2);

        const singleController2 = db.getController(controllerIds[1]);
        logTestResult('Single Controller with Update:', singleController);

        const allControllers = db.getControllers();
        logTestResult('All Controllers', allControllers);
    } catch (error: unknown) {
        logTestResult('ERROR CONTROLLERS', error);
    }


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

    try {
        [input1, input2].forEach(input => db.insertInput(input));
        logTestResult('All Inputs', db.getInputs());

        const singleInput = db.getInput(1); // Example ID
        logTestResult('Single Input', singleInput);
    } catch (error: unknown) {
        logTestResult('ERROR Inputs', error);
    }


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

    try {
        [output1, output2].forEach(output => db.insertOutput(output));
        logTestResult('All Outputs', db.getOutputs());

        const singleOutput = db.getOutput(1); // Example ID
        logTestResult('Single Output', singleOutput);
    } catch (error: unknown) {
        logTestResult('ERROR Outputs', error);
    }

    // Clean Up
    db.dropAllTables();
    db.close();

}