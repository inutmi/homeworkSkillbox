let userName = 'AlexЗЗЗЗ';
let userSurname = 'Foх';

let firstN = userName.substring(0, 1);
let lastN = userName.substring(1);


let firstNup = firstN.toUpperCase();
let lastNlow = lastN.toLowerCase();


let firstS = userSurname.substring(0, 1);
let lastS = userSurname.substring(1);

let firstSup = firstS.toUpperCase();
let lastSlow = lastS.toLowerCase();

let newuserName = firstNup + lastNlow;
let newuserSurname = firstSup + lastSlow;

console.log(newuserName);
console.log(newuserSurname);

(userName === newuserName) && (userSurname === newuserSurname) ? console.log('Имя осталось без изменений') : console.log('Имя было преобразовано');

