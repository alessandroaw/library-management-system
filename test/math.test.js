const {celsiusToFahrenheit, fahrenheitToCelsius} = require('../src/math');

// test('This should fail', () => {
//     throw new Error('Failure!')                   
// } )

test('Should convert 32 F to 0 C', () => {
    const temp = fahrenheitToCelsius(32);
    expect(temp).toBe(0);
})

test('Should convert 0 C to 32 F', () => {
    const temp = celsiusToFahrenheit(0);
    expect(temp).toBe(32);
})