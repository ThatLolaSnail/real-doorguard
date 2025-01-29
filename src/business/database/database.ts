import Database from 'better-sqlite3';
import {singleton, container} from "tsyringe";

import {Dgevent} from "./interfaces/dgevent";
import {Setting} from "./interfaces/setting";
import {Time} from "../tools/time";
import {Controller} from '../controller/controller';
import {Input, InputType} from '../input/input';
import {Output, OutputType} from '../output/output';
import {IdService} from '../tools/idService'

/*
function stringFromDB(input: string): undefined | string[] {
    // Weil manche Values den Typ string oder string[] haben ... rastet alles andere aus.
    if (input.includes(",")) {
        return input.split(",");
    }
    return input;
}
 */


// Datenbanken Klasse zum create, update, get und delete von Daten
@singleton()
export class DatabaseDoorGuard {
    private idService = container.resolve(IdService);
    private db: Database.Database;

    // Constructor der die DB aufmacht und alle Tabellen erstellt falls noch nicht vorhanden
    constructor() {
        console.log("database");
        this.db = new Database('database.db');

        // Create all Tables if they don't exist
        this.createTablesIfNotExists();
    }

    // Insert Methoden, alle geben die ID zurück außer Settings, da Setting nach key value geht
    public insertEvent(event: Dgevent): number {
        const insertData = this.db.prepare(
            "INSERT INTO events (type, timestamp) VALUES (?, ?)"
        );
        const result = insertData.run(event.type, event.timestamp.toISOString());
        return result.lastInsertRowid as number;
    }

    public insertSetting(setting: Setting): void {
        const insertData = this.db.prepare(
            "INSERT INTO settings (key, value) VALUES (?, ?)"
        );
        insertData.run(setting.key, setting.value);
    }

