/**
 * @jest-environment jsdom
 */

const script = require('./script.js');

const program = new script.programClass('1', 'Ballenspellen', ['Bos'], ['Sport & Spel'], '2021-08');

test('Program name is correctly instantiated.', () => {
    expect(program.name).toBe('Ballenspellen');
});
