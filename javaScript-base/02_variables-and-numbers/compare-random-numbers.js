let n = -3;
let m = -10;

//количество цифр, которые могут быть сгенеринованы
let range = Math.abs(m - n);
//округленное первое число от 0 до range
let numberInRangeFirst = Math.round(Math.random() * range);
//округленное второе число от 0 до range
let numberInRangeSecond = Math.round(Math.random() * range);
let min = Math.min(n, m);
//левая граница чиcел

let a = min + numberInRangeFirst;
let b = min + numberInRangeSecond;

console.log(a);
console.log(b);


console.log('Первое число больше', a > b);
console.log('Второе число больше', a < b);
console.log('Первое число больше или равно', a >= b);
console.log('Второе число больше или равно', a <= b);
console.log('Числа равны', a === b);
console.log('Числа не равны', a !== b);