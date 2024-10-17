import {Time} from "./time";

describe('Time', () => {
    test('Time_calledWithValidTime_createValid', async () => {
        // Arrange & Act
        const res = new Time(15, 30);

        // Assert
        expect(res.toString()).toStrictEqual("15:30");
    });

    test('Time_calledWithHourAbove23_CreateValidTime', async () => {
        // Arrange & Act
        const res = new Time(24, 30);

        // Assert
        expect(res.toString()).toStrictEqual("00:30");
    });

    test('Time_calledWithHourBelow0_CreateValidTime', async () => {
        // Arrange & Act
        const res = new Time(-1, 30);

        // Assert
        expect(res.toString()).toStrictEqual("23:30");
    });

    test('Time_calledWithMinuteAbove59_createValidTime', async () => {
        // Arrange & Act
        const res = new Time(15, 60);

        // Assert
        expect(res.toString()).toStrictEqual("16:00");
    });

    test('Time_calledWithMinuteBelow0_createValidTime', async () => {
        // Arrange & Act
        const res = new Time(15, -1);

        // Assert
        expect(res.toString()).toStrictEqual("14:59");
    });

    test('isInInterval_doesntCrossMidnightInInterval_returnTrue', async () => {
        // Arrange
        const from = new Time(8, 0);
        const now = new Time(12, 0);
        const to = new Time(17, 0);

        // Act
        const res = now.isInInterval(from,to);

        // Assert
        expect(res).toStrictEqual(true);
    });

    test('isInInterval_doesntCrossMidnightBeforeInterval_returnFalse', async () => {
        // Arrange
        const from = new Time(8, 0);
        const now = new Time(6, 0);
        const to = new Time(17, 0);

        // Act
        const res = now.isInInterval(from,to);

        // Assert
        expect(res).toStrictEqual(false);
    });

    test('isInInterval_doesntCrossMidnightAfterInterval_returnFalse', async () => {
        // Arrange
        const from = new Time(8, 0);
        const now = new Time(23, 0);
        const to = new Time(17, 0);

        // Act
        const res = now.isInInterval(from,to);

        // Assert
        expect(res).toStrictEqual(false);
    });

    test('isInInterval_crossesMidnightInEvenin_returnTrue', async () => {
        // Arrange
        const from = new Time(22, 0);
        const now = new Time(23, 59);
        const to = new Time(4, 0);

        // Act
        const res = now.isInInterval(from,to);

        // Assert
        expect(res).toStrictEqual(true);
    });

    test('isInInterval_crossesMidnightInMorning_returnTrue', async () => {
        // Arrange
        const from = new Time(22, 0);
        const now = new Time(0, 0);
        const to = new Time(4, 0);

        // Act
        const res = now.isInInterval(from,to);

        // Assert
        expect(res).toStrictEqual(true);
    });

    test('isInInterval_crossesMidnightNotInInterval_returnFalse', async () => {
        // Arrange
        const from = new Time(22, 0);
        const now = new Time(12, 0);
        const to = new Time(4, 0);

        // Act
        const res = now.isInInterval(from,to);

        // Assert
        expect(res).toStrictEqual(false);
    });

    test('isInInterval_fromEqualsToInInterval_returnTrue', async () => {
        // Arrange
        const from = new Time(11, 22);
        const now = new Time(11, 22);
        const to = new Time(11, 22);

        // Act
        const res = now.isInInterval(from,to);

        // Assert
        expect(res).toStrictEqual(true);
    });

    test('isInInterval_fromEqualsToAfterInterval_returnFalse', async () => {
        // Arrange
        const from = new Time(11, 22);
        const now = new Time(11, 23);
        const to = new Time(11, 22);

        // Act
        const res = now.isInInterval(from,to);

        // Assert
        expect(res).toStrictEqual(false);
    });

    test('isInInterval_fromEqualsToBeforeInterval_returnFalse', async () => {
        // Arrange
        const from = new Time(11, 22);
        const now = new Time(11, 21);
        const to = new Time(11, 22);

        // Act
        const res = now.isInInterval(from,to);

        // Assert
        expect(res).toStrictEqual(false);
    });
});