import {DatabaseDoorGuard} from "./database";
import {container} from "tsyringe";

import 'reflect-metadata';
import {Time} from "../tools/time";
import {Controller} from "../controller/controller"; // Necessary if using dependency injection libraries like tsyringe
import { Input, InputType } from "../input/input";
import {Output, OutputType } from "../output/output";
import {Setting} from "./interfaces/setting";
import {Dgevent} from "./interfaces/dgevent";

function logTestResult(description: string, result: any): void {
    console.log(`${description}:`, result);
}

export function dbTest(): void {
    const db = container.resolve(DatabaseDoorGuard);

    // Dgevent
    const event1 : Dgevent = { type: 'bellring', timestamp: new Date() };
    const event2 = { type: 'door', timestamp: new Date() };
    const event3 = { type: 'error', timestamp: new Date() };
    const events = [event1, event2, event3];

    try {
        console.log('### Event Tests ###');
        // Insert multiple Events
        const eventIds = events.map(event => db.insertEvent(event));
        (events.length <= eventIds.length) ? logTestResult('Insert Events', 'OK') : logTestResult('Insert Events', 'ERROR!')

        // Get single Event
        const singleEvent = db.getEvent(eventIds[0]);
        (event1.type == singleEvent?.type) ? logTestResult('Get Event', 'OK') : logTestResult('Get Event', 'ERROR!')

        // Update single Event
        event1.type = 'door';
        event1.id = eventIds[0];
        db.updateEvent(event1);
        const updateEvent = db.getEvent(eventIds[0]);
        (event1.type == updateEvent?.type) ? logTestResult('Update Event', 'OK') : logTestResult('Update Event', 'ERROR!')

        // Get all Events
        const allEvents = db.getEvents();
        (allEvents.length >= 3) ? logTestResult('Get all Events', 'OK') : logTestResult('Get all Events', 'ERROR!')

    }  catch (error: unknown) {
        logTestResult('ERROR Events', error);
    }

    // Setting
    const setting1 : Setting = { key: 'doorkey', value: 'square' };
    const setting2 = { key: 'cat', value: 'dark' };
    const setting3 = { key: 'music', value: 'metal' };
    const settings = [setting1, setting2, setting3];

    try {
        console.log('### Settings Tests ###');
        // Insert multiple Settings
        settings.forEach(setting => db.insertSetting(setting));
        (db.getSettings().length >= 3) ? logTestResult('Insert Settings', 'OK') : logTestResult('Insert Settings', 'ERROR!')

        // Get single Setting
        const singleSetting = db.getSetting(setting2.key);
        (setting2.key == singleSetting?.key) ? logTestResult('Get Setting', 'OK') : logTestResult('Get Setting', 'ERROR!')

        // Update single Setting
        setting2.value = 'white';
        db.updateSetting(setting2);
        (setting2.value == db.getSetting(setting2.key)?.value)  ? logTestResult('Update Setting', 'OK') : logTestResult('Update Setting', 'ERROR!')
    } catch (error: unknown) {
        logTestResult('ERROR Settings', error);
    }

    // Controller
    const controller1 = new Controller(
        '111',
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
        '666',
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
    const controllers = [controller1, controller2];

    try {
        console.log('### Controller Tests ###');
        // Insert multiple Controllers
        const controllerIds = controllers.map(controller => db.insertController(controller));
        (controllers.length <= controllerIds.length) ? logTestResult('Insert Controllers', 'OK') : logTestResult('Insert Controllers', 'ERROR!')

        // Get single Controller
        const singleController = db.getController(controllerIds[1]);
        (controllers[1].name == singleController?.name) ? logTestResult('Get Controller', 'OK') : logTestResult('Get Controller', 'ERROR!')

        // Update single Controller
        controller2.description = "666 description";
        db.updateController(controller2);
        const singleController2 = db.getController(controllerIds[1]);
        (controller2.description == singleController2?.description) ? logTestResult('Update Controller', 'OK') : logTestResult('Update Controller', 'ERROR!')

        // Get all Controllers
        const allControllers = db.getControllers();
        (allControllers.length >= 2) ? logTestResult('Get all Controller', 'OK') : logTestResult('Get all Controller', 'ERROR!')
    } catch (error: unknown) {
        logTestResult('ERROR CONTROLLERS', error);
    }

    // Input
    const input1 = new Input(
        '111',
        'Virtual Input',
        new Time(9, 0),
        new Time(17, 0),
        true,
        'descriptiooooon',
        InputType.VIRTUAL,
        '4'
    );
    const input2 = new Input(
        '666',
        'Hardware IOnput',
        new Time(0, 0),
        new Time(23, 59),
        true,
        'description',
        InputType.HARDWARE,
        '5'
    );
    const inputs = [input1, input2];

    try {
        console.log('### Input Tests ###');
        // Insert multiple Inputs
        const inputIds = inputs.map(input => db.insertInput(input));
        (inputs.length <= inputIds?.length) ? logTestResult('Insert Inputs', 'OK') : logTestResult('Insert Inputs', 'ERROR!')

        // Get single Input
        const singleInput = db.getInput(inputIds[0]);
        (inputs[0].name == singleInput?.name) ? logTestResult('Get Input', 'OK') : logTestResult('Get Input', 'ERROR!')

        // Update single Input
        input1.description = "666 description";
        db.updateInput(input1);
        const singleInput1 = db.getInput(inputIds[0]);
        (input1.description == singleInput1?.description) ? logTestResult('Update Input', 'OK') : logTestResult('Update Input', 'ERROR!')

        // Get all Inputs
        const allInputs = db.getInputs();
        (allInputs.length >= 2) ? logTestResult('Get all Inputs', 'OK') : logTestResult('Get all Inputs', 'ERROR!')

    } catch (error: unknown) {
        logTestResult('ERROR Inputs', error);
    }

    // Outputs
    const output1 = new Output(
        '111',
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
        '666',
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
    const outputs = [output1, output2];

    try {
        console.log('### Output Tests ###');
        // Insert multiple Outputs
        const outputIds = outputs.map(output => db.insertOutput(output));
        (outputs.length <= outputIds?.length) ? logTestResult('Insert Outputs', 'OK') : logTestResult('Insert Outputs', 'ERROR!')

        // Get single Output
        const singleOutput = db.getOutput(outputIds[0]);
        (outputs[0].description == singleOutput?.description) ? logTestResult('Get Output', 'OK') : logTestResult('Get Output', 'ERROR!')

        // Update single Output
        output1.description = "666 description";
        db.updateOutput(output1)
        const singleOutputUpdate = db.getOutput(outputIds[0]);
        (output1.description == singleOutputUpdate?.description) ? logTestResult('Update Output', 'OK') : logTestResult('Update Output', 'ERROR!')

        // Get all Outputs
        const allOutputs = db.getOutputs();
        (allOutputs.length >= 2) ? logTestResult('Get all Outputs', 'OK') : logTestResult('Get all Outputs', 'ERROR!')
    } catch (error: unknown) {
        logTestResult('ERROR Outputs', error);
    }

    // Clean Up
    db.dropAllTables();
    db.close();
}