import {constrainNumber, numToStringTwoDigits} from "./tools";

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

    test('constrainNumber_calledWithSmallerNumber_returnsMinimum', async () => {
        //Arrange
        const num = 1;
        const min = 3;
        const max = 7;

        // Act
        const res = constrainNumber(num, min, max);

        // Assert
        expect(res).toStrictEqual(min);
    });

    test('constrainNumber_calledWithInbetweenNumber_returnsTheNumber', async () => {
        //Arrange
        const num = 5;
        const min = 3;
        const max = 7;

        // Act
        const res = constrainNumber(num, min, max);

        // Assert
        expect(res).toStrictEqual(num);
    });

    test('constrainNumber_calledWithBiggerNumber_returnsMaximum', async () => {
        //Arrange
        const num = 9;
        const min = 3;
        const max = 7;

        // Act
        const res = constrainNumber(num, min, max);

        // Assert
        expect(res).toStrictEqual(max);
    });
});
