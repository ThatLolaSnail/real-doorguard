import Database from 'better-sqlite3';
import {singleton} from "tsyringe";

import {DgeventIface} from "./interfaces/dgeventIface";
import {ControllerIface} from "./interfaces/controllerIface";
import {InputIface} from "./interfaces/inputIface";
import {OutputIface} from "./interfaces/outputIface";
import {SettingIface} from "./interfaces/settingIface";
import {Input} from "../input/input";
import {Output} from "../output/output";
import {Controller} from "../controller/controller";

// Die Klasse mit der man alles machen kann
@singleton()
export class DatabaseDoorGuard {
    private db: Database.Database;

    // Constructor der die DB aufmacht und alle Tabellen erstellt falls noch nicht vorhanden
    constructor() {
        this.db = new Database('database.db');

        //to test the createTablesIfNotExist function, this deletes everything!
        this.dropAllTables();

        // Create all Tables if they don't exist
        this.createTablesIfNotExists();
    }

    // Insert Methoden, alle geben die ID zurück außer Settings
    public insertEvent(event: DgeventIface): number {
        const insertData = this.db.prepare(
            "INSERT INTO events (type, timestamp) VALUES (?, ?)"
        );
        const result = insertData.run(event.type, event.timestamp.toISOString());
        return result.lastInsertRowid as number;
    }

    public insertSetting(setting: SettingIface): void {
        const insertData = this.db.prepare(
            "INSERT INTO settings (key, value) VALUES (?, ?)"
        );
        insertData.run(setting.key, setting.value);
    }

