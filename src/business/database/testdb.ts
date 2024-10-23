import {DatabaseDoorGuard} from "./database";
import {container} from "tsyringe";
import {Main} from "../main/main";


function logTestResult(description: string, result: any): void {
    console.log(`${description}:`, result);
}

export function dbtest(): void {
    const newDb = container.resolve(DatabaseDoorGuard);

    // Test for Settings
    // IMPORTANT!!!! KEYS ARE UNIQUE, SO IF YOU WANNA DO THIS TEST AGAIN THEN USE OTHER KEYS!!!!
    //const setting1 = { key: 'theme', value: 'dark' };
    //const setting2 = { key: 'language', value: 'en' };
    //newDb.insertSetting(setting1);
    //newDb.insertSetting(setting2);
    //logTestResult('Inserted setting1', setting1);
    //logTestResult('Inserted setting2', setting2);

    const retrievedSetting1 = newDb.getSetting('theme');
    const retrievedSetting2 = newDb.getSetting('language');
    logTestResult('Retrieved setting1', retrievedSetting1);
    logTestResult('Retrieved setting2', retrievedSetting2);

    const allSettings = newDb.getSettings();
    logTestResult('All settings', allSettings);

    // Test for Events
    const event1 = { type: 'user_login', timestamp: new Date() };
    const event2 = { type: 'file_upload', timestamp: new Date() };
    newDb.insertEvent(event1);
    newDb.insertEvent(event2);
    logTestResult('Inserted event1', event1);
    logTestResult('Inserted event2', event2);

    const retrievedEvent1 = newDb.getEvent(1);
    const retrievedEvent2 = newDb.getEvent(2);
    logTestResult('Retrieved event1', retrievedEvent1);
    logTestResult('Retrieved event2', retrievedEvent2);

    const allEvents = newDb.getEvents();
    logTestResult('All events', allEvents);

    // Test for Controllers
    const controller1 = {
        name: 'Controller 1',
        timeFrom: new Date(),
        timeTo: new Date(),
        enabled: true,
        description: 'Test controller 1',
        inputs: 'input1,input2',
        outputs: 'output1,output2',
        conditionsFrom: 5,
        conditionsTo: 10,
    };
    const controller2 = {
        name: 'Controller 2',
        timeFrom: new Date(),
        timeTo: new Date(),
        enabled: false,
        description: 'Test controller 2',
        inputs: 'input3,input4',
        outputs: 'output3,output4',
        conditionsFrom: 15,
        conditionsTo: 20,
    };
    newDb.insertController(controller1);
    newDb.insertController(controller2);
    logTestResult('Inserted controller1', controller1);
    logTestResult('Inserted controller2', controller2);

    const retrievedController1 = newDb.getController(1);
    const retrievedController2 = newDb.getController(2);
    logTestResult('Retrieved controller1', retrievedController1);
    logTestResult('Retrieved controller2', retrievedController2);

    const allControllers = newDb.getControllers();
    logTestResult('All controllers', allControllers);

    // Test for Outputs
    const output1 = {
        name: 'Output 1',
        timeFrom: new Date(),
        timeTo: new Date(),
        enabled: true,
        description: 'Test output 1',
        type: 'digital',
        settings: 'high frequency',
        pin: 'A1',
        repeat: 3,
        duration: 5000,
        channel: 'Channel 1',
        message: 'Output activated',
    };
    const output2 = {
        name: 'Output 2',
        timeFrom: new Date(),
        timeTo: new Date(),
        enabled: false,
        description: 'Test output 2',
        type: 'analog',
        settings: 'low frequency',
        pin: 'A2',
        repeat: 5,
        duration: 3000,
        channel: 'Channel 2',
        message: 'Output deactivated',
    };
    newDb.insertOutput(output1);
    newDb.insertOutput(output2);
    logTestResult('Inserted output1', output1);
    logTestResult('Inserted output2', output2);

    const retrievedOutput1 = newDb.getOutput(1);
    const retrievedOutput2 = newDb.getOutput(2);
    logTestResult('Retrieved output1', retrievedOutput1);
    logTestResult('Retrieved output2', retrievedOutput2);

    const allOutputs = newDb.getOutputs();
    logTestResult('All outputs', allOutputs);

    // Test for Inputs
    const input1 = {
        name: 'Input 1',
        timeFrom: new Date(),
        timeTo: new Date(),
        enabled: true,
        description: 'Test input 1',
        type: 'sensor',
        settings: 'sensitivity high',
        pin: 'B1',
        channel: 'Channel 1',
        message: 'Input detected',
    };
    const input2 = {
        name: 'Input 2',
        timeFrom: new Date(),
        timeTo: new Date(),
        enabled: false,
        description: 'Test input 2',
        type: 'switch',
        settings: 'sensitivity low',
        pin: 'B2',
        channel: 'Channel 2',
        message: 'Input not detected',
    };
    newDb.insertInput(input1);
    newDb.insertInput(input2);
    logTestResult('Inserted input1', input1);
    logTestResult('Inserted input2', input2);

    const retrievedInput1 = newDb.getInput(1);
    const retrievedInput2 = newDb.getInput(2);
    logTestResult('Retrieved input1', retrievedInput1);
    logTestResult('Retrieved input2', retrievedInput2);

    const allInputs = newDb.getInputs();
    logTestResult('All inputs', allInputs);

    // Close the database connection
    newDb.close();
}
