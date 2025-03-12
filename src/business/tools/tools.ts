export function numToStringTwoDigits(n: number) {
    return n.toFixed().padStart(2, "0");
}
export function constrainNumber(num:number, min:number, max:number):number {
    if (num<min){
        return min;
    }
    if (num>max) {
        return max;
    }
    return num;
}