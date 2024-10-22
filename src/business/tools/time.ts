import {numToStringTwoDigits} from "./tools";

export class Time{
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
            //interval does not cross midnight\

            console.log("Time Check",this,from,to,this >= from && this <= to);
            return this >= from && this <= to;
        } else {
            //interval crosses midnight

            console.log("Time Check",this,from,to,this >= from || this <= to);
            return this >= from || this <= to;

        }
    }
}