    public insertController(controller: Controller): void {
        const insertData = this.db.prepare(
            `INSERT INTO controllers (
        id, name, timeFrom, timeTo, enabled, description, 
        inputs, outputs, conditionsFrom, conditionsTo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );
        const result = insertData.run(
            controller.id,
            controller.name,
            controller.timeFrom.toString(),
            controller.timeTo.toString(),
            controller.enabled ? 1 : 0,
            controller.description,
            controller.inputs,
            controller.outputs,
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
        type, settings, pin, repeat, duration
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
            output.settings,
            output.pin,
            output.repeat,
            output.duration
        );
    }

    // Get Methoden
    public getEvent(id: number): DgeventIface | null {
        const getData = this.db.prepare(
            "SELECT id, type, timestamp FROM events WHERE id = ?"
        );
        const row = getData.get(id) as DgeventIface;
        return row ? { id: row.id, type: row.type, timestamp: new Date(row.timestamp) } : null;
    }

    public getEvents(): DgeventIface[] {
        const getData = this.db.prepare<DgeventIface[]>(
            "SELECT id, type, timestamp FROM events"
        );
        const rows = getData.all() as DgeventIface[];
        return rows.map((row: DgeventIface) => ({
            id: row.id,
            type: row.type,
            timestamp: new Date(row.timestamp),
        }));
    }

    public getSetting(key: string): SettingIface | null {
        const getData = this.db.prepare(
            "SELECT key, value FROM settings WHERE key = ?"
        );
        const row = getData.get(key) as SettingIface; // Cast the result to SettingRow
        return row ? {  key: row.key, value: row.value } : null;
    }

    public getSettings(): SettingIface[] {
        const getData = this.db.prepare<SettingIface[]>(
            "SELECT key, value FROM settings"
        );
        const rows = getData.all() as SettingIface[];
        return rows.map((row: SettingIface) => ({
            key: row.key,
            value: row.value,
        }));
    }

    /*
    public getController(id: string): Controller | null {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, inputs, outputs, conditionsFrom, conditionsTo FROM controllers WHERE id = ?"
        );
        const row = getData.get(id) as ControllerIface;
        let controller = new Controller(id, row.name, row.timeFrom, row.timeTo, !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
 row.description, row.inputs, row.outputs, row.conditionFrom, row.conditionTo

        return row ? {
            id: row.id,
            name: row.name,
            timeFrom: row.timeFrom,
            timeTo: row.timeTo,
            enabled: !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            inputs: row.inputs,
            outputs: row.outputs,
            conditionFrom: row.conditionFrom,
            conditionTo: row.conditionTo
        } : null;
    }*/

    public getAllControllers(): ControllerIface[] {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, inputs, outputs, conditionsFrom, conditionsTo FROM controllers"
        );
        const rows = getData.all() as ControllerIface[];
        return rows.map((row: ControllerIface) => ({
            id: row.id,
            name: row.name,
            timeFrom: row.timeFrom,
            timeTo: row.timeTo,
            enabled: !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            inputs: row.inputs,
            outputs: row.outputs,
            conditionFrom: row.conditionFrom,
            conditionTo: row.conditionTo
        }));
    }

    public getOutput(id: number): OutputIface | null {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, settings, pin, repeat, duration, channel, message FROM outputs WHERE id = ?"
        );
        const row = getData.get(id) as OutputIface;
        return row ? {
            id: row.id,
            name: row.name,
            timeFrom: row.timeFrom,
            timeTo: row.timeTo,
            enabled: !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            type: row.type,
            settings: row.settings,
            pin: row.pin,
            repeat: row.repeat,
            duration: row.duration
        } : null;
    }

    public getOutputs(): OutputIface[] {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, settings, pin, repeat, duration, channel, message FROM outputs"
        );
        const rows = getData.all() as OutputIface[];
        return rows.map((row: OutputIface) => ({
            id: row.id,
            name: row.name,
            timeFrom: row.timeFrom,
            timeTo: row.timeTo,
            enabled: !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            type: row.type,
            settings: row.settings,
            pin: row.pin,
            repeat: row.repeat,
            duration: row.duration,
        }));
    }

    public getInput(id: number): InputIface | null {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, settings, pin, channel, message FROM inputs WHERE id = ?"
        );
        const row = getData.get(id) as InputIface;
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
    }

    public getInputs(): InputIface[] {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, settings, pin, channel, message FROM inputs"
        );
        const rows = getData.all() as InputIface[];
        return rows.map((row: InputIface) => ({
            id: row.id,
            name: row.name,
            timeFrom: row.timeFrom,
            timeTo: row.timeTo,
            enabled: !!row.enabled, // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            type: row.type,
            pin: row.pin
        }));
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

    /*
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
     */

    // Close the DB Connection

    public close(): void {
        this.db.close();
    }

    // useful but private Stuff

    /*
    newTimeFromString(timeString: string): Time {
        const [hoursStr, minutesStr] = timeString.split(':');
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        return new Time(hours, minutes);
    }
     */

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
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                timeFrom TEXT NOT NULL,
                timeTo TEXT NOT NULL,
                enabled BOOLEAN NOT NULL,
                description TEXT NOT NULL,
                inputs TEXT NOT NULL,
                outputs TEXT NOT NULL,
                conditionsFrom INTEGER NOT NULL,
                conditionsTo INTEGER NOT NULL
            )`;
        this.db.exec(query);
    }

    createInputTable(): void {
        const query = `
            CREATE TABLE IF NOT EXISTS inputs (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                timeFrom TEXT NOT NULL,
                timeTo TEXT NOT NULL,
                enabled BOOLEAN NOT NULL,
                description TEXT NOT NULL,
                type TEXT NOT NULL,
                settings TEXT NOT NULL,
                pin TEXT NOT NULL,
                channel TEXT NOT NULL,
                message TEXT NOT NULL
            )`;
        this.db.exec(query);
    }

    createOutputTable(): void {
        const query = `
            CREATE TABLE IF NOT EXISTS outputs (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                timeFrom TEXT NOT NULL,
                timeTo TEXT NOT NULL,
                enabled BOOLEAN NOT NULL,
                description TEXT NOT NULL,
                type TEXT NOT NULL,
                settings TEXT NOT NULL,
                pin TEXT NOT NULL,
                repeat INTEGER NOT NULL,
                duration INTEGER NOT NULL,
                channel TEXT NOT NULL,
                message TEXT NOT NULL
            )`;
        this.db.exec(query);
    }
}