export function numToStringTwoDigits(n: number) {
    return n.toFixed().padStart(2, "0");
}