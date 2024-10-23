import Database from 'better-sqlite3';
import {singleton} from "tsyringe";


// Interfaces damit man von unkown Data Type aus Datenbank zu passenden Types casted

interface Event {
    id?: number;
    type: string;
    timestamp: Date;
}

interface Setting {
    key: string;
    value: string;
}

interface Controller {
    id?: number;
    name: string;
    timeFrom: Date;
    timeTo: Date;
    enabled: boolean;
    description: string;

    inputs: string; // Array?
    outputs: string; // Array?
    conditionsFrom: number;
    conditionsTo: number;
}

interface Output {
    id?: number;
    name: string;
    timeFrom: Date;
    timeTo: Date;
    enabled: boolean;
    description: string;

    type: string; // ??
    settings: string;
    pin: string;
    repeat: number;
    duration: number;
    channel: string;
    message: string;
}

interface Input {
    id?: number;
    name: string;
    timeFrom: Date;
    timeTo: Date;
    enabled: boolean;
    description: string;

    type: string;
    settings: string;
    pin: string;
    channel: string;
    message: string;
}

// Die Klasse mit der man alles machen kann
@singleton()
export class DatabaseDoorGuard {
    private db: Database.Database;

    // Constructor der die DB aufmacht und alle Tabellen erstellt falls noch nicht vorhanden
    constructor() {
        this.db = new Database('database.db');

        // Create all Tables if they don't exist
        this.createTablesIfNotExists();
    }

    // Insert Methoden
    public insertEvent(event: Event): void {
        const insertData = this.db.prepare(
            "INSERT INTO events (type, timestamp) VALUES (?, ?)"
        );
        insertData.run(event.type, event.timestamp.toISOString());
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
            name, timeFrom, timeTo, enabled, description, 
            inputs, outputs, conditionsFrom, conditionsTo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );
        insertData.run(
            controller.name,
            controller.timeFrom.toISOString(),
            controller.timeTo.toISOString(),
            controller.enabled ? 1 : 0,
            controller.description,
            controller.inputs,
            controller.outputs,
            controller.conditionsFrom,
            controller.conditionsTo
        );
    }

    public insertInput(input: Input): void {
        const insertData = this.db.prepare(
            `INSERT INTO inputs (
            name, timeFrom, timeTo, enabled, description, 
            type, settings, pin, channel, message
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );
        insertData.run(
            input.name,
            input.timeFrom.toISOString(),
            input.timeTo.toISOString(),
            input.enabled ? 1 : 0,
            input.description,
            input.type,
            input.settings,
            input.pin,
            input.channel,
            input.message
        );
    }

    public insertOutput(output: Output): void {
        const insertData = this.db.prepare(
            `INSERT INTO outputs (
            name, timeFrom, timeTo, enabled, description, 
            type, settings, pin, repeat, duration, 
            channel, message
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );
        insertData.run(
            output.name,
            output.timeFrom.toISOString(),
            output.timeTo.toISOString(),
            output.enabled ? 1 : 0,
            output.description,
            output.type,
            output.settings,
            output.pin,
            output.repeat,
            output.duration,
            output.channel,
            output.message
        );
    }

    // Get Methoden
    public getEvent(id: number): Event | null {
        const getData = this.db.prepare(
            "SELECT id, type, timestamp FROM events WHERE id = ?"
        );
        const row = getData.get(id) as Event;
        return row ? { id: row.id, type: row.type, timestamp: new Date(row.timestamp) } : null;
    }

    public getEvents(): Event[] {
        const getData = this.db.prepare<Event[]>(
            "SELECT id, type, timestamp FROM events"
        );
        const rows = getData.all() as Event[];
        return rows.map((row: Event) => ({
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
            "SELECT id, name, timeFrom, timeTo, enabled, description, inputs, outputs, conditionsFrom, conditionsTo FROM controllers WHERE id = ?"
        );
        const row = getData.get(id) as Controller;
        return row ? {
            id: row.id,
            name: row.name,
            timeFrom: new Date(row.timeFrom),
            timeTo: new Date(row.timeTo),
            enabled: !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            inputs: row.inputs,
            outputs: row.outputs,
            conditionsFrom: row.conditionsFrom,
            conditionsTo: row.conditionsTo
        } : null;
    }

    public getControllers(): Controller[] {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, inputs, outputs, conditionsFrom, conditionsTo FROM controllers"
        );
        const rows = getData.all() as Controller[];
        return rows.map((row: Controller) => ({
            id: row.id,
            name: row.name,
            timeFrom: new Date(row.timeFrom),
            timeTo: new Date(row.timeTo),
            enabled: !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            inputs: row.inputs,
            outputs: row.outputs,
            conditionsFrom: row.conditionsFrom,
            conditionsTo: row.conditionsTo
        }));
    }

    public getOutput(id: number): Output | null {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, settings, pin, repeat, duration, channel, message FROM outputs WHERE id = ?"
        );
        const row = getData.get(id) as Output;
        return row ? {
            id: row.id,
            name: row.name,
            timeFrom: new Date(row.timeFrom),
            timeTo: new Date(row.timeTo),
            enabled: !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            type: row.type,
            settings: row.settings,
            pin: row.pin,
            repeat: row.repeat,
            duration: row.duration,
            channel: row.channel,
            message: row.message
        } : null;
    }

    public getOutputs(): Output[] {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, settings, pin, repeat, duration, channel, message FROM outputs"
        );
        const rows = getData.all() as Output[];
        return rows.map((row: Output) => ({
            id: row.id,
            name: row.name,
            timeFrom: new Date(row.timeFrom),
            timeTo: new Date(row.timeTo),
            enabled: !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            type: row.type,
            settings: row.settings,
            pin: row.pin,
            repeat: row.repeat,
            duration: row.duration,
            channel: row.channel,
            message: row.message
        }));
    }

    public getInput(id: number): Input | null {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, settings, pin, channel, message FROM inputs WHERE id = ?"
        );
        const row = getData.get(id) as Input;
        return row ? {
            id: row.id,
            name: row.name,
            timeFrom: new Date(row.timeFrom),
            timeTo: new Date(row.timeTo),
            enabled: !!row.enabled,  // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            type: row.type,
            settings: row.settings,
            pin: row.pin,
            channel: row.channel,
            message: row.message
        } : null;
    }

    public getInputs(): Input[] {
        const getData = this.db.prepare(
            "SELECT id, name, timeFrom, timeTo, enabled, description, type, settings, pin, channel, message FROM inputs"
        );
        const rows = getData.all() as Input[];
        return rows.map((row: Input) => ({
            id: row.id,
            name: row.name,
            timeFrom: new Date(row.timeFrom),
            timeTo: new Date(row.timeTo),
            enabled: !!row.enabled, // Cast integer to boolean, just to make sure .... :D
            description: row.description,
            type: row.type,
            settings: row.settings,
            pin: row.pin,
            channel: row.channel,
            message: row.message
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

    // Close the DB Connection

    public close(): void {
        this.db.close();
    }

    // useful but private Stuff

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
                timeFrom DATE NOT NULL,
                timeTo DATE NOT NULL,
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
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                timeFrom DATE NOT NULL,
                timeTo DATE NOT NULL,
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
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                timeFrom DATE NOT NULL,
                timeTo DATE NOT NULL,
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