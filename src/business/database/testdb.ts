import {DatabaseDoorGuard} from "./database";


function logTestResult(description: string, result: any): void {
    console.log(`${description}:`, result);
}

export function dbtest(): void {
    const db = new DatabaseDoorGuard();

    const setting1 = { key: 'theme', value: 'dark' };
    const setting2 = { key: 'language', value: 'en' };
    db.insertSetting(setting1);
    db.insertSetting(setting2);
    logTestResult('Inserted setting1', setting1);
    logTestResult('Inserted setting2', setting2);

    //const retrievedSetting = db.getSetting(1);
    //logTestResult('Retrieved setting with ID 1', retrievedSetting);

    //const allSettings = db.getSettings();
    //logTestResult('All settings', allSettings);
}

