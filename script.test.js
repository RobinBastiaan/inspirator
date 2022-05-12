/**
 * @jest-environment jsdom
 */
jest
    .useFakeTimers()
    .setSystemTime(new Date('2022-01-01'));

const script = require('./script.js');

/**
 * programClass
 */

const program = new script.programClass('1', 'Ballenspellen', ['Bos'], ['Sport & Spel'], '2021-08');

test('programClass: Instantiate program name correctly', () => {
    expect(program.name).toBe('Ballenspellen');
});

/**
 * calculateDifference()
 */

test('calculateDifference: Ensures that a program can always be done', () => {
    expect(script.calculateDifference('*')).toBe(0);
});
test('calculateDifference: Calculates difference in months of date one year in the past', () => {
    expect(script.calculateDifference('01/2021')).toBe(12);
});
test('calculateDifference: Does not accept an invalid date', () => {
    expect(script.calculateDifference('01-2021')).toBe(NaN);
});
