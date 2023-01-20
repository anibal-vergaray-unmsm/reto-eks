export function luhnValidator( cardNumber: Number|String) {
    //Algoritmo de LUHN
    const arr = (cardNumber + '')
        .split('')
        .reverse()
        .map(x => parseInt(x));
    const lastDigit = arr.shift();
    let sum = arr.reduce(
        (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val)),
        0
    );
    sum += lastDigit;
    return sum % 10 === 0;
}