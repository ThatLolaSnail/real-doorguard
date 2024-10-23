import {numToStringTwoDigits} from "./tools";

export class Time{
    public static fromString(str: string): Time {
        let strArray = str.split(":");
        if (strArray.length == 2 ) {
            let h = parseInt(strArray[0]);
            let min = parseInt(strArray[1]);
            return new Time(h, min);
        }
        return new Time(0,0);
    }

    private totalMinutes: number = 0;

    constructor(hours: number, minutes: number) {
        this.setTime(hours, minutes);
    }

    public valueOf(): number {
        return this.hours * 60 + this.minutes;
    }
    public toString(): string {
        return numToStringTwoDigits(this.hours) + ':' + numToStringTwoDigits(this.minutes);
    }
    public get hours(): number {
        return Math.floor(this.totalMinutes / 60)
    }
    public get minutes():number {
        return this.totalMinutes % 60;
    }
    public setTime(hours: number, minutes: number) {
        this.totalMinutes = (hours * 60 + minutes + (24*60)) % (24*60);

    }

    public isInInterval(from: Time, to: Time): boolean {
        if (from <= to){
            //interval does not cross midnight
            return this >= from && this <= to;
        } else {
            //interval crosses midnight
            return this >= from || this <= to;

        }
    }
}