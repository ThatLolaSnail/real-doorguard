import {numToStringTwoDigits} from "./tools";

describe('tools', () => {
    test('numToStringTwoDigits_calledWith2digitNumber_returnsThisNumberAsSring', async () => {
        // Arrange & Act
        const res = numToStringTwoDigits(10);

        // Assert
        expect(res).toStrictEqual("10");
    });

    test('numToStringTwoDigits_calledWith1digitNumber_returnsThisNumberAsSringWithLeadingZero', async () => {
        // Arrange & Act
        const res = numToStringTwoDigits(5);

        // Assert
        expect(res).toStrictEqual("05");
    });

    test('numToStringTwoDigits_calledWith3digitNumber_returnsThisNumberAsSring', async () => {
        // Arrange & Act
        const res = numToStringTwoDigits(123);

        // Assert
        expect(res).toStrictEqual("123");
    });
});
