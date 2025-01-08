import {DatabaseDoorGuard} from "./database";
import {container} from "tsyringe";

import 'reflect-metadata';
import {Time} from "../tools/time"; // Necessary if using dependency injection libraries like tsyringe

function logTestResult(description: string, result: any): void {
    console.log(`${description}:`, result);
}

export function dbTest(): void {
    /*
    const db = container.resolve(DatabaseDoorGuard);

    const setting1 = { key: 'alexandra', value: 'goth' };
    const setting2 = { key: 'lola', value: 'cheese' };
    db.insertSetting(setting1);
    db.insertSetting(setting2);
    logTestResult('setting1', setting1);
    logTestResult('setting2', setting2);

    const getSetting1 = db.getSetting('alexandra');
    const getSetting2 = db.getSetting('lola');
    logTestResult('get setting1', getSetting1);
    logTestResult('get setting2', getSetting2);

    db.deleteSetting('lola');

    const allSettings = db.getSettings();
    logTestResult('settings', allSettings);

    // Events
    const event1 = { type: 'login', timestamp: new Date() };
    const event2 = { type: 'logout', timestamp: new Date() };
    const eventId1 = db.insertEvent(event1);
    const eventId2 = db.insertEvent(event2);
    logTestResult('event1 ID', eventId1);
    logTestResult('event2 ID', eventId2);

    const getEvent = db.getEvent(eventId1);
    logTestResult('get event1', getEvent);

    db.deleteEvent(eventId1);

    const allEvents = db.getEvents();
    logTestResult('events', allEvents);




    // Controllers
    const controller1 = {
        name: 'Controller1',
        timeFrom: new Time(8, 15),
        timeTo: new Time(17, 45),
        enabled: true,
        description: 'Primary Controller',
        inputs: 'Input1',
        outputs: 'Output1',
        conditionsFrom: 1,
        conditionsTo: 2,
    };
    const controller2 = {
        name: 'Controller2',
        timeFrom: new Time(9,0),
        timeTo: new Time(18, 0),
        enabled: false,
        description: 'Secondary Controller',
        inputs: 'Input2',
        outputs: 'Output2',
        conditionsFrom: 2,
        conditionsTo: 3,
    };
    const controllerId1 = db.insertController(controller1);
    const controllerId2 = db.insertController(controller2);
    logTestResult('controller1 ID', controllerId1);
    logTestResult('controller2 ID', controllerId2);

    const getController = db.getController(controllerId1);
    logTestResult('get controller1', getController);

    db.deleteController(controllerId1);

    const allControllers = db.getControllers();
    logTestResult('controllers', allControllers);




    // Inputs
    const input1 = {
        name: 'Input1',
        timeFrom: new Time(6, 22),
        timeTo: new Time(14, 14),
        enabled: true,
        description: 'Main input',
        type: 'digital',
        settings: '{}',
        pin: 'P1',
        channel: 'CH1',
        message: 'Initial state',
    };
    const input2 = {
        name: 'Input2',
        timeFrom: new Time(6, 22),
        timeTo: new Time(14, 14),
        enabled: false,
        description: 'Secondary input',
        type: 'analog',
        settings: '{}',
        pin: 'P2',
        channel: 'CH2',
        message: 'Secondary state',
    };
    const inputId1 = db.insertInput(input1);
    const inputId2 = db.insertInput(input2);
    logTestResult('input1 ID', inputId1);
    logTestResult('input2 ID', inputId2);

    const getInput = db.getInput(inputId1);
    logTestResult('get input1', getInput);

    db.deleteInput(inputId1);

    const allInputs = db.getInputs();
    logTestResult('inputs', allInputs);

    // Outputs
    const output1 = {
        name: 'Output1',
        timeFrom: new Time(6, 22),
        timeTo: new Time(14, 14),
        enabled: true,
        description: 'Primary output',
        type: 'analog',
        settings: '{}',
        pin: 'O1',
        repeat: 1,
        duration: 60,
        channel: 'CH1',
        message: 'Output active',
    };
    const output2 = {
        name: 'Output2',
        timeFrom: new Time(6, 22),
        timeTo: new Time(14, 14),
        enabled: false,
        description: 'Backup output',
        type: 'digital',
        settings: '{}',
        pin: 'O2',
        repeat: 0,
        duration: 30,
        channel: 'CH2',
        message: 'Output inactive',
    };
    const outputId1 = db.insertOutput(output1);
    const outputId2 = db.insertOutput(output2);
    logTestResult('output1 ID', outputId1);
    logTestResult('output2 ID', outputId2);

    const getOutput = db.getOutput(outputId1);
    logTestResult('get output1', getOutput);

    db.deleteOutput(outputId1);

    const allOutputs = db.getOutputs();
    logTestResult('outputs', allOutputs);

    db.dropAllTables();
    db.close();

     */
}