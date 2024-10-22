import Database from 'better-sqlite3';

interface Event {
    id?: number;
    type: string;
    timestamp: Date;
}

interface Setting {
    id?: number;
    key: string;
    value: string;
}

interface EventRow {
    id: number;
    type: string;
    timestamp: string;
}

interface SettingRow {
    id: number;
    key: string;
    value: string;
}

export class DatabaseDoorGuard {
    private db: Database.Database;

    constructor() {
        this.db = new Database('database.db');
        this.createEventTable ();
        this.createSettingTable();
    }

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
    /*
        public getEvent(id: number): Event | null {
            const getData = this.db.prepare(
                "SELECT id, type, timestamp FROM events WHERE id = ?"
            );
            const row = getData.get(id);
            return row ? { id: row.id, type: row.type, timestamp: new Date(row.timestamp) } : null;
        }

        public getEvents(): Event[] {
            const getData = this.db.prepare<EventRow[]>(
                "SELECT id, type, timestamp FROM events"
            );
            const rows = getData.all();
            return rows.map((row: EventRow) => ({
                id: row.id,
                type: row.type,
                timestamp: new Date(row.timestamp),
            }));
        }

        public getSetting(id: number): Setting | null {
            const getData = this.db.prepare<SettingRow>(
                "SELECT id, key, value FROM settings WHERE id = ?"
            );
            const row = getData.get(id);
            return row ? { id: row.id, key: row.key, value: row.value } : null;
        }
    /*
        public getSettings(): Setting[] {
            const getData = this.db.prepare<SettingRow[]>(
                "SELECT id, key, value FROM settings"
            );
            const rows = getData.all();
            return rows.map((row: SettingRow) => ({
                id: row.id,
                key: row.key,
                value: row.value,
            }));
        }
    */
    public close(): void {
        this.db.close();
    }

    // useful but private Stuff

    createEventTable () {
        const query = `
                CREATE TABLE IF NOT EXISTS events (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    type TEXT NOT NULL,
                    timestamp DATE NOT NULL
                    )`;
        this.db.exec(query);
    }

    createSettingTable() {
        const query = `
                CREATE TABLE IF NOT EXISTS settings (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    key TEXT NOT NULL,
                    value TEXT NOT NULL
                    )`;
        this.db.exec(query);
    }
}