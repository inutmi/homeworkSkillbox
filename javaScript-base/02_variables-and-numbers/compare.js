// Сравниваем 2 дробных числа с указанной точностью. 
// Даны 2 числа и количестов знаков после запятой, которое необходимо учитывать.
// Вывести информацию, больше ли первое число, больше ли второе число, больше или равно первое число, больше или равно второе число,
// равны ли эти числа, не равны ли эти числа


let a = 13.890123;
let b = 2.891564;
let n = 3;

console.log('Дробная часть числа a', Math.round(a % 1 * Math.pow(10, n)));
console.log('Дробная часть числа b', Math.round(b % 1 * Math.pow(10, n)));


let firstNormalized = Math.round(
    a * Math.pow(10, n)
);
let secondNormalized = Math.round(
    b * Math.pow(10, n)
);

console.log('Первое число больше', firstNormalized > secondNormalized);
console.log('Второе число больше', firstNormalized < secondNormalized);
console.log('Первое число больше или равно', firstNormalized >= secondNormalized);
console.log('Второе число больше или равно', firstNormalized <= secondNormalized);
console.log('Числа равны', firstNormalized === secondNormalized);
console.log('Числа не равны', firstNormalized !== secondNormalized);