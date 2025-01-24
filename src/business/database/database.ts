import Database from 'better-sqlite3';
import {singleton} from "tsyringe";

import {Dgevent} from "./interfaces/dgevent";
import {Setting} from "./interfaces/setting";
import {Time} from "../tools/time";
import {Controller} from '../controller/controller';
import {Input} from '../input/input';
import {Output} from '../output/output';

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
    private db: Database.Database;

    // Constructor der die DB aufmacht und alle Tabellen erstellt falls noch nicht vorhanden
    constructor() {
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

    public insertController(controller: Controller): number {
        const insertData = this.db.prepare(
            `INSERT INTO controllers (
        name, timeFrom, timeTo, enabled, description, 
        inputs, outputs, conditionFrom, conditionTo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );
        const result = insertData.run(
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
        return result.lastInsertRowid as number;
    }

    public insertInput(input: Input): number {
        const insertData = this.db.prepare(
            `INSERT INTO inputs (
        name, timeFrom, timeTo, enabled, description, 
        type, pin
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`
        );
        const result = insertData.run(
            input.name,
            input.timeFrom.toString(),
            input.timeTo.toString(),
            input.enabled ? 1 : 0,
            input.description,
            input.type,
            input.pin
        );
        return result.lastInsertRowid as number;
    }

    public insertOutput(output: Output): number {
        const insertData = this.db.prepare(
            `INSERT INTO outputs (
        name, timeFrom, timeTo, enabled, description, 
        type, pin, repeat, duration
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );
        const result = insertData.run(
            output.name,
            output.timeFrom.toString(),
            output.timeTo.toString(),
            output.enabled ? 1 : 0,
            output.description,
            output.type,
            output.pin,
            output.repeat,
            output.duration
        );
        return result.lastInsertRowid as number;
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

        const row = getData.get(id) as Controller;
        /*{
            id: string,
            name: string,
            timeFrom: Time,
            timeTo: Time,
            enabled: boolean,
            description: string,
            inputs: string,
            outputs: string,
            conditionFrom: number,
            conditionTo: number
        };

         */

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

        const rows = getData.all() as Controller[];

        // @ts-ignore
        return rows.map((row: Controller) => ({
            id: row.id,
            name: row.name,
            timeFrom: row.timeFrom,
            timeTo: row.timeTo,
            enabled: !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            inputs: row.inputs.toString().split(","),
            outputs: row.outputs.toString().split(","),
            conditionFrom: row.conditionFrom,
            conditionTo: row.conditionTo
        }));

    }

    public getOutput(id: number): Output | null {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, pin, repeat, duration FROM outputs WHERE id = ?"
        );
        return getData.get(id) as Output;
        /*
        const row = getData.get(id) as Output;
        // @ts-ignore
        return row ? {
            id: row.id,
            name: row.name,
            timeFrom: row.timeFrom,
            timeTo: row.timeTo,
            enabled: !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            type: row.type,
            pin: row.pin,
            repeat: row.repeat,
            duration: row.duration
        } : null;
        */
    }

    public getOutputs(): Output[] {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, pin, repeat, duration FROM outputs"
        );
        return getData.all() as Output[];
        /*
        const rows = getData.all() as Output[];
        // @ts-ignore
        return rows.map((row: Output) => ({
            id: row.id,
            name: row.name,
            timeFrom: row.timeFrom,
            timeTo: row.timeTo,
            enabled: !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            type: row.type,
            pin: row.pin,
            repeat: row.repeat,
            duration: row.duration
        }));
        */
    }

    public getInput(id: number): Input | null {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, pin FROM inputs WHERE id = ?"
        );
        return getData.get(id) as Input;
        /*
        const row = getData.get(id) as Input;
        // @ts-ignore
        return row ? {
            id: row.id,
            name: row.name,
            timeFrom: row.timeFrom,
            timeTo: row.timeTo,
            enabled: !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            type: row.type,
            pin: row.pin
        } : null;

         */
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

    public deleteController(id: number): void {
        const deleteData = this.db.prepare(
            "DELETE FROM controllers WHERE id = ?"
        );
        deleteData.run(id);
    }

    public deleteInput(id: number): void {
        const deleteData = this.db.prepare(
            "DELETE FROM inputs WHERE id = ?"
        );
        deleteData.run(id);
    }

    public deleteOutput(id: number): void {
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
        this.createEventTable();
        this.createSettingTable();
        this.createControllerTable();
        this.createInputTable();
        this.createOutputTable();
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
                id INTEGER PRIMARY KEY AUTOINCREMENT,
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
                id INTEGER PRIMARY KEY AUTOINCREMENT,
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
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                timeFrom TEXT NOT NULL,
                timeTo TEXT NOT NULL,
                enabled BOOLEAN NOT NULL,
                description TEXT NOT NULL,
                type TEXT NOT NULL,
                pin TEXT NOT NULL,
                repeat INTEGER NOT NULL,
                duration INTEGER NOT NULL
            )`;
        this.db.exec(query);
    }
}