    public insertController(controller: Controller): void {
        const insertData = this.db.prepare(
            `INSERT INTO controllers (
        id, name, timeFrom, timeTo, enabled, description, 
        inputs, outputs, conditionFrom, conditionTo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );
        const result = insertData.run(
            controller.id,
            controller.name,
            controller.timeFrom.toString(),
            controller.timeTo.toString(),
            controller.enabled ? 1 : 0,
            controller.description,
            controller.inputs.toString(),
            controller.outputs.toString(),
            controller.conditionFrom,
            controller.conditionTo
        );
    }

    public insertInput(input: Input): void {
        const insertData = this.db.prepare(
            `INSERT INTO inputs (
        id, name, timeFrom, timeTo, enabled, description, 
        type, pin
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        );
        const result = insertData.run(
            input.id,
            input.name,
            input.timeFrom.toString(),
            input.timeTo.toString(),
            input.enabled ? 1 : 0,
            input.description,
            input.type,
            input.pin
        );
    }

    public insertOutput(output: Output): void {
        const insertData = this.db.prepare(
            `INSERT INTO outputs (
        id, name, timeFrom, timeTo, enabled, description, 
        type, wave, pin, repeat, duration
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );
        const result = insertData.run(
            output.id,
            output.name,
            output.timeFrom.toString(),
            output.timeTo.toString(),
            output.enabled ? 1 : 0,
            output.description,
            output.type,
            output.wave,
            output.pin,
            output.repeat,
            output.duration
        );
    }

    // Get Methoden
    public getEvent(id: number): Dgevent | null {
        const getData = this.db.prepare(
            "SELECT id, type, timestamp FROM events WHERE id = ?"
        );
        const row = getData.get(id) as Dgevent;
        return row ? { id: row.id, type: row.type, timestamp: new Date(row.timestamp) } : null;
    }

    public getEvents(): Dgevent[] {
        const getData = this.db.prepare<Dgevent[]>(
            "SELECT id, type, timestamp FROM events"
        );
        const rows = getData.all() as Dgevent[];
        return rows.map((row: Dgevent) => ({
            id: row.id,
            type: row.type,
            timestamp: new Date(row.timestamp),
        }));
    }

    public getSetting(key: string): Setting | null {
        const getData = this.db.prepare(
            "SELECT key, value FROM settings WHERE key = ?"
        );
        const row = getData.get(key) as Setting; // Cast the result to SettingRow
        return row ? {  key: row.key, value: row.value } : null;
    }

    public getSettings(): Setting[] {
        const getData = this.db.prepare<Setting[]>(
            "SELECT key, value FROM settings"
        );
        const rows = getData.all() as Setting[];
        return rows.map((row: Setting) => ({
            key: row.key,
            value: row.value,
        }));
    }

    public getController(id: number): Controller | null {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, inputs, outputs, conditionFrom, conditionTo FROM controllers WHERE id = ?"
        );
// TODO: fix this!
        const row = getData.get(id) as Controller;

        return new Controller(
            row.id,
            row.name,
            row.timeFrom,
            row.timeTo,
            !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            row.description,
            row.inputs.toString().split(","),
            row.outputs.toString().split(","),
            //JSON.parse(row.inputs),
            //stringFromDB(row.outputs),
            row.conditionFrom,
            row.conditionTo
        );
    }

    public getControllers(): Controller[] {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, inputs, outputs, conditionFrom, conditionTo FROM controllers"
        );

        const rows = getData.all() as {id:string,name:string,timeFrom:string,timeTo:string,enabled:boolean, description:string,inputs:string,outputs:string, conditionFrom:number,conditionTo:number}[];

        return rows.map(row => new Controller(row.id, row.name, Time.fromString(row.timeFrom), Time.fromString(row.timeTo), row.enabled, row.description, row.inputs.split(","), row.outputs.split(","), row.conditionFrom, row.conditionTo));
    }

    public getOutput(id: number): Output | null {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, pin, repeat, duration FROM outputs WHERE id = ?"
        );
        // TODO: fix this!
        return getData.get(id) as Output;
    }

    public getOutputs(): Output[] {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, wave, pin, repeat, duration FROM outputs"
        );
        const rows = getData.all() as {id:string, name:string, timeFrom:string, timeTo:string, enabled:boolean, description:string, type:string, wave:string, pin:string, repeat:number, duration:number}[];
        return rows.map(row => new Output(row.id, row.name, Time.fromString(row.timeFrom), Time.fromString(row.timeTo), row.enabled, row.description, row.type as OutputType, row.wave, row.pin, row.repeat, row.duration));
        // TODO: fix this!
    }

    public getInput(id: number): Input | null {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, pin FROM inputs WHERE id = ?"
        );
        return getData.get(id) as Input;
        // TODO: fix this!
    }

    public getInputs(): Input[] {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, pin FROM inputs"
        );
        //return getData.all() as Input[];

        const rows = getData.all() as Input[];
        // @ts-ignore
        return rows.map((row: Input) => ({
            id: row.id,
            name: row.name,
            timeFrom: row.timeFrom,
            timeTo: row.timeTo,
            enabled: !!row.enabled, // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            type: row.type,
            pin: row.pin,
        }));

    }

    // Updating DataBase Methods

    public updateEvent(event: Dgevent): void {
        const updateData = this.db.prepare(
            "UPDATE events SET type = ?, timestamp = ? WHERE id = ?"
        );
        updateData.run(event.type, event.timestamp.toISOString(), event.id);
    }

    public updateSetting(setting: Setting): void {
        const updateData = this.db.prepare(
            "UPDATE settings SET value = ? WHERE key = ?"
        );
        updateData.run(setting.value, setting.key);
    }

    public updateController(controller: Controller): void {
        const updateData = this.db.prepare(
            `UPDATE controllers SET 
            name = ?, timeFrom = ?, timeTo = ?, enabled = ?, description = ?, 
            inputs = ?, outputs = ?, conditionFrom = ?, conditionTo = ? 
         WHERE id = ?`
        );
        updateData.run(
            controller.name,
            controller.timeFrom.toString(),
            controller.timeTo.toString(),
            controller.enabled ? 1 : 0,
            controller.description,
            controller.inputs.toString(),
            controller.outputs.toString(),
            controller.conditionFrom,
            controller.conditionTo,
            controller.id
        );
    }

    public updateInput(input: Input): void {
        const updateData = this.db.prepare(
            `UPDATE inputs SET 
            name = ?, timeFrom = ?, timeTo = ?, enabled = ?, description = ?, 
            type = ?, pin = ? 
         WHERE id = ?`
        );
        updateData.run(
            input.name,
            input.timeFrom.toString(),
            input.timeTo.toString(),
            input.enabled ? 1 : 0,
            input.description,
            input.type,
            input.pin,
            input.id
        );
    }

    public updateOutput(output: Output): void {
        const updateData = this.db.prepare(
            `UPDATE outputs SET 
            name = ?, timeFrom = ?, timeTo = ?, enabled = ?, description = ?, 
            type = ?, pin = ?, repeat = ?, duration = ? 
         WHERE id = ?`
        );
        updateData.run(
            output.name,
            output.timeFrom.toString(),
            output.timeTo.toString(),
            output.enabled ? 1 : 0,
            output.description,
            output.type,
            output.pin,
            output.repeat,
            output.duration,
            output.id
        );
    }



    // Delete Stuff

    public deleteEvent(id: number): void {
        const deleteData = this.db.prepare(
            "DELETE FROM events WHERE id = ?"
        );
        deleteData.run(id);
    }

    public deleteSetting(key: string): void {
        const deleteData = this.db.prepare(
            "DELETE FROM settings WHERE key = ?"
        );
        deleteData.run(key);
    }

    public deleteController(id: string): void {
        const deleteData = this.db.prepare(
            "DELETE FROM controllers WHERE id = ?"
        );
        deleteData.run(id);
    }

    public deleteInput(id: string): void {
        const deleteData = this.db.prepare(
            "DELETE FROM inputs WHERE id = ?"
        );
        deleteData.run(id);
    }

    public deleteOutput(id: string): void {
        const deleteData = this.db.prepare(
            "DELETE FROM outputs WHERE id = ?"
        );
        deleteData.run(id);
    }

    public dropAllTables(): void {
        this.db.exec("DROP TABLE IF EXISTS events");
        this.db.exec("DROP TABLE IF EXISTS settings");
        this.db.exec("DROP TABLE IF EXISTS controllers");
        this.db.exec("DROP TABLE IF EXISTS outputs");
        this.db.exec("DROP TABLE IF EXISTS inputs");
    }

    private allTablesExists(): boolean {
        // TODO: Fix this.
        return true;
    }

    public checkIfTablesExist(): Record<string, boolean> {
        const tableExists = (tableName: string): boolean => {
            const result = this.db
                .prepare(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name=?"
                )
                .get(tableName);
            return !!result;
        };
        return {
            Settings: tableExists("settings"),
            Events: tableExists("events"),
            Controllers: tableExists("controllers"),
            Outputs: tableExists("outputs"),
            Inputs: tableExists("inputs"),
        };
    }

    // Close the DB Connection

    public close(): void {
        this.db.close();
    }

    // useful but private Stuff

    newTimeFromString(timeString: string): Time {
        const [hoursStr, minutesStr] = timeString.split(':');
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        return new Time(hours, minutes);
    }

    createTablesIfNotExists(): void {

        if( !this.allTablesExists()
                || this.getControllers().length == 0
                || this.getInputs().length == 0
                || this.getOutputs().length == 0) {
            this.dropAllTables();
            this.createEventTable();
            this.createSettingTable();
            this.createControllerTable();
            this.createInputTable();
            this.createOutputTable();
            this.createDefaultData();
        }
    }

    createEventTable (): void {
        const query = `
                CREATE TABLE IF NOT EXISTS events (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    type TEXT NOT NULL,
                    timestamp DATE NOT NULL
                    )`;
        this.db.exec(query);
    }

    createSettingTable(): void {
        const query = `
                CREATE TABLE IF NOT EXISTS settings (
                    key TEXT NOT NULL PRIMARY KEY,
                    value TEXT NOT NULL
                    )`;
        this.db.exec(query);
    }

    createControllerTable(): void {
        const query = `
            CREATE TABLE IF NOT EXISTS controllers (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                timeFrom TEXT NOT NULL,
                timeTo TEXT NOT NULL,
                enabled BOOLEAN NOT NULL,
                description TEXT NOT NULL,
                inputs TEXT NOT NULL,
                outputs TEXT NOT NULL,
                conditionFrom INTEGER NOT NULL,
                conditionTo INTEGER NOT NULL
            )`;
        this.db.exec(query);
    }

    createInputTable(): void {
        const query = `
            CREATE TABLE IF NOT EXISTS inputs (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                timeFrom TEXT NOT NULL,
                timeTo TEXT NOT NULL,
                enabled BOOLEAN NOT NULL,
                description TEXT NOT NULL,
                type TEXT NOT NULL,
                pin TEXT NOT NULL
            )`;
        this.db.exec(query);
    }

    createOutputTable(): void {
        const query = `
            CREATE TABLE IF NOT EXISTS outputs (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                timeFrom TEXT NOT NULL,
                timeTo TEXT NOT NULL,
                enabled BOOLEAN NOT NULL,
                description TEXT NOT NULL,
                type TEXT NOT NULL,
                wave TEXT NOT NULL,
                pin TEXT NOT NULL,
                repeat INTEGER NOT NULL,
                duration INTEGER NOT NULL
            )`;
        this.db.exec(query);
    }

    createDefaultData(){
        const description = "default Description";
        const enabled = true;
        const from = new Time(0,0);
        const to = new Time(23,59);

        this.insertInput(new Input("1", "Button 1", from, to, enabled, description, InputType.HARDWARE, "IN1"));
        this.insertInput(new Input("2", "Button 2", from, to, enabled, description, InputType.HARDWARE, "IN2"));
        this.insertInput(new Input("3", "Button 3", from, to, enabled, description, InputType.VIRTUAL));

        const inputs = ["1","2","3"];
        this.insertController(new Controller("4", "name", from, to, enabled, description, inputs, ["6","7"], 1, 3));
        this.insertController(new Controller("5", "name", from, to, enabled, description, inputs, ["8","9"], 3, 0));

        const repeat = 1;
        const duration = 250;
        this.insertOutput(new Output("6", "quiet Sound", from, to, enabled, description, OutputType.AUDIO, "bell.wav", "", repeat, duration));
        this.insertOutput(new Output("7", "mechanical Bell", from, to, enabled, description, OutputType.HARDWARE, "", "OUT1", repeat, duration));
        this.insertOutput(new Output("8", "loud Sound", from, to, enabled, description, OutputType.AUDIO, "long.wav", "", repeat, duration));
        this.insertOutput(new Output("9", "actual Buzzer", from, to, enabled, description, OutputType.HARDWARE, "", "OUT2", repeat, 4*duration));

        this.idService.registerId("9");
    }